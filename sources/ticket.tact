import "./trait/ticket";


contract Ticket with BaseTicket {
    override const storageReserve: Int = ton("0.1");

    // from BaseTicket
    // ----------------
    owner: Address;

    active: Bool;
    draw: Address;
    picks: Int as uint32;
    used_indexes: map<Int, Bool>;
    debt_amount: Int as coins;
    // ----------------

    init(owner: Address, draw: Address) {
        self.init_ticket(owner, draw);
    }
}
