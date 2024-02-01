
message ComputePickNumber {
    index: Int as uint32;
    expected_number: Int as uint32;
}

message ComputePickPayload {
    index_payload: Slice;
}

contract TicketTester {

    const PICK_BITS: Int = 4 * 5;
    const TOTAL_PICKS: Int = 1 << (4 * 5);

    owner: Address;
    picks: Int as uint32 = 0;
    used_indexes: map<Int, Bool>;

    init(owner: Address, size: Int) {
        self.owner = owner;
        self.picks = size;
        self.used_indexes = emptyMap();
    }

    receive(msg: ComputePickNumber) {
        let pick_number: Int = self.compute_pick_number(msg.index) % self.TOTAL_PICKS;
        require(pick_number == msg.expected_number, "Invalid pick number");
    }

    receive(msg: ComputePickPayload) {
        self.compute_pick_payload(msg.index_payload);
    }

    fun compute_pick_payload(index_payload: Slice): Cell {
        let size: Int = index_payload.bits() / self.PICK_BITS;
        // 51 * 20 = 1020
        require(size <= 51, "Invalid pick size");
        self.picks = self.picks - size;
        require(self.picks >= 0, "Insufficient picks");

        // 20 + 20 + ... + 20
        // \______  _______/
        //        \/
        //       <=51
        let pick_payload: Builder = beginCell();
        repeat(size) {
            let pick_index: Int = index_payload.loadUint(self.PICK_BITS);
            let pick_used: Bool? = self.used_indexes.get(pick_index);
            require(pick_used == null, "Pick is used");
            self.used_indexes.set(pick_index, true);

            let pick_number: Int = self.compute_pick_number(pick_index);
            pick_payload.storeUint(pick_number % self.TOTAL_PICKS, self.PICK_BITS);
        }
        return pick_payload.endCell();
    }

    inline fun compute_pick_number(index: Int): Int {
        return beginCell()
            .storeAddress(myAddress())
            .storeUint(index, self.PICK_BITS)
            .endCell()
            .hash();
    }
}