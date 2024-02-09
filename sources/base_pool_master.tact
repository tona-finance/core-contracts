import "@stdlib/ownable";
import "./library/twab";
import "./library/timestamp";
import "./library/jetton_wallet";
import "./messages";

trait BasePoolMaster with OwnableTransferable {

    owner: Address; // from OwnableTransferable

    jetton_master: Address;
    jetton_wallet_code: Cell;
    twab: Twab;
    share_amount: Int;
    borrow_amount: Int;
    prize_amount: Int;
    avail_prize_amount: Int;
    jetton_amount: Int;
    next_period: Int;

    receive("init draw") {
        self.requireOwner();
        require(self.next_period == 0, "Draw already initialized");

        // deploy fee 0.3
        require(context().value >= ton("0.3"), "Insufficient value");

        let twab: Twab = self.twab.next_twab(self.share_amount, now());
        let sinit: StateInit = self._get_draw_init(self.next_period);
        self.next_period = self.next_period + 1;
        self.forward(
            contractAddress(sinit),
            InitDraw {
                twab_timestamp: twab.timestamp,
                twab_amount: twab.amount,
                refund_address: self.owner
            }.toCell(),
            false,
            sinit
        );
    }

    receive("open draw") {
        self.requireOwner();
        require(self.next_period > 0, "Draw not initialized");
        require(self.prize_amount > 0, "Insufficient prize amount");

        // set prize fee 0.4
        require(context().value >= ton("0.4"), "Insufficient value");

        let twab: Twab = self.twab.next_twab(self.share_amount, now());
        send(SendParameters {
            bounce: false,
            to: self._get_draw_address(self.next_period - 1),
            value: ton("0.1"),
            mode: 0,
            body: OpenDraw {
                twab_timestamp: twab.timestamp,
                twab_amount: twab.amount,
                prize_amount: self.prize_amount,
                jetton_amount: self.jetton_amount,
                refund_address: self.owner
            }.toCell()
        });
        // reset prize amount and jetton amount
        self.prize_amount = 0;
        self.jetton_amount = 0;

        // deploy next draw
        let sinit: StateInit = self._get_draw_init(self.next_period);
        self.next_period = self.next_period + 1;

        self.native_reserve();
        send(SendParameters {
            bounce: false,
            to: contractAddress(sinit),
            value: 0,
            mode: SendRemainingBalance,
            body: InitDraw {
                twab_timestamp: twab.timestamp,
                twab_amount: twab.amount,
                refund_address: self.owner
            }.toCell(),
            code: sinit.code,
            data: sinit.data
        });
    }

    receive(msg: JettonNotification) {
        self.require_jetton_wallet();

        self.jetton_amount = self.jetton_amount + msg.amount;
    }

    receive(msg: Repay) {
        require(msg.amount > 0, "Invalid repay amount");

        if (msg.amount <= self.borrow_amount) {
            self.borrow_amount = self.borrow_amount - msg.amount;
        } else {
            let amount: Int = msg.amount - self.borrow_amount;
            self.borrow_amount = 0;
            self.prize_amount = self.prize_amount + msg.amount;
            self.avail_prize_amount = self.avail_prize_amount + amount;
        }

        self.native_reserve();
        send(SendParameters {
            bounce: false,
            to: sender(),
            value: 0,
            mode: SendRemainingBalance + SendIgnoreErrors
        });
    }

    receive(msg: Borrow) {
        self.requireOwner();
        require(msg.amount > 0, "Invalid borrow amount");

        self.borrow_amount = self.borrow_amount + msg.amount;

        self.native_reserve();
        send(SendParameters {
            bounce: false,
            to: self.owner,
            value: 0,
            mode: SendRemainingBalance + SendIgnoreErrors
        });
    }

    receive(msg: DepositInternal) {
        self.require_account(msg.user);

        let timestamp: Int = now();
        self.twab = self.twab.next_twab(self.share_amount, timestamp);
        self.share_amount = self.share_amount + msg.amount;

        self.native_reserve();
        send(SendParameters {
            bounce: false,
            to: sender(),
            value: 0,
            mode: SendRemainingBalance,
            body: DepositFinish {
                timestamp: timestamp,
                amount: msg.amount
            }.toCell()
        });
    }

