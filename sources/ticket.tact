import "./base_ticket.tact";


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
}
