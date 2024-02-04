import "@stdlib/deploy";
import "./library/twab";
import "./library/timestamp";
import "./library/prize_calculator";
import "./messages";
import "./data";
import "./base_ticket.tact";
import "./base_prize_reserve";
import "./base_pool_master";
import "./prize_distributor";
import "./ticket_manager";

// === Pool Master Contract ===

contract PoolMaster with BasePoolMaster, Deployable {
    override const storageReserve: Int = ton("0.1"); // from base trait

    // from BasePoolMaster
    // --------------------
    owner: Address;

    twab: Twab;
    share_amount: Int as coins = 0;
    borrow_amount: Int as coins = 0;
    prize_amount: Int as coins = 0;
    next_period: Int as uint32 = 0;
    // --------------------

    init(owner: Address) {
        self.owner = owner;
        self.twab = new_twab();
    }

    inline fun _get_prize_reserve_address(): Address {
        let sinit: StateInit = initOf PrizeReserve(myAddress());
        return contractAddress(sinit);
    }

    override inline fun _get_account_init(user: Address): StateInit {
        let prize_reserve: Address = self._get_prize_reserve_address();
        return initOf PoolAccount(user, myAddress(), prize_reserve);
    }

    override inline fun _get_draw_init(period: Int): StateInit {
        let prize_reserve: Address = self._get_prize_reserve_address();
        return initOf Draw(myAddress(), prize_reserve, period);
    }

    // === get functions ===

    get fun get_core_data(): PoolMasterData {
        return PoolMasterData {
            owner: self.owner,
            prize_reserve: self._get_prize_reserve_address(),
            twab: self.twab,
            share_amount: self.share_amount,
            borrow_amount: self.borrow_amount,
            prize_amount: self.prize_amount,
            next_period: self.next_period
        };
    }

    get fun get_account_address(user: Address): Address {
        return self._get_account_address(user);
    }

    get fun get_draw_address(period: Int): Address {
        return self._get_draw_address(period);
    }
}

// === Pool Account Contract ===

contract PoolAccount with TicketManager, Deployable {
    override const storageReserve: Int = ton("0.1"); // from base trait

    // from TicketManager
    // ---------------------
    owner: Address;

    master: Address;
    twab_store: TwabStore;
    share_amount: Int as coins = 0;
    lock: Bool = false;
    // ---------------------

    prize_reserve: Address;
    debt_amount: Int as coins = 0;

    init(owner: Address, master: Address, prize_reserve: Address) {
        self.owner = owner;
        self.master = master;
        self.twab_store = new_twab_store();
        self.prize_reserve = prize_reserve;
    }

    override inline fun _get_draw_init(period: Int): StateInit {
        return initOf Draw(self.master, self.prize_reserve, period);
    }

    override inline fun _get_ticket_init(period: Int): StateInit {
        let draw: Address = self._get_draw_address(period);
        return initOf Ticket(self.owner, myAddress(), draw, period);
    }

    // === get functions ===

    get fun get_core_data(): PoolAccountData {
        return PoolAccountData {
            owner: self.owner,
            master: self.master,
            prize_reserve: self.prize_reserve,
            share_amount: self.share_amount,
            debt_amount: self.debt_amount
        };
    }

    get fun get_ticket_address(period: Int): Address {
        return self._get_ticket_address(period);
    }

    get fun get_twab_size(): Int {
        return self.twab_store.size;
    }

    get fun binary_search_twab(timestamp: Int): Twab {
        return self.twab_store.binary_search_twab(self.share_amount, timestamp);
    }
}

// === Draw Contract ===

contract Draw with PrizeDistributor {
    override const storageReserve: Int = ton("0.1");

    // from prize distributor
    // ---------------------
    active: Bool = false;
    pool_master: Address;
    prize_reserve: Address;
    period: Int as uint32 = 0;
    start: Twab?;
    end: Twab?;
    prize_amount: Int as coins = 0;
    avail_prize_amount: Int as coins = 0;
    winning_number: Int as uint32 = 0;
    deadline: Int as uint64 = 0;
    // ---------------------

    init(pool_master: Address, prize_reserve: Address, period: Int) {
        self.pool_master = pool_master;
        self.prize_reserve = prize_reserve;
        self.period = period;
    }

    override inline fun _get_ticket_init(user: Address, pool_account: Address): StateInit {
        return initOf Ticket(user, pool_account, myAddress(), self.period);
    }

    // === get functions ===

    get fun get_core_data(): DrawData {
        return DrawData {
            active: self.active,
            pool_master: self.pool_master,
            prize_reserve: self.prize_reserve,
            period: self.period,
            start: self.start,
            end: self.end,
            prize_amount: self.prize_amount,
            avail_prize_amount: self.avail_prize_amount,
            winning_number: self.winning_number,
            deadline: self.deadline
        };
    }
}

// === Ticket Contract ===

contract Ticket with BaseTicket {
    override const storageReserve: Int = ton("0.1");

    // from BaseTicket
    // ----------------
    owner: Address;

    active: Bool = false;
    pool_account: Address;
    draw: Address;
    period: Int as uint32;
    winning_split: WinningSplit?;
    picks: Int as uint32 = 0;
    used_indexes: map<Int, Bool>;
    // ----------------

    init(owner: Address, pool_account: Address, draw: Address, period: Int) {
        self.owner = owner;
        self.pool_account = pool_account;
        self.draw = draw;
        self.period = period;
        self.used_indexes = emptyMap();
    }

    // === get functions ===

    get fun get_core_data(): TicketData {
        return TicketData {
            active: self.active,
            owner: self.owner,
            pool_account: self.pool_account,
            draw: self.draw,
            period: self.period,
            picks: self.picks
        };
    }

    get fun get_index_status(index: Int): Bool? {
        return self.used_indexes.get(index);
    }
}

// === Prize Reserve Contract ===

contract PrizeReserve with BasePrizeReserve, Deployable {
    override const storageReserve: Int = ton("0.01");

    pool_master: Address;

    init(pool_master: Address) {
        self.pool_master = pool_master;
    }

    override inline fun _get_pool_account_init(user: Address): StateInit {
        return initOf PoolAccount(user, self.pool_master, myAddress());
    }

    // === get functions ===

    get fun get_core_data(): PrizeReserveData {
        return PrizeReserveData {
            pool_master: self.pool_master,
            balance: myBalance() - self.storageReserve
        };
    }
}
