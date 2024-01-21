import "./library/twab";
import "./library/timestamp";
import "./messages";
import "./prize_distributor";
import "./ticket";

struct DrawData {
    active: Bool;
    pool_master: Address;
    prize_reserve: Address;
    jetton_wallet: Address;
    period: Int as uint32;
    start: Twab;
    end: Twab;
    prize_amount: Int as coins;
    winning_number: Int as uint32;
    deadline: Int as uint64;
    avail_prize_amount: Int as coins;
}

contract Draw with PrizeDistributor {
    override const storageReserve: Int = ton("0.1");

    const EXPIRATION_INTERVAL: Int = 60 * 60 * 24 * 14; // 14 days

    // from prize distributor
    // ---------------------
    active: Bool = false;
    pool_master: Address;
    period: Int as uint32;
    jetton_wallet: Address?;
    start: Twab?;
    end: Twab?;

    prize_amount: Int as coins = 0;
    winning_number: Int as uint32 = 0;
    prize_percentage: map<Int, Int>;
    deadline: Int as uint64 = 0;
    avail_prize_amount: Int as coins = 0;
    // ---------------------

    reserve: Address;

    init(pool_master: Address, reserve: Address, period: Int) {
        self.pool_master = pool_master;
        self.period = period;        

        self.prize_percentage = emptyMap();
        self.prize_percentage.set(0, 1);
        self.prize_percentage.set(1, 3);
        self.prize_percentage.set(2, 8);
        self.prize_percentage.set(3, 23);
        self.prize_percentage.set(4, 65);

        self.reserve = reserve;
    }

    receive("send to reserve") {
        self.require_active();
        self.require_over();
        require(self.avail_prize_amount > 0, "No available prize");

        let rest_value: Int = self.msg_value(context(), ton("0.1"));
        // token transfer value 0.1
        require(rest_value >= 0, "Insufficient value");
        
        let amount: Int = self.avail_prize_amount;
        self.avail_prize_amount = 0;

        self.forward(
            self.jetton_wallet!!,
            TokenTransfer {
                query_id: 0,
                amount: amount,
                destination: self.reserve,
                response_destination: sender(),
                custom_payload: null,
                forward_ton_amount: 0, // no need to notify reserve
                forward_payload: emptySlice()
            }.toCell(),
            false,
            null
        );
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

    inline fun require_over() {
        require(now() >= self.deadline, "Draw is not over");
    }

    override inline fun _get_ticket_init(user: Address, pool_account: Address): StateInit {
        return initOf Ticket(user, pool_account, myAddress(), self.period);
    }

    // === get functions ===

    get fun get_core_data(): DrawData {
        return DrawData {
            active: self.active,
            pool_master: self.pool_master,
            prize_reserve: self.reserve,
            jetton_wallet: self.jetton_wallet!!,
            period: self.period,
            start: self.start!!,
            end: self.end!!,
            prize_amount: self.prize_amount,
            winning_number: self.winning_number,
            deadline: self.deadline,
            avail_prize_amount: self.avail_prize_amount
        };
    }

    get fun get_prize_percentage(tier: Int): Int? {
        return self.prize_percentage.get(tier);
    }
}
