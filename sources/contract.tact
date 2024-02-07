import "@stdlib/deploy";
import "./library/twab";
import "./library/timestamp";
import "./messages";
import "./data";
import "./base_pool_master";
import "./base_draw";
import "./base_ticket.tact";
import "./base_prize_reserve";
import "./ticket_manager";

// === Pool Master Contract ===

contract PoolMaster with BasePoolMaster, Deployable {
    override const storageReserve: Int = ton("0.1"); // from base trait

    // from BasePoolMaster
    owner: Address; // from OwnableTransferable

    jetton_master: Address;
    jetton_wallet_code: Cell;
    twab: Twab;
    share_amount: Int as coins = 0;
    borrow_amount: Int as coins = 0;
    prize_amount: Int as coins = 0;
    avail_prize_amount: Int as coins = 0;
    jetton_amount: Int as coins = 0;
    next_period: Int as uint32 = 0;
    // ===========================

    init(owner: Address, jetton_master: Address, jetton_wallet_code: Cell) {
        self.owner = owner;
        self.jetton_master = jetton_master;
        self.jetton_wallet_code = jetton_wallet_code;
        self.twab = new_twab();
    }

    override inline fun _get_account_init(user: Address): StateInit {
        return initOf PoolAccount(user, myAddress());
    }

    override inline fun _get_draw_init(period: Int): StateInit {
        return initOf Draw(myAddress(), period);
    }

    override inline fun _get_ticket_init(period: Int, user: Address): StateInit {
        return initOf Ticket(user, myAddress(), period);
    }

    // === get functions ===

    get fun get_core_data(): PoolMasterData {
        return PoolMasterData {
            owner: self.owner,
            jetton_master: self.jetton_master,
            jetton_wallet_code: self.jetton_wallet_code,
            twab: self.twab,
            next_period: self.next_period,
            share_amount: self.share_amount,
            borrow_amount: self.borrow_amount,
            prize_amount: self.prize_amount,
            avail_prize_amount: self.avail_prize_amount,
            jetton_amount: self.jetton_amount
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
    override const storageReserve: Int = ton("0.5"); // from base trait

    // from TicketManager
    // ---------------------
    owner: Address;

    master: Address;
    twab_store: TwabStore;
    share_amount: Int as coins = 0;
    lock: Bool = false;

    debt_amount: Int as coins = 0;
    // ---------------------

    init(owner: Address, master: Address) {
        self.owner = owner;
        self.master = master;
        self.twab_store = new_twab_store();
    }

    override inline fun _get_draw_init(period: Int): StateInit {
        return initOf Draw(self.master, period);
    }

    // === get functions ===

    get fun get_core_data(): PoolAccountData {
        return PoolAccountData {
            owner: self.owner,
            master: self.master,
            share_amount: self.share_amount,
            debt_amount: self.debt_amount
        };
    }

    get fun get_twab_size(): Int {
        return self.twab_store.size;
    }

    get fun binary_search_twab(timestamp: Int): Twab {
        return self.twab_store.binary_search_twab(self.share_amount, timestamp);
    }
}

// === Draw Contract ===

contract Draw with BaseDraw {
    override const storageReserve: Int = ton("0.1");

    // from prize distributor
    // ---------------------
    active: Bool = false;
    pool_master: Address;
    period: Int as uint32;
    start: Twab?;
    end: Twab?;
    prize_amount: Int as coins = 0;
    jetton_amount: Int as coins = 0;
    winning_number: Int as uint16 = 0;
    // ---------------------

    init(pool_master: Address, period: Int) {
        self.pool_master = pool_master;
        self.period = period;
    }

    // === get functions ===

    get fun get_core_data(): DrawData {
        return DrawData {
            active: self.active,
            pool_master: self.pool_master,
            period: self.period,
            start: self.start,
            end: self.end,
            prize_amount: self.prize_amount,
            jetton_amount: self.jetton_amount,
            winning_number: self.winning_number
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
    pool_master: Address;
    period: Int as uint32;
    winning_split: WinningSplit?;
    total_prize_amount: Int as coins = 0;
    picks: Int as uint16 = 0;
    jetton_amount: Int as coins = 0;
    used_indexes: map<Int, Bool>;
    // ----------------

    init(owner: Address, pool_master: Address, period: Int) {
        self.owner = owner;
        self.pool_master = pool_master;
        self.period = period;
        self.used_indexes = emptyMap();
    }

    override inline fun _get_pool_account_init(): StateInit {
        return initOf PoolAccount(self.owner, self.pool_master);
    }

    // === get functions ===

    get fun get_core_data(): TicketData {
        return TicketData {
            active: self.active,
            owner: self.owner,
            pool_master: self.pool_master,
            period: self.period,
            picks: self.picks,
            jetton_amount: self.jetton_amount
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
        return initOf PoolAccount(user, self.pool_master);
    }

    // === get functions ===

    get fun get_core_data(): PrizeReserveData {
        return PrizeReserveData {
            pool_master: self.pool_master,
            balance: myBalance() - self.storageReserve
        };
    }
}
