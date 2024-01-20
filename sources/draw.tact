import "./library/twab";
import "./trait/prize_distributor";
import "./messages";
import "./ticket";

const INVALID_SENDER: Int = 0x0;

contract Draw with PrizeDistributor {
    override const storageReserve: Int = ton("0.1");

    const EXPIRATION_INTERVAL: Int = 60 * 60 * 24 * 14; // 14 days

    // from prize distributor
    // ---------------------
    active: Bool;
    pool_master: Address;
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

    init(pool_master: Address, period: Int) {
        self.init_beacon(pool_master, period);
        self.init_distributor();
    }

    receive(msg: TokenNotification) {
        self.require_jetton_wallet();

        if (msg.from == self.pool_master) {
            self.on_jetton_from_pool_master(msg.amount, msg.forward_payload);
        } else {
            // any jetton received can be prize
            self.avail_prize_amount = self.avail_prize_amount + msg.amount;
        }
    }

    fun on_jetton_from_pool_master(amount: Int, payload: Slice) {
        // twab timestamp + twab amount + pool owner
        let twab_timestamp: Int = payload.loadTimestamp();
        let twab_amount: Int = payload.loadUint(128);
        let owner: Address = payload.loadAddress();
        payload.endParse();

        let twab: Twab = Twab {
            timestamp: twab_timestamp,
            amount: twab_amount
        };
        let deadline: Int = now() + self.EXPIRATION_INTERVAL;
        self.activate(twab, amount, deadline);

        // refund to pool owner
        self.forward(owner, null, false, null);
    }

    inline fun activate(twab: Twab, prize_amount: Int, deadline: Int) {
        self.activate_beacon(twab);
        self.activate_distributor(prize_amount, deadline);
        self.active = true;
    }

    override inline fun get_ticket_address(user: Address): Address {
        let sinit: StateInit = initOf Ticket(user, myAddress());
        return contractAddress(sinit);
    }
}
