import "@stdlib/ownable";
import "./library/timestamp";
import "./library/twab";
import "./library/helper";
import "./messages";


trait BasePoolAccount with Ownable, MsgValueHelper {

    owner: Address; // from Ownable

    master: Address;
    staker: Address;
    jetton_wallet: Address?;
    twab_store: TwabStore;
    share_amount: Int;
    contribute_amount: Int;
    withdraw_amount: Int;

    lock: Bool;
    deposit_amount: Int;

    receive(msg: JettonExcesses) {
        self.forward(self.owner, null, false, null);
    }

    // === contract messages ===

    receive(msg: StakerWithdrawal) {
        self.require_staker();

        let ctx: Context = context();
        let withdraw_amount: Int = ctx.value - ton("1.0");
        let timestamp: Int = now();
        self.twab_store.insert(self.share_amount, timestamp);
        self.share_amount = self.share_amount - withdraw_amount;

        self.forward(
            self.master,
            WithdrawFinishInternal {
                query_id: msg.query_id,
                timestamp: timestamp,
                amount: withdraw_amount,
                user: self.owner
            }.toCell(),
            false,
            null
        );
    }

    receive(msg: InitPoolAccountInternal) {
        self.require_master();

        self.jetton_wallet = msg.jetton_wallet;
        // refund gas
        self.forward(self.owner, null, false, null);
    }

    // === user messages ===

    receive(msg: Deposit) {
        self.require_unlocked();
        self.requireOwner();

        let ctx: Context = context();
        // deposit gas fee 0.01
        let rest_value: Int = self.msg_value(ctx, ton("0.01"));
        let fwd_fee: Int = ctx.readForwardFee();
        // staker fee 1.0
        let staker_fee: Int = ton("1.0");
        let deposit_amount: Int = rest_value - fwd_fee - staker_fee;
        require(deposit_amount > 0, "Invalid deposit amount");
        self.set_deposit(deposit_amount);

        // deposit in the staker pool
        send(SendParameters {
            bounce: true, // bounce this message
            to: self.staker,
            value: deposit_amount + staker_fee,
            mode: SendPayGasSeparately + SendIgnoreErrors,
            body: DepositInStaker {
                query_id: msg.query_id
            }.toCell()
        });
    }

    receive(msg: Withdraw) {
        self.requireOwner();
        require(msg.amount > 0, "Zero amount");

        // withdraw gas fee > 1.5
        let rest_value: Int = self.msg_value(context(), ton("2.0"));
        require(rest_value >= 0, "Insufficient value");

        let acc_withdraw_amount: Int = self.withdraw_amount;
        self.withdraw_amount = self.withdraw_amount + msg.amount;

        self.forward(
            self.master,
            WithdrawInternal {
                query_id: msg.query_id,
                withdraw_amount: msg.amount,
                acc_contribute_amount: self.contribute_amount,
                acc_withdraw_amount: acc_withdraw_amount,
                user: self.owner
            }.toCell(),
            true, // bounce this message
            null
        );
    }

    bounced(src: DepositInStaker) {
        self.reset_deposit();
    }

    bounced(src: bounced<WithdrawInternal>) {
        self.withdraw_amount = self.withdraw_amount - src.withdraw_amount;
    }

    fun on_jetton_minted(query_id: Int, amount: Int) {
        self.require_locked();
        // ctx value is 0.1 from staker

        // get ton amount from cache
        let deposit_amount: Int = self.deposit_amount;
        self.reset_deposit();

        let timestamp: Int = now();
        self.twab_store.insert(self.share_amount, timestamp);
        self.share_amount = self.share_amount + deposit_amount;
        self.contribute_amount = self.contribute_amount + amount;

        // timestamp + deposit_amount + user
        let payload: Cell = beginCell()
            .storeCoins(deposit_amount)
            .storeTimestamp(timestamp)
            .storeAddress(self.owner)
            .endCell();
        self.forward(
            self.jetton_wallet!!,
            JettonTransfer {
                query_id: query_id,
                amount: amount,
                destination: self.master,
                response_destination: self.owner,
                custom_payload: null,
                forward_ton_amount: ton("0.1"), // handle jetton notification of master
                forward_payload: beginCell().storeRef(payload).asSlice()
            }.toCell(),
            false,
            null
        );
    }

    // receive withdrawn jetton amount from master
    fun on_jetton_received_from_master(query_id: Int, amount: Int) {
        let payload: Cell = beginCell()
            .storeUint(0, 1) // wait_till_round_end = false
            .storeUint(1, 1) // fill_or_kill = true
            .endCell();
        send(SendParameters {
            bounce: false,
            to: self.jetton_wallet!!,
            value: ton("1.05"), // jetton burn fee in staker
            mode: SendPayGasSeparately + SendIgnoreErrors,
            body: JettonBurn {
                query_id: query_id,
                amount: amount,
                response_destination: self.owner,
                custom_payload: payload
            }.toCell()
        });

        // refund gas
        self.forward(self.owner, null, false, null);
    }

    inline fun set_deposit(amount: Int) {
        self.lock = true;
        self.deposit_amount = amount;
    }

    inline fun reset_deposit() {
        self.lock = false;
        self.deposit_amount = 0;
    }

    inline fun require_unlocked() {
        require(!self.lock, "Account locked");
    }

    inline fun require_locked() {
        require(self.lock, "Account unlocked");
    }

    inline fun require_master() {
        require(sender() == self.master, "Invalid sender");
    }

    inline fun require_jetton_wallet() {
        require(sender() == self.jetton_wallet!!, "Invalid sender");
    }

    inline fun require_staker() {
        require(sender() == self.staker, "Invalid sender");
    }
}
