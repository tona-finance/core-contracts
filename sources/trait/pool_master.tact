import "@stdlib/ownable";
import "../library/timestamp";
import "../library/twab";
import "../library/helper";
import "../staker/wallet";
import "../messages";

trait BasePoolMaster with MsgValueHelper, OwnableTransferable {

    owner: Address; // from OwnableTransferable

    staker: Address;
    jetton_master: Address;
    jetton_wallet_code: Cell;
    jetton_wallet: Address;
    twab: Twab;
    share_amount: Int;
    contribute_amount: Int;
    spent_amount: Int;
    next_period: Int;

    receive("init draw") {
        self.requireOwner();
        require(self.next_period == 0, "already initialized");

        let ctx: Context = context();
        // initialize gas fee 0.01
        let rest_value: Int = self.msg_value(ctx, ton("0.01"));
        // deploy value 0.2
        require(rest_value >= ton("0.2"), "insufficient value");

        let twab: Twab = self.twab.nextTwab(self.share_amount, now());
        self.init_draw(sender(), twab);
    }

    receive("init account") {
        let sinit: StateInit = self.get_account_init(sender());
        let account: Address = contractAddress(sinit);
        let jetton_wallet: Address = get_jetton_wallet_address(
            account,
            self.jetton_master,
            self.jetton_wallet_code
        );
        self.forward(
            account,
            InitPoolAccountInternal {
                staker: self.staker,
                jetton_wallet: jetton_wallet
            }.toCell(),
            false,
            sinit
        );
    }

    receive(msg: SetPrize) {
        self.requireOwner();
        require(self.next_period > 0, "not initialized");

        let ctx: Context = context();
        // initialize gas fee 0.02
        let rest_value: Int = self.msg_value(ctx, ton("0.02"));
        // transfer value 0.05
        // deploy value 0.1
        let transfer_value: Int = ton("0.05");
        let deploy_value: Int = ton("0.1");
        require(rest_value >= transfer_value + deploy_value, "insufficient value");

        self.spent_amount = self.spent_amount + msg.amount;

        let twab: Twab = self.twab.nextTwab(self.share_amount, now());
        self.send_prize_to_draw(transfer_value, twab, msg.amount);

        // deploy next draw
        self.init_draw(sender(), twab);
    }

    receive(msg: WithdrawInternal) {
        self.require_account(msg.user);
        // spent jetton amount shared on user
        let spent_amount: Int = self.spent_amount * msg.acc_contribute_amount / self.contribute_amount;
        // verify withdraw for user
        require(
            msg.withdraw_amount + msg.acc_withdraw_amount + spent_amount <= msg.acc_contribute_amount,
            "invalid withdraw amount"
        );

        self.forward(
            self.jetton_wallet,
            TokenTransfer {
                query_id: msg.query_id,
                amount: msg.withdraw_amount,
                destination: sender(),
                response_destination: msg.user,
                forward_ton_amount: ton("1.1"), // handle jetton notification of account, including burn fee
                forward_payload: emptySlice()
            }.toCell(),
            false,
            null
        );
    }

    receive(msg: WithdrawFinishInternal) {
        self.require_account(msg.user);

        self.twab = self.twab.nextTwab(self.share_amount, msg.timestamp);
        self.share_amount = self.share_amount - msg.amount;

        // notify to user
        self.forwad(
            msg.user,
            WithdrawNotify {
                query_id: msg.query_id,
                timestamp: msg.timestamp,
                share_amount: msg.amount
            }.toCell(),
            false,
            null
        );
    }

    fun send_prize_to_draw(value: Int, twab: Twab, amount: Int) {
        // twab timestamp + twab amount + owner
        let payload: Slice = beginCell()
            .storeTimestamp(twab.timestamp)
            .storeUint(twab.amount, 128)
            .storeAddress(self.owner)
            .asSlice();
        send(SendParameters {
            bounce: false,
            to: self.jetton_wallet,
            value: value,
            mode: SendIgnoreErrors,
            body: TokenTransfer {
                query_id: 0,
                amount: amount,
                destination: self.get_draw_address(self.period - 1),
                response_destination: self.owner,
                forward_ton_amount: ton("0.1"), // handle jetton notification of draw
                forward_payload: payload
            }.toCell()
        });
    }

    fun init_draw(deployer: Address, twab: Twab) {
        let period: Int = self.next_period;
        self.next_period = self.next_period + 1;

        let sinit: StateInit = self.get_draw_init(period);
        let draw: Address = contractAddress(sinit);
        let draw_jetton_wallet: Address = get_jetton_wallet_address(
            draw,
            self.jetton_master,
            self.jetton_wallet_code
        );
        self.forward(
            draw,
            InitDrawInternal {
                deployer: deployer,
                reserve: self.get_reserve_address(),
                jetton_wallet: draw_jetton_wallet,
                timestamp: twab.timestamp,
                amount: twab.amount
            }.toCell(),
            false,
            sinit
        );
    }

    fun on_jetton_received_from_account(query_id: Int, amount: Int, payload: Slice) {
        // timestamp + user + deposit_amount
        let timestamp: Int = payload.loadTimestamp();
        let user: Address = payload.loadAddress();
        let deposit_amount: Int = payload.loadCoins();
        payload.endParse();

        require(msg.from == self.get_account_address(user), "invalid account");
        self.twab = self.twab.nextTwab(self.share_amount, timestamp);
        self.share_amount = self.share_amount + deposit_amount;
        self.contribute_amount = self.contribute_amount + amount;

        // notify to user
        self.forward(
            user,
            DepositNotify {
                query_id: query_id,
                timestamp: timestamp,
                share_amount: deposit_amount,
                contribute_amount: amount
            }.toCell(),
            false,
            null
        );
    }

    inline fun init_master(
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
        self.twab = newTwab();
        self.share_amount = 0;
        self.contribute_amount = 0;
        self.spent_amount = 0;
        self.next_period = 0;
    }

    inline fun require_jetton_wallet() {
        require(sender() == self.jetton_wallet, "invalid sender");
    }

    inline fun require_account(user: Address) {
        require(sender() == self.get_account_address(user), "invalid sender");
    }

    inline fun get_account_address(user: Address): Address {
        let sinit: StateInit = self.get_account_init(user);
        return contractAddress(sinit);
    }

    inline fun get_draw_address(period: Int): Address {
        let sinit: StateInit = self.get_draw_init(period);
        return contractAddress(sinit);
    }

    abstract inline fun get_reserve_address(): Address;

    abstract inline fun get_account_init(user: Address): StateInit;

    abstract inline fun get_draw_init(period: Int): StateInit;
}
