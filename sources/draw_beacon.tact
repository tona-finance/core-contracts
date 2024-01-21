import "./library/twab";
import "./messages";

trait DrawBeacon {

    active: Bool;
    pool_master: Address;
    period: Int;
    jetton_wallet: Address?;
    start: Twab?;
    end: Twab?;

    receive(msg: InitDrawInternal) {
        self.require_pool_master();

        self.jetton_wallet = msg.jetton_wallet;
        self.start = Twab {
            timestamp: msg.twab_timestamp,
            amount: msg.twab_amount
        };

        // refund gas
        self.forward(msg.deployer, null, false, null);
    }

    receive(msg: InitTicket) {
        self.require_active();

        // note: no need to check gas

        let start: Twab = self.start!!;
        let end: Twab = self.end!!;
        let avg_balance: Int = averageBalance(start, end);

        self.forward(
            msg.pool_account,
            InitTicketInternal1 {
                period: self.period,
                start: start.timestamp,
                end: end.timestamp,
                avg_balance: avg_balance
            }.toCell(),
            false,
            null
        );
    }

    inline fun activate_beacon(twab: Twab) {
        self.end = twab;
    }

    inline fun require_active() {
        require(self.active, "Draw is inactive");
    }

    inline fun require_pool_master() {
        require(sender() == self.pool_master, "Invalid sender");
    }

    inline fun require_jetton_wallet() {
        require(sender() == self.jetton_wallet!!, "Invalid sender");
    }
}