import "./library/twab";
import "./tonstakers/wallet";
import "./draw/beacon";
import "./draw/distributor";
import "./messages";

const INVALID_SENDER: Int = 0x0;

contract Draw with PrizeDistributor {

    const EXPIRATION_INTERVAL: Int = 60 * 60 * 24 * 14; // 14 days

    // from prize distributor
    // ---------------------
    active: Bool;
    pool: Address;
    reserve: Address?;
    period: Int as uint32;
    jetton_wallet: Address?;
    start: Twab?;
    end: Twab?;

    prize_amount: Int as coins;
    winning_number: Int as uint32;
    prize_percentage: map<Int, Int>;
    deadline: Int as uint64;
    avail_prize_amount: Int as coins;
    // ---------------------

    init(pool: Address, period: Int) {
        self.init_beacon(pool, period);
        self.init_distributor();
    }

    receive(msg: TokenExcesses) {}

    receive(msg: TokenNotification) {
        nativeThrowUnless(INVALID_SENDER, sender() == self.jetton_wallet);

        if (msg.from == self.pool) {
            self.on_jetton_from_pool(msg.amount, msg.forward_payload);
        } else {
            // any jetton received can be prize
            self.avail_prize_amount = self.avail_prize_amount + msg.amount;
        }
    }

    fun on_jetton_from_pool(amount: Int, payload: Slice) {
        // twab timestamp + twab amount
        let twab_timestamp: Int = payload.loadTimestamp();
        let twab_amount: Int = payload.loadUint(128);
        payload.endParse();

        let twab: Twab = Twab {
            timestamp: twab_timestamp,
            amount: twab_amount
        };
        let deadline: Int = now() + self.EXPIRATION_INTERVAL;
        self.start(twab, amount, deadline);
    }

    inline fun start(twab: Twab, prize_amount: Int, deadline: Int) {
        self.start_beacon(twab);
        self.start_distributor(prize_amount, deadline);
        self.active = true;
    }
}
