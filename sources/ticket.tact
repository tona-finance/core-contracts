import "./base_ticket.tact";


struct TicketData {
    active: Bool;
    owner: Address;
    pool_account: Address;
    draw: Address;
    period: Int as uint32;
    picks: Int as uint32;
    debt_amount: Int as coins;
}

contract Ticket with BaseTicket {
    override const storageReserve: Int = ton("0.1");

    // from BaseTicket
    // ----------------
    owner: Address;

    active: Bool = false;
    pool_account: Address;
    draw: Address;
    period: Int as uint32;
    picks: Int as uint32 = 0;
    used_indexes: map<Int, Bool>;
    debt_amount: Int as coins = 0;
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
            picks: self.picks,
            debt_amount: self.debt_amount
        };
    }

    get fun get_index_status(index: Int): Bool? {
        return self.used_indexes.get(index);
    }
}
