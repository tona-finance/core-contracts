import "./draw/ticket";
import "./messages";

const INVALID_SENDER: Int = 0;

contract Ticket with BaseTicket {

    // from BaseTicket
    // ----------------
    owner: Address; // from OwnableTransferable

    active: Bool;
    period: Int as uint32;
    draw: Address;
    picks: Int as uint32;
    used_indexes: map<Int, Bool>;
    debt_amount: Int as coins;
    // ----------------

    init(owner: Address, draw: Address, period: Int) {
        self.init_ticket(owner, draw, period);
    }
}
