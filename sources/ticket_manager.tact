import "./library/twab";
import "./library/prize_calculator";
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

        // deploy and init ticket
        let sinit: StateInit = StateInit {
            code: msg.ticket_code,
            data: msg.ticket_data
        };
        self.forward(
            contractAddress(sinit),
            InitTicketInternal {
                winning_number: msg.winning_number,
                total_prize_amount: msg.prize_amount,
                picks: TOTAL_PICKS * avg_balance / msg.avg_balance,
                jetton_amount: msg.jetton_amount * avg_balance / msg.avg_balance
            }.toCell(),
            false,
            sinit
        );
    }

    receive(msg: PayPrizeDebtInternal) {
        self.require_master();

        self.debt_amount = self.debt_amount + msg.amount;

        // refund gas
        self.forward(msg.user, null, false, null);
    }

    receive(msg: ClaimPrizeDebt) {
        self.requireOwner();
        require(msg.amount <= self.debt_amount, "Invalid claim amount");

        self.debt_amount = self.debt_amount - msg.amount;
        self.forward(
            self.master,
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
        require(sender() == self._get_draw_address(period), "Only draw");
    }

    inline fun _get_draw_address(period: Int): Address {
        let sinit: StateInit = self._get_draw_init(period);
        return contractAddress(sinit);
    }

    abstract fun _get_draw_init(period: Int): StateInit;
}