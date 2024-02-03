import "./library/twab";
import "./library/prize_calculator";
import "./messages";

trait DrawBeacon {

    const EXPIRATION_INTERVAL: Int = 60 * 60 * 24 * 14; // 14 days

    active: Bool;
    pool_master: Address;
    prize_reserve: Address;
    period: Int;
    start: Twab?;
    end: Twab?;
    prize_amount: Int;
    avail_prize_amount: Int;
    winning_number: Int;
    deadline: Int;

    receive("send to reserve") {
        self.require_active();
        self.require_over();

        self.avail_prize_amount = 0;

        self.native_reserve();
        send(SendParameters {
            bounce: false,
            to: self.prize_reserve,
            value: 0,
            mode: SendRemainingBalance
        });
    }

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
        self.winning_number = randomInt() % TOTAL_PICKS;
        self.deadline = now() + self.EXPIRATION_INTERVAL;

        let prize_amount: Int = context().value - ton("0.1");
        self.prize_amount = prize_amount;
        self.avail_prize_amount = prize_amount;

        self.native_reserve();
        // refund gas
        send(SendParameters {
            bounce: false,
            to: msg.refund_address,
            value: 0,
            mode: SendRemainingBalance + SendIgnoreErrors
        });
    }

    receive(msg: InitTicket) {
        self.require_active();

        let start: Twab = self.start!!;
        let end: Twab = self.end!!;
        let avg_balance: Int = average_balance(start, end);

        self.forward(
            msg.pool_account,
            PrepareInitTicket {
                period: self.period,
                winning_number: self.winning_number,
                start: start.timestamp,
                end: end.timestamp,
                avg_balance: avg_balance
            }.toCell(),
            false,
            null
        );
    }

    inline fun native_reserve() {
        nativeReserve(self.avail_prize_amount + self.storageReserve, 0);
    }

    inline fun require_active() {
        require(self.active, "Draw is inactive");
    }

    inline fun require_over() {
        require(now() >= self.deadline, "Draw is not over");
    }

    inline fun require_pool_master() {
        require(sender() == self.pool_master, "Only from pool master");
    }
}