    receive(msg: WithdrawInternal) {
        self.require_account(msg.user);
        require(self.share_amount - self.borrow_amount >= msg.amount, "Insufficient balance");

        let timestamp: Int = now();
        self.twab = self.twab.next_twab(self.share_amount, timestamp);
        self.share_amount = self.share_amount - msg.amount;

        self.native_reserve();
        send(SendParameters {
            bounce: false,
            to: sender(),
            value: 0,
            mode: SendRemainingBalance,
            body: WithdrawFinish {
                timestamp: timestamp,
                amount: msg.amount
            }.toCell()
        });
    }

    receive(msg: ClaimPrizeInternal) {
        self.require_ticket(msg.period, msg.user);

        let pay_amount: Int = min(msg.amount, self.avail_prize_amount);
        let debt_amount: Int = msg.amount - pay_amount;
        self.avail_prize_amount = self.avail_prize_amount - pay_amount;
        self.native_reserve();

        if (msg.amount > 0) {
            if (debt_amount > 0) {
                // send prize to user
                send(SendParameters {
                    bounce: false,
                    to: msg.user,
                    value: pay_amount,
                    mode: SendPayGasSeparately + SendIgnoreErrors
                });

                // send debt to pool account
                send(SendParameters {
                    bounce: false,
                    to: self._get_account_address(msg.user),
                    value: 0,
                    mode: SendRemainingBalance,
                    body: PayPrizeDebtInternal {
                        amount: debt_amount,
                        user: msg.user
                    }.toCell()
                });
                return;
            }
        }

        // send all to user
        send(SendParameters {
            bounce: false,
            to: msg.user,
            value: 0,
            mode: SendRemainingBalance + SendIgnoreErrors
        });
    }

    receive(msg: ClaimJettonInternal) {
        self.require_ticket(msg.period, msg.user);

        // jetton amount is always enough since it is calculated accurately
        self.forward(
            self._get_jetton_wallet_address(),
            JettonTransfer {
                query_id: 0,
                amount: msg.amount,
                destination: msg.user,
                response_destination: msg.user,
                custom_payload: null,
                forward_ton_amount: 0,
                forward_payload: beginCell().asSlice()
            }.toCell(),
            false,
            null
        );
    }

    inline fun native_reserve() {
        nativeReserve(self.storageReserve + self.share_amount + self.avail_prize_amount - self.borrow_amount, 0);
    }

    inline fun require_jetton_wallet() {
        require(sender() == self._get_jetton_wallet_address(), "Only jetton wallet");
    }

    inline fun require_account(user: Address) {
        require(sender() == self._get_account_address(user), "Only pool account");
    }

    inline fun require_ticket(period: Int, user: Address) {
        require(sender() == self._get_ticket_address(period, user), "Only ticket");
    }

    inline fun _get_jetton_wallet_address(): Address {
        let sinit: StateInit = get_jetton_wallet_state_init(
            myAddress(),
            self.jetton_master,
            self.jetton_wallet_code
        );
        return compute_jetton_wallet_address(sinit);
    }

    inline fun _get_draw_address(period: Int): Address {
        let sinit: StateInit = self._get_draw_init(period);
        return contractAddress(sinit);
    }

    inline fun _get_account_address(user: Address): Address {
        let sinit: StateInit = self._get_account_init(user);
        return contractAddress(sinit);
    }

    inline fun _get_ticket_address(period: Int, user: Address): Address {
        let sinit: StateInit = self._get_ticket_init(period, user);
        return contractAddress(sinit);
    }

    abstract inline fun _get_draw_init(period: Int): StateInit;

    abstract inline fun _get_account_init(user: Address): StateInit;

    abstract inline fun _get_ticket_init(period: Int, user: Address): StateInit;
}
