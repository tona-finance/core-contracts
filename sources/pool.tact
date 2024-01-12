import "@stdlib/deploy.tact";
import "@stdlib/ownable.tact";

import "./library/timestamp.tact";
import "./library/twab.tact";
import "./tonstaker/wallet.tact";
import "./messages.tact";
import "./draw.tact";

contract PoolMaster with Deployable, OwnableTransferable {
    override const storageReserve: Int = ton("0.01"); // from base trait

    const BUY_TICKET_GAS_FEE: Int = ton("0.1");

    owner: Address; // from ownable

    staker: Address;

    jetton_master: Address;
    jetton_wallet_code: Cell;
    jetton_wallet: Address;

    twab: Twab;
    ton_amount: Int;
    tston_amount: Int;
    
    period: Int;
    draw_active: Bool;

    init(
        owner: Address,
        staker: Address,
        jetton_master: Address,
        jetton_wallet_code: Cell
    ) {
        let sinit: StateInit = get_tonstaker_jetton_wallet_state_init(
            myAddress(),
            jetton_master,
            jetton_wallet_code
        );
        let jetton_wallet: Address = contractAddress(sinit);

        self.owner = owner;
        self.staker = staker;
        self.jetton_master = jetton_master;
        self.jetton_wallet_code = jetton_wallet_code;
        self.jetton_wallet = jetton_wallet;
        self.twab = Twab {
            timestamp: now(),
            amount: 0
        };
        self.ton_amount = 0;
        self.tston_amount = 0;
        self.period = 0;
        self.draw_active = false;

        // create jetton wallet
        self.forward(jetton_wallet, null, false, sinit);
    }

    receive(msg: DeployDraw) {
        self.requireOwner();
        require(!self.draw_active, "draw already active");

        self.draw_active = true;

        let twab: Twab = self.twab.nextTwab(self.ton_amount, now());
        let sinit: StateInit = self.get_draw_beacon_init(self.period);
        self.forward(
            contractAddress(sinit),
            Deploy { query_id: msg.query_id }.toCell(),
            true,
            sinit
        );
    }

    receive(msg: DrawStartRequest) {
        self.requireOwner();
        require(self.draw_active, "draw not active");

        let twab: Twab = self.twab.nextTwab(self.ton_amount, now());

        let sinit: StateInit = self.get_draw_beacon_init(self.period);
        self.forward(
            contractAddress(sinit),
            DrawStart {
                timestamp: twab.timestamp,
                amount: twab.amount
            }.toCell(),
            true,
            null
        );
    }

    receive(msg: DrawEndRequest) {
        self.requireOwner();
        require(self.draw_active, "draw not active");

        let twab: Twab = self.twab.nextTwab(self.ton_amount, now());
        self.draw_active = false;
        self.period = self.period + 1;

        let payload: Slice = beginCell()
            .storeCoins(self.ton_amount)
            .asSlice();

        self.forward(
            self.jetton_wallet,
            TokenTransfer {
                query_id: msg.query_id,
                amount: self.tston_amount,
                destination: self.master,
                response_destination: myAddress(),
                forward_ton_amount: self.MASTER_GAS_FEE,
                forward_payload: payload
            }
        );

        send(SendParameters {
            bounce: false,
            to: self.jetton_wallet,
            value: 0,
            mode: SendRemainingValue + SendIgnoreErrors,
            body: TokenBurn {
                query_id: msg.query_id,
                amount: self.tston_amount,
                response_destination: myAddress()
            }
        });
    }

    receive(msg: StakerWithdrawal) {
        // TODO: write this
    }

    receive(msg: TokenNotification) {
        require(sender() == self.jetton_wallet, "invalid sender");
        
        // TODO: gas check

        let data: Slice = msg.forward_payload;
        let timestamp: Int = data.loadTimestamp();
        let owner: Address = data.loadAddress();
        let ton_amount: Int = data.loadCoins();
        data.endParse();

        let sinit: StateInit = self.get_wallet_init(owner);
        require(msg.from == contractAddress(sinit), "invalid from address");

        self.twab = self.twab.nextTwab(self.ton_amount, timestamp);
        self.ton_amount = self.ton_amount + ton_amount;
        self.tston_amount = self.tston_amount + msg.amount;
    }

    receive(msg: TokenExcesses) {}

    receive(msg: WithdrawInternal) {
        let sender: Address = sender();
        let sinit: StateInit = self.get_wallet_init(msg.owner);
        require(sender == contractAddress(sinit), "invalid sender");

        self.tston_amount = self.tston_amount - msg.amount;

        self.forward(
            self.staker_jetton_wallet,
            TokenTransfer {
                query_id: msg.query_id,
                amount: msg.amount,
                destination: sender,
                response_destination: myAddress(),
                forward_ton_amount: ton("0.01"),
                forward_payload: emptySlice()
            },
            true,
            null
        );
    }

    bounced(src: bounced<TokenTransfer>) {
        self.tston_amount = self.tston_amount + src.amount;
    }

    receive(msg: WithdrawReceipt) {
        let sinit: StateInit = self.get_wallet_init(msg.owner);
        require(sender() == contractAddress(sinit), "invalid sender");

        self.twab = self.twab.nextTwab(self.ton_amount, msg.timestamp);
        self.ton_amount = self.ton_amount - msg.amount;
    }

    inline fun get_wallet_init(owner: Address): StateInit {
        return initOf PoolWallet(
            owner,
            myAddress(),
            self.staker,
            self.jetton_master,
            self.jetton_wallet_code,
            self.jetton_wallet
        );
    }

    inline fun get_draw_beacon_init(period: Int): StateInit {
        return initOf DrawBeacon(myAddress(), period);
    }
}

