import "@stdlib/ownable";
import "../messages";

const TICKET_INACTIVE: Int = 0xF000;

trait BaseTicket with OwnableTransferable {

    const PICK_BITS: Int = 4 * 5;
    const TOTAL_PICKS: Int = 1 << (4 * 5);

    owner: Address; // from OwnableTransferable

    active: Bool;
    period: Int;
    draw: Address;
    picks: Int;
    used_indexes: map<Int, Bool>;
    debt_amount: Int;

    receive(msg: InitTicket) {
        nativeThrowUnless(INVALID_SENDER, sender() == self.draw);

        self.picks = self.TOTAL_PICKS * msg.user_avg_balance / msg.beacon_avg_balance;
    }

    receive(msg: ClaimPrize) {
        nativeThrowUnless(TICKET_INACTIVE, self.active);
        self.requireOwner();

        // TODO: check gas

        let pick_payload: Slice = self.process_picks(msg.index_payload);
        self.forward(
            self.draw,
            ClaimPrizeInternal {
                query_id: msg.query_id,
                user: self.owner,
                pick_payload: pick_payload
            }.toCell(),
            false,
            null
        );
    }

    receive(msg: PayPrizeDebtInternal) {
        require(sender() == self.draw, "invalid sender");

        self.debt_amount = self.debt_amount + msg.amount;
    }

    receive(msg: ClaimPrizeDebt) {
        self.requireOwner();
        require(msg.amount <= self.debt_amount, "invalid amount");

        self.debt_amount = self.debt_amount - msg.amount;
        self.forward(
            msg.reserve,
            ClaimPrizeDebtInternal {
                query_id: msg.query_id,
                period: msg.period,
                user: self.owner,
                amount: msg.amount
            }.toCell(),
            false,
            null
        );
    }

    inline fun init_ticket(owner: Address, draw: Address, period: Int) {
        self.owner = owner;
        self.active = false;
        self.period = period;
        self.draw = draw;
        self.picks = 0;
        self.used_indexes = emptyMap();
        self.debt_amount = 0;
    }

    fun process_picks(index_payload: Slice): Slice {
        let size: Int = index_payload.bits() / self.PICK_BITS;
        require(size > 0 && size < 256, "invalid size");
        require(self.picks >= size, "insufficient picks");
        self.picks = self.picks - size;

        // 8 + 20 + 20 + ...
        let pick_payload: Builder = beginCell().storeUint(size, 8);
        repeat(size) {
            let pick_index: Int = index_payload.loadUint(self.PICK_BITS);
            let pick_used: Bool? = self.used_indexes.get(pick_index);
            require(pick_used == null, "pick used");
            self.used_indexes.set(pick_index, true);

            let pick_number: Int = self.compute_pick_number(pick_index);
            pick_payload.storeUint(pick_number % self.TOTAL_PICKS, self.PICK_BITS);
        }
        return pick_payload.asSlice();
    }

    fun compute_pick_number(index: Int): Int {
        let preimage: Cell = beginCell()
            .storeAddress(myAddress())
            .storeUint(index, self.PICK_BITS)
            .endCell();
        return hash(preimage);
    }
}