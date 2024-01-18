import "@stdlib/ownable";
import "../library/timestamp";
import "../library/twab";
import "../library/helper";
import "../tonstakers/wallet";
import "../messages";


trait PoolAccount with OwnableTransferable, MsgValueHelper {

    owner: Address; // from OwnableTransferable

    master: Address;
    staker: Address?;
    jetton_wallet: Address?;
    deposit_cache: map<Int as uint64, Int as coins>;
    twab_store: TwabStore;
    share_amount: Int;
    contribute_amount: Int;
    withdraw_amount: Int;

    receive(msg: InitPoolAccountInternal) {
        self.require_master();

        self.staker = msg.staker;
        self.jetton_wallet = msg.jetton_wallet;

        // refund gas
        self.forward(self.owner, null, false, null);
    }

    // receive(msg: TokenExcesses) {
    //     // refund to owner
    //     self.forward(self.owner, null, false, null);
    // }

    receive(msg: Deposit) {
        require(self.deposit_cache.get(msg.query_id) == null, "query id used");

        let ctx: Context = context();
        // deposit gas fee 0.02
        let rest_value: Int = self.msg_value(ctx, ton("0.02"));
        let fwd_fee: Int = ctx.readForwardFee();
        // staker fee 1.0
        let staker_fee: Int = ton("1.0");
        let deposit_amount: Int = rest_value - fwd_fee - staker_fee;
        require(deposit_amount > 0, "invalid deposit amount");
        // record in cache
        self.deposit_cache.set(msg.query_id, deposit_amount);

        // deposit in the staker pool
        send(SendParameters {
            bounce: true,
            to: self.staker!!,
            value: deposit_amount + staker_fee,
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
        // withdraw gas fee 0.02
        let rest_value: Int = self.msg_value(ctx, ton("0.02"));
        // master handling value 1.5
        let master_withdraw_value: Int = ton("1.5");
        require(rest_value >= master_withdraw_value, "insufficient value");

        let acc_withdraw_amount: Int = self.withdraw_amount;
        self.withdraw_amount = self.withdraw_amount + msg.amount;

        send(SendParameters {
            bounce: true,
            to: self.master,
            value: 0,
            mode: SendRemainingValue,
            body: WithdrawInternal {
                user: self.owner,
                withdraw_amount: msg.amount,
                acc_contribute_amount: self.contribute_amount,
                acc_withdraw_amount: acc_withdraw_amount
            }.toCell()
        });
    }

    receive(msg: StakerWithdrawal) {
        self.require_staker();

        let ctx: Context = context();
        let withdraw_amount: Int = ctx.value - ton("1.0");
        let timestamp: Int = now();
        self.twab_store.insert(self.share_amount, timestamp);
        self.share_amount = self.share_amount - withdraw_amount;

        send(SendParameters {
            bounce: false,
            to: self.master,
            value: ton("0.01"), // gas fee by master
            mode: SendPayGasSeparately,
            body: WithdrawFinishInternal {
                user: self.owner,
                timestamp: timestamp,
                share_amount: ctx.value
            }.toCell()
        });

        // refund to owner
        self.forward(self.owner, null, false, null);
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
            // ingnore from unknown address
        }
    }

    receive("sweep dust") {
        self.requireOwner();

        let ctx: Context = context();
        let rest_value: Int = self.msg_value(ctx, ton("0.01"));
        if (rest_value > 0) {
            send(SendParameters {
                bounce: false,
                to: self.owner,
                value: rest_value,
                mode: SendIgnoreErrors,
                body: "receive dust".asComment()
            });
        }
    }

    bounced(src: bounced<DepositInStaker>) {
        self.deposit_cache.set(src.query_id, null);
    }

    bounced(src: bounced<WithdrawInternal>) {
        self.withdraw_amount = self.withdraw_amount - src.withdraw_amount;
    }

    inline fun init_account(owner: Address, master: Address) {
        self.owner = owner;
        self.master = master;
        self.deposit_cache = emptyMap();
        self.twab_store = newTwabStore();
        self.share_amount = 0;
        self.contribute_amount = 0;
        self.withdraw_amount = 0;
    }

    fun on_jetton_minted(amount: Int) {
        // ctx value is 1.0 from staker

        // get ton amount from cache
        let deposit_amount: Int? = self.deposit_cache.get(query_id);
        require(deposit_amount != null, "query id not exists");
        self.deposit_cache.set(query_id, null);

        let timestamp: Int = now();
        self.twab_store.insert(self.share_amount, timestamp);
        self.share_amount = self.share_amount + deposit_amount!!;
        self.contribute_amount = self.contribute_amount + amount;

        // timestamp + user + deposit_amount
        let payload: Slice = beginCell()
            .storeTimestamp(timestamp)
            .storeAddress(self.owner)
            .storeCoins(deposit_amount!!)
            .asSlice();
        // transfer jetton to master
        self.forward(
            self.jetton_wallet,
            TokenTransfer {
                query_id: 0,
                amount: amount,
                destination: self.master,
                response_destination: myAddress(),
                forward_ton_amount: ton("0.01"), // handle jetton notification of master
                forward_payload: payload
            }.toCell(),
            false,
            null
        );
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
            value: ton("1.05"), // jetton burn fee in staker
            mode: SendPayGasSeparately,
            body: TokenBurn {
                query_id: 0,
                amount: amount,
                response_destination: myAddress(),
                custom_payload: payload
            }.toCell()
        });

        // refund to owner
        self.forward(self.owner, null, false, null);
    }

    inline fun require_master() {
        require(sender() == self.master, "invalid sender");
    }

    inline fun require_jetton_wallet() {
        require(sender() == self.jetton_wallet!!, "invalid sender");
    }

    inline fun require_staker() {
        require(sender() == self.staker!!, "invalid sender");
    }
}