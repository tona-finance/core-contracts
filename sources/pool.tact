import "@stdlib/deploy.tact";
import "@stdlib/ownable.tact";

import "./library/timestamp.tact";
import "./library/twab.tact";
import "./tonstakers/wallet.tact";
import "./messages.tact";
import "./draw.tact";

contract Pool with Deployable, OwnableTransferable {
    override const storageReserve: Int = ton("1.0"); // from base trait

    owner: Address; // from ownable

    staker: Address;

    jetton_master: Address;
    jetton_wallet_code: Cell;
    jetton_wallet: Address;

    twab: Twab;
    share_amount: Int as coins;
    contribute_amount: Int as coins;
    spent_amount: Int as coins;
    unexpected_amount: Int as coins;

    next_period: Int as uint32;

    init(
        owner: Address,
        staker: Address,
        jetton_master: Address,
        jetton_wallet_code: Cell
    ) {
        self.owner = owner;
        self.staker = staker;
        self.jetton_master = jetton_master;
        self.jetton_wallet_code = jetton_wallet_code;
        self.jetton_wallet = get_jetton_wallet_address(
            myAddress(),
            jetton_master,
            jetton_wallet_code
        );
        self.twab = Twab {
            timestamp: now(),
            amount: 0
        };
        self.share_amount = 0;
        self.contribute_amount = 0;
        self.spent_amount = 0;
        self.unexpected_amount = 0;
        self.next_period = 0;
    }

    receive(msg: TokenExcesses) {}

    receive("sweep unexpected jetton") {
        self.requireOwner();

        if (self.unexpected_amount > 0) {
            let amount: Int = self.unexpected_amount;
            self.unexpected_amount = 0;
            self.forward(
                self.owner,
                TokenTransfer {
                    query_id: 0,
                    amount: amount,
                    destination: self.owner,
                    response_destination: myAddress(),
                    forward_ton_amount: 0,
                    forward_payload: emptySlice()
                }.toCell(),
                false,
                null
            );
        }
    }

    receive("initialize draw") {
        self.requireOwner();
        require(self.next_period == 0, "already initialized");

        // TODO: check gas

        let twab: Twab = self.twab.nextTwab(self.share_amount, now());
        self.deploy_draw_beacon(twab);
    }

    receive(msg: SetPrize) {
        self.requireOwner();
        require(self.next_period > 0, "not initialized");

        // TODO: check gas

        self.spent_amount = self.spent_amount + msg.amount;

        let twab: Twab = self.twab.nextTwab(self.share_amount, now());
        // transfer prize to current draw beacon
        self.transfer_prize(msg.amount, twab, self.next_period - 1);

        // deploy next draw beacon
        self.deploy_draw_beacon(twab);
    }

    receive(msg: TokenNotification) {
        require(sender() == self.jetton_wallet, "invalid sender");

        // TODO: check payload bits is better
        if (msg.forward_payload.empty()) {
            // jetton minted
            self.on_unexpected_jetton(msg.amount);
        } else {
            // jetton transfered from user account
            self.on_jetton_from_user_account(msg.amount, msg.forward_payload);
        }

        // refund to user
        self.forward(owner, null, false, null);
    }

    receive(msg: WithdrawInternal) {
        let account: Address = sender();
        require(account == self.get_user_account_address(msg.user), "invalid sender");

        // spent jetton amount shared on user
        let spent_amount: Int = self.spent_amount * msg.acc_contribute_amount / self.contribute_amount;
        // verify withdraw for user
        require(
            msg.withdraw_amount + msg.acc_withdraw_amount + spent_amount <= msg.acc_contribute_amount,
            "invalid withdraw amount"    
        );

        self.withdraw_to_user_account(msg.withdraw_amount, account);
    }

    receive(msg: WithdrawReceipt) {
        require(sender() == self.get_user_account_address(msg.owner), "invalid sender");

        self.twab = self.twab.nextTwab(self.share_amount, msg.timestamp);
        self.share_amount = self.share_amount - msg.share_amount;

        // refund to owner
        self.forward(self.owner, null, false, null);
    }

    bounced(src: bounced<DeployDrawBeacon>) {
        self.next_period = self.next_period - 1;
    }

    bounced(src: bounced<TokenTransfer>) {
        if (!src.forward_payload.empty()) {
            // jetton from draw beacon
            self.spent_amount = self.spent_amount - src.amount;
        }
    }

    inline fun get_user_account_init(user: Address): StateInit {
        return initOf UserAccount(
            user,
            myAddress(),
            self.staker,
            self.jetton_master,
            self.jetton_wallet_code,
            self.jetton_wallet
        );
    }

    inline fun get_draw_beacon_init(period: Int): StateInit {
        return initOf DrawBeacon(
            myAddress(),
            self.jetton_master,
            self.jetton_wallet_code,
            period
        );
    }

    inline fun get_draw_beacon_address(period: Int): Address {
        let sinit: StateInit = self.get_draw_beacon_init(period);
        return contractAddress(sinit);
    }

    inline fun get_user_account_address(user: Address) {
        let sinit: StateInit = self.get_user_account_init(user);
        return contractAddress(sinit);
    }

    fun transfer_prize(amount: Int, twab: Twab, period: Int) {
        // share_amount + twab timestamp + twab amount
        let payload: Slice = beginCell()
            .storeCoins(self.share_amount)
            .storeTimestamp(twab.timestamp)
            .storeUint(twab.amount, 128)
            .asSlice();
        send(SendParameters {
            bounce: true,
            to: self.jetton_wallet,
            value: ton("1.05") + ton("0.1"),
            mode: SendPayGasSeparately,
            body: TokenTransfer {
                query_id: 0,
                amount: amount,
                destination: self.get_draw_beacon_address(period),
                response_destination: myAddress(),
                forward_ton_amount: ton("1.05") + ton("0.03"), // burn tston fee + other fee
                forward_payload: payload
            }.toCell()
        });
    }

    fun deploy_draw_beacon(twab: Twab) {
        let period: Int = self.next_period;
        self.next_period = self.next_period + 1;

        let sinit: StateInit = self.get_draw_beacon_init(period);
        send(SendParameters {
            bounce: true,
            to: contractAddress(sinit),
            value: 0,
            mode: SendRemainingValue,
            body: DeployDrawBeacon {
                timestamp: twab.timestamp,
                amount: twab.amount
            }.toCell(),
            code: sinit.code,
            data: sinit.data
        });
    }

    fun withdraw_to_user_account(amount: Int, account: Address) {
        send(SendParameters {
            bounce: false,
            to: self.jetton_wallet,
            value: 0,
            mode: SendRemainingValue,
            body: TokenTransfer {
                query_id: 0,
                amount: amount,
                destination: account,
                response_destination: myAddress(),
                forward_ton_amount: ton("1.05") + ton("0.01"), // burn fee + on notification fee
                forward_payload: emptySlice()
            }.toCell()
        });
    }

    fun on_jetton_from_user_account(amount: Int, payload: Slice) {
        let timestamp: Int = payload.loadTimestamp();
        let user: Address = payload.loadAddress();
        let share_amount: Int = payload.loadCoins();
        payload.endParse();

        require(msg.from == self.get_user_account_address(user), "invalid from");

        self.twab = self.twab.nextTwab(self.share_amount, timestamp);
        self.share_amount = self.share_amount + share_amount;
        self.contribute_amount = self.contribute_amount + amount;

        // refund to user
        self.forward(owner, null, false, null);
    }

    fun on_unexpected_jetton(amount: Int) {
        self.unexpected_amount = self.unexpected_amount + amount;
    }
}

