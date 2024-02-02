import "@stdlib/ownable";
import "./library/timestamp";
import "./library/twab";
import "./messages";

trait BasePoolMaster with OwnableTransferable {

    owner: Address; // from OwnableTransferable

    twab: Twab;
    share_amount: Int;
    borrow_amount: Int;
    prize_amount: Int;
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

    receive(msg: Repay) {
        require(msg.amount > 0, "Invalid repay amount");

        if (msg.amount <= self.borrow_amount) {
            self.borrow_amount = self.borrow_amount - msg.amount;
        } else {
            let amount: Int = msg.amount - self.borrow_amount;
            self.borrow_amount = 0;
            self.prize_amount = self.prize_amount + msg.amount;
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

    receive(msg: OpenDraw) {
        self.requireOwner();
        require(self.next_period > 0, "Draw not initialized");
        require(msg.prize_amount > 0 && msg.prize_amount <= self.prize_amount, "Invalid prize amount");
        self.prize_amount = self.prize_amount - msg.prize_amount;

        // set prize fee 0.4
        require(context().value >= ton("0.4"), "Insufficient value");

        let twab: Twab = self.twab.next_twab(self.share_amount, now());
        send(SendParameters {
            bounce: false,
            to: self._get_draw_address(self.next_period - 1),
            value: msg.prize_amount + ton("0.1"),
            mode: SendPayGasSeparately,
            body: OpenDrawInternal {
                twab_timestamp: twab.timestamp,
                twab_amount: twab.amount,
                refund_address: self.owner
            }.toCell()
        });

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

    inline fun native_reserve() {
        nativeReserve(self.storageReserve + self.share_amount + self.prize_amount - self.borrow_amount, 0);
    }

    inline fun require_account(user: Address) {
        require(sender() == self._get_account_address(user), "invalid sender");
    }

    inline fun _get_account_address(user: Address): Address {
        let sinit: StateInit = self._get_account_init(user);
        return contractAddress(sinit);
    }

    inline fun _get_draw_address(period: Int): Address {
        let sinit: StateInit = self._get_draw_init(period);
        return contractAddress(sinit);
    }

    abstract inline fun _get_account_init(user: Address): StateInit;

    abstract inline fun _get_draw_init(period: Int): StateInit;
}