// ======================== //
contract PoolWallet with Deployable, Ownable {
    override const storageReserve: Int = ton("0.01"); // from base trait
    
    const DEPOSIT_GAS_FEE: Int = ton("0.1");
    const WITHDRAW_GAS_FEE: Int = ton("0.1");
    const MASTER_GAS_FEE: Int = ton("0.01");
    const POOL_DEPOSIT_FEE: Int = ton("1.0");

    owner: Address; // from ownable

    master: Address;
    staker: Address;

    master_jetton_wallet: Address;
    self_jetton_wallet: Address;

    deposit_cache: map<Int as uint64, Int as coins>;
    twab_store: TwabStore;
    ton_amount: Int;
    tston_amount: Int;

    init(
        owner: Address,
        master: Address,
        staker: Address,
        jetton_master: Address,
        jetton_wallet_code: Cell,
        master_jetton_wallet: Address
    ) {
        let sinit: StateInit = get_tonstaker_jetton_wallet_state_init(
            myAddress(),
            jetton_master,
            jetton_wallet_code
        );
        let self_jetton_wallet: Address = contractAddress(sinit);

        self.owner = owner;
        self.master = master;
        self.staker = staker;
        self.master_jetton_wallet = master_jetton_wallet;
        self.self_jetton_wallet = self_jetton_wallet;
        self.deposit_cache = emptyMap();
        self.twab_store = TwabStore {
            store: emptyMap(),
            size: 0
        };
        self.ton_amount = 0;
        self.tston_amount = 0;

        // create jetton wallet
        self.forward(self_jetton_wallet, null, false, sinit);
    }

    receive(msg: TokenExcesses) {}

    receive(msg: Deposit) {
        require(self.deposit_cache.get(msg.query_id) == null, "query id used");

        let ctx: Context = context();
        let balance_before_msg: Int = myBalance() - ctx.value;
        let storage_fee: Int = self.storageReserve - min(balance_before_msg, self.storageReserve);
        let fwd_fee: Int = ctx.readForwardFee();

        let rest_value: Int = ctx.value - (storage_fee + fwd_fee + self.DEPOSIT_GAS_FEE);
        let ton_amount: Int = rest_value - self.POOL_DEPOSIT_FEE;
        require(ton_amount > 0, "invalid deposit amount");

        // record in cache
        self.deposit_cache.set(msg.query_id, ton_amount);

        // deposit in the staker pool
        send(SendParameters {
            bounce: true,
            to: self.staker,
            value: 0,
            mode: SendRemainingValue,
            body: DepositInStaker {
                query_id: msg.query_id
            }.toCell()
        });
    }

    receive(msg: TokenNotification) {
        require(sender() == self.self_jetton_wallet, "invalid sender");

        if (msg.from == newAddress(0, 0)) {
            // tston minted
            self._handle_deposit(msg.query_id, msg.amount);
        } else if (msg.from == self.master_jetton_wallet) {
            // tston transfered from master
            self._handle_withdraw(msg.query_id, msg.amount);
        } else {
            // not expected sender, we just send it back
            self._handle_unexpected_token(msg.query_id, msg.amount, msg.from);
        }
    }

    receive(msg: Withdraw) {
        self.requireOwner();
        require(msg.amount > 0 && msg.amount <= self.tston_amount, "invalid amount");
        self.tston_amount = self.tston_amount - msg.amount;

        send(SendParameters {
            bounce: true,
            to: self.master,
            value: 0,
            mode: SendRemainingBalance,
            body: WithdrawInternal {
                query_id: msg.query_id,
                owner: self.owner,
                amount: msg.amount
            }
        });
    }

    receive(msg: StakerWithdrawal) {
        let ctx: Context = context();
        let balance_before_msg: Int = myBalance() - ctx.value;
        let storage_fee: Int = self.storageReserve - min(balance_before_msg, self.storageReserve);
        let fwd_fee: Int = ctx.readForwardFee();
        let rest_value: Int = ctx.value - (storage_fee + fwd_fee + self.WITHDRAW_GAS_FEE);
        require(rest_value > 0, "insufficient rest value");

        let timestamp: Int = now();
        self.twab_store.insert(self.ton_amount, timestamp);
        self.ton_amount = self.ton_amount - ctx.value;

        send(SendParameters {
            bounce: false,
            to: self.owner,
            value: rest_value,
            mode: SendPayGasSeparately + SendIgnoreErrors,
            body: WithdrawNotification {
                query_id: msg.query_id
            }.toCell()
        });

        send(SendParameters {
            bounce: false,
            to: self.master,
            value: 0,
            mode: SendIgnoreErrors,
            body: WithdrawReceipt {
                timestamp: timestamp,
                owner: self.owner,
                amount: ctx.value
            }
        });
    }

    receive("clean dust") {
        self.requireOwner();
        let ctx: Context = context();
        let dust_value: Int = myBalance() - ctx.value - self.storageReserve;

        if (dust_value > 0) {
            send(SendParameters {
                bounce: false,
                to: self.owner,
                value: dust_value,
                mode: SendRemainingValue + SendIgnoreErrors,
                body: "receive dust".asComment()
            });
        }
    }

    bounced(src: bounced<DepositInStaker>) {
        self.deposit_cache.set(src.query_id, null);
    }

    bounced(src: bounced<WithdrawInternal>) {
        self.tston_amount = self.tston_amount + src.amount;
    }

    fun _handle_deposit(query_id: Int, tston_amount: Int) {
        let ctx: Context = context();
        let fwd_fee: Int = ctx.readForwardFee();
        require(myBalance() > self.storageReserve + fwd_fee + self.MASTER_GAS_FEE, "insufficient balance");

        // get ton amount from cache
        let ton_amount: Int? = self.deposit_cache.get(query_id);
        require(ton_amount != null, "query id not exists");
        self.deposit_cache.set(query_id, null);

        let timestamp: Int = now();
        self.twab_store.insert(self.ton_amount, timestamp);
        self.ton_amount = self.ton_amount + ton_amount!!;
        self.tston_amount = self.tston_amount + tston_amount;

        // timestamp + owner + amount
        let payload: Slice = beginCell()
            .storeTimestamp(timestamp)
            .storeAddress(self.owner)
            .storeCoins(ton_amount!!)
            .asSlice();
        // transfer tston to master
        send(SendParameters {
            bounce: false,
            to: self.master_jetton_wallet,
            value: 0,
            mode: SendRemainingValue,
            body: TokenTransfer {
                query_id: query_id,
                amount: tston_amount,
                destination: self.master,
                response_destination: myAddress(),
                forward_ton_amount: self.MASTER_GAS_FEE,
                forward_payload: payload
            }
        });
    }

    fun _handle_withdraw(query_id: Int, amount: Int) {
        send(SendParameters {
            bounce: false,
            to: self.self_jetton_wallet,
            value: 0,
            mode: SendRemainingValue,
            body: TokenBurn {
                query_id: query_id,
                amount: amount,
                response_destination: myAddress()
            }
        });
    }

    fun _handle_unexpected_token(query_id: Int, amount: Int, from: Address) {
        send(SendParameters {
            bounce: false,
            to: self.self_jetton_wallet,
            value: 0,
            mode: SendRemainingValue,
            body: TokenTransfer {
                query_id: query_id,
                amount: amount,
                destination: from,
                response_destination: myAddress(),
                forward_ton_amount: 0,
                forward_payload: emptySlice()
            }
        });
    }
}