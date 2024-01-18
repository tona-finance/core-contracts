import "../library/twab";
import "../messages";

const INACTIVE: Int = 0xF000;

trait DrawBeacon {

    active: Bool;
    pool: Address;
    reserve: Address?;
    period: Int;
    jetton_wallet: Address?;
    start: Twab?;
    end: Twab?;

    receive(msg: InitDraw) {
        require(sender() == self.pool, "invalid sender");

        self.reserve = msg.reserve;
        self.jetton_wallet = msg.jetton_wallet;
        self.start = Twab {
            timestamp: msg.twab_timestamp,
            amount: msg.twab_amount
        };

        // refund gas
        self.forward(msg.deployer, null, false, null);
    }

    inline fun init_beacon(pool: Address, period: Int) {
        self.active = false;
        self.pool = pool;
        self.period = period;
    }

    inline fun start_beacon(twab: Twab) {
        self.end = twab;
    }

    inline fun average_balance(): Int {
        self.require_active();
        return average_balance(self.start!!, self.end!!);
    }

    inline fun require_active() {
        nativeThrowUnless(INACTIVE, self.active);
    }
}