// ======================== //
contract UserAccount with Deployable, Ownable {
    override const storageReserve: Int = ton("0.1"); // from base trait

    owner: Address; // from ownable

    pool: Address;
    staker: Address;

    jetton_wallet: Address;

    deposit_cache: map<Int as uint64, Int as coins>;
    twab_store: TwabStore;
    share_amount: Int;
    contribute_amount: Int;
    withdraw_amount: Int;
    unexpected_amount: Int;

    init(
        owner: Address,
        pool: Address,
        staker: Address,
        jetton_master: Address,
        jetton_wallet_code: Cell
    ) {
        self.owner = owner;
        self.pool = pool;
        self.staker = staker;
        self.jetton_wallet = get_jetton_wallet_address(
            myAddress(),
            jetton_master,
            jetton_wallet_code
        );
        self.deposit_cache = emptyMap();
        self.twab_store = TwabStore {
            store: emptyMap(),
            size: 0
        };
        self.share_amount = 0;
        self.contribute_amount = 0;
        self.withdraw_amount = 0;
        self.unexpected_amount = 0;
    }

    receive(msg: TokenExcesses) {
        // refund to owner
        self.forward(self.owner, null, false, null);
    }

    receive(msg: Deposit) {
        require(self.deposit_cache.get(msg.query_id) == null, "query id used");

        let ctx: Context = context();
        let storage_fee: Int = self.storageReserve - min(myBalance() - ctx.value, self.storageReserve); // storage fee
        // storage fee + fwd fee + gas fee + staker deposit fee
        let fee: Int = storage_fee + ctx.readForwardFee() + ton("0.01") + ton("1.0");
        let deposit_amount: Int = ctx.value - fee;
        require(deposit_amount > 0, "invalid deposit amount");
        // record in cache
        self.deposit_cache.set(msg.query_id, deposit_amount);

        // deposit in the staker pool
        send(SendParameters {
            bounce: true,
            to: self.staker,
            value: deposit_amount + ton("1.0"), // deposit amount + staker deposit fee
            mode: SendPayGasSeparately,
            body: DepositInStaker {
                query_id: msg.query_id
            }.toCell()
        });
    }

    receive(msg: Withdraw) {
        self.requireOwner();
        require(msg.amount > 0, "zero amount");

        let ctx: Context = context();
        let storage_fee: Int = self.storageReserve - min(myBalance() - ctx.value, self.storageReserve); // storage fee
        // storage fee + estimated withdraw fee + jetton burn fee
        let fee: Int = storage_fee + ton("0.05") + ton("1.05"); // forward fee
        require(ctx.value >= fee, "insufficient value");

        self.withdraw_amount = self.withdraw_amount + msg.amount;

        send(SendParameters {
            bounce: true,
            to: self.pool,
            value: 0,
            mode: SendRemainingValue,
            body: WithdrawInternal {
                user: self.owner,
                withdraw_amount: msg.amount,
                acc_contribute_amount: self.contribute_amount,
                acc_withdraw_amount: self.withdraw_amount
            }.toCell()
        });
    }

    receive(msg: StakerWithdrawal) {
        let ctx: Context = context();
        let timestamp: Int = now();
        self.twab_store.insert(self.share_amount, timestamp);
        self.share_amount = self.share_amount - ctx.value;
        require(self.share_amount >= 0, "insufficient ton amount");

        send(SendParameters {
            bounce: false,
            to: self.pool,
            value: ton("0.02"), // process withdraw receipt fee
            mode: 0,
            body: WithdrawReceipt {
                timestamp: timestamp,
                owner: self.owner,
                share_amount: ctx.value
            }.toCell()
        });

        send(SendParameters {
            bounce: false,
            to: self.owner,
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors,
            body: WithdrawNotification { query_id: msg.query_id }.toCell()
        });
    }

    receive(msg: TokenNotification) {
        require(sender() == self.jetton_wallet, "invalid sender");

        if (msg.from == newAddress(0, 0)) {
            // jetton minted
            self.on_jetton_minted(msg.amount);
        } else if (msg.from == self.pool) {
            // jetton transfered from pool
            self.on_jetton_from_pool(msg.amount);
        } else {
            // not expected sender
            self.on_unexpected_jetton(msg.amount);
        }
    }

    receive("sweep unexpected jetton") {
        self.requireOwner();

        if (self.unexpected_amount > 0) {
            let amount: Int = self.unexpected_amount;
            self.unexpected_amount = 0;
            self.forward(
                self.jetton_wallet,
                TokenTransfer {
                    query_id: 0,
                    amount: amount,
                    destination: self.owner,
                    response_destination: myAddress(),
                    forward_ton_amount: 0,
                    forward_payload: emptySlice()
                }.toCell(),
                true,
                null
            );
        }
    }

    receive("sweep dust") {
        self.requireOwner();

        let ctx: Context = context();
        let dust_value: Int = myBalance() - ctx.value - self.storageReserve;

        if (dust_value > 0) {
            send(SendParameters {
                bounce: false,
                to: self.owner,
                value: dust_value,
                mode: SendIgnoreErrors,
                body: "receive dust".asComment()
            });
        }
    }

    bounced(src: bounced<TokenTransfer>) {
        if (src.destination == self.owner) {
            // unexpected jetton
            self.unexpected_amount = self.unexpected_amount + src.amount;
        }
    }

    bounced(src: bounced<DepositInStaker>) {
        self.deposit_cache.set(src.query_id, null);
    }

    bounced(src: bounced<WithdrawInternal>) {
        self.withdraw_amount = self.withdraw_amount - src.withdraw_amount;
    }

    fun on_jetton_minted(jetton_amount: Int) {
        // ctx.value = ton("1.0")

        // get ton amount from cache
        let deposit_amount: Int? = self.deposit_cache.get(query_id);
        require(deposit_amount != null, "query id not exists");
        self.deposit_cache.set(query_id, null);

        let timestamp: Int = now();
        self.twab_store.insert(self.share_amount, timestamp);
        self.share_amount = self.share_amount + deposit_amount!!;
        self.contribute_amount = self.contribute_amount + jetton_amount;

        // timestamp + owner + deposit_amount
        let payload: Slice = beginCell()
            .storeTimestamp(timestamp)
            .storeAddress(self.owner)
            .storeCoins(deposit_amount!!)
            .asSlice();
        // transfer jetton to pool
        send(SendParameters {
            bounce: false,
            to: self.jetton_wallet,
            value: 0,
            mode: SendRemainingValue,
            body: TokenTransfer {
                query_id: 0,
                amount: jetton_amount,
                destination: self.pool,
                response_destination: myAddress(),
                // fee for pool to process on token notification
                forward_ton_amount: ton("0.05"),
                forward_payload: payload
            }.toCell()
        });
    }

    // receive withdrawn jetton amount from pool
    fun on_jetton_from_pool(amount: Int) {
        let payload: Slice = beginCell()
            .storeUint(0, 1) // wait_till_round_end = false
            .storeUint(1, 1) // fill_or_kill = true
            .asSlice();
        send(SendParameters {
            bounce: false,
            to: self.jetton_wallet,
            value: ton("1.05"), // jetton burn fee
            mode: SendPayGasSeparately,
            body: TokenBurn {
                query_id: 0,
                amount: amount,
                response_destination: myAddress(),
                custom_payload: payload
            }.toCell()
        });
    }

    fun on_unexpected_jetton(amount: Int) {
        self.unexpected_amount = self.unexpected_amount + amount;
    }
}