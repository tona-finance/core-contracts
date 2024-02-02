import "./library/twab";
import "./messages";
import "./base_pool_account";


trait TicketManager with BasePoolAccount {

    // from BasePoolAccount
    // ---------------------
    owner: Address;

    master: Address;
    twab_store: TwabStore;
    share_amount: Int;
    lock: Bool;
    // ---------------------

    debt_amount: Int;

    receive(msg: PrepareInitTicket) {
        self.require_draw(msg.period);

        let start: Twab = self.twab_store.binary_search_twab(self.share_amount, msg.start);
        let end: Twab = self.twab_store.binary_search_twab(self.share_amount, msg.end);
        let avg_balance: Int = average_balance(start, end);
        require(avg_balance > 0, "Zero average balance");

        let sinit: StateInit = self._get_ticket_init(msg.period);
        // deploy and init ticket
        self.forward(
            contractAddress(sinit),
            InitTicketInternal {
                winning_number: msg.winning_number,
                draw_avg_balance: msg.avg_balance,
                user_avg_balance: avg_balance
            }.toCell(),
            false,
            sinit
        );
    }

    receive(msg: PayPrizeDebtInternal) {
        self.require_draw(msg.period);

        self.debt_amount = self.debt_amount + msg.amount;

        // refund gas
        self.forward(msg.user, null, false, null);
    }

    receive(msg: ClaimPrizeDebt) {
        self.requireOwner();
        require(msg.amount <= self.debt_amount, "Invalid claim amount");

        // claim prize debt gas fee 0.1
        let rest_value: Int = self.msg_value(context(), ton("0.1"));
        require(rest_value >= 0, "Insufficient value");

        self.debt_amount = self.debt_amount - msg.amount;
        self.forward(
            msg.reserve,
            ClaimPrizeDebtInternal {
                amount: msg.amount,
                user: self.owner
            }.toCell(),
            true, // bounce this message
            null
        );
    }

    bounced(src: bounced<ClaimPrizeDebtInternal>) {
        self.debt_amount = self.debt_amount + src.amount;
    }

    inline fun require_draw(period: Int) {
        require(sender() == self._get_draw_address(period), "Only from draw");
    }

    inline fun _get_draw_address(period: Int): Address {
        let sinit: StateInit = self._get_draw_init(period);
        return contractAddress(sinit);
    }

    inline fun _get_ticket_address(period: Int): Address {
        let sinit: StateInit = self._get_ticket_init(period);
        return contractAddress(sinit);
    }

    abstract fun _get_draw_init(period: Int): StateInit;

    abstract fun _get_ticket_init(period: Int): StateInit;
}