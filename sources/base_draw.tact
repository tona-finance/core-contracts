import "./library/twab";
import "./library/prize_calculator";
import "./messages";

trait BaseDraw {

    active: Bool;
    pool_master: Address;
    period: Int;
    start: Twab?;
    end: Twab?;
    prize_amount: Int;
    jetton_amount: Int;
    winning_number: Int;

    receive(msg: InitDraw) {
        self.require_pool_master();

        self.start = Twab {
            timestamp: msg.twab_timestamp,
            amount: msg.twab_amount
        };
        // refund gas
        self.forward(msg.refund_address, null, false, null);
    }

    receive(msg: OpenDraw) {
        self.require_pool_master();
        require(msg.twab_timestamp > (self.start!!).timestamp, "Invalid twab timestamp");

        self.active = true;
        self.end = Twab {
            timestamp: msg.twab_timestamp,
            amount: msg.twab_amount
        };
        self.prize_amount = msg.prize_amount;
        self.jetton_amount = msg.jetton_amount;
        self.winning_number = randomInt() % TOTAL_PICKS;

        self.forward(msg.refund_address, null, false, null);
    }

    receive(msg: InitTicket) {
        self.require_active();

        let start: Twab = self.start!!;
        let end: Twab = self.end!!;

        self.forward(
            msg.pool_account,
            PrepareInitTicket {
                period: self.period,
                winning_number: self.winning_number,
                prize_amount: self.prize_amount,
                jetton_amount: self.jetton_amount,
                start: start.timestamp,
                end: end.timestamp,
                avg_balance: average_balance(start, end),
                ticket_code: msg.code,
                ticket_data: msg.data
            }.toCell(),
            false,
            null
        );
    }

    inline fun require_active() {
        require(self.active, "Draw is inactive");
    }

    inline fun require_pool_master() {
        require(sender() == self.pool_master, "Only pool master");
    }
}