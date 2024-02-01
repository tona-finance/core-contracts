import "@stdlib/deploy";

message ComputePickNumber {
    index: Int as uint32;
    expected_number: Int as uint32;
}

message ComputePickPayload {
    prize_tester: Address;
    index_payload: Slice as remaining;
}

contract TicketTester with Deployable {

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
        let pick_builder: Builder = beginCell();
        // Every cell has up to 4 references to other cells, but currently 
        // max gas (1.0) limit to 3 references.
        repeat(3) {
            let index_payload: Slice = msg.index_payload.loadRef().beginParse();
            let pick_payload: Cell = self.compute_pick_payload(index_payload);
            pick_builder = pick_builder.storeRef(pick_payload);
        }

        self.forward(
            msg.prize_tester,
            ComputePrizeAmount {
                pick_payload: pick_builder.asSlice()
            }.toCell(),
            false,
            null
        );
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


message ComputePrizeAmount {
    pick_payload: Slice as remaining;
}

contract PrizeTester with Deployable {

    const PICK_BITS: Int = 4 * 5;
    const TOTAL_PICKS: Int = 1 << (4 * 5);
    const CARDINALITY: Int = 5;
    const CHOICES: Int = 16;
    
    winning_number: Int as uint32;
    prize_amount: Int as coins;
    prize_percentage_0: Int as uint8;
    prize_percentage_1: Int as uint8;
    prize_percentage_2: Int as uint8;
    prize_percentage_3: Int as uint8;
    prize_percentage_4: Int as uint8;

    init(prize_amount: Int) {
        self.winning_number = randomInt() % self.TOTAL_PICKS;
        self.prize_amount = prize_amount;
        self.prize_percentage_0 = 1;
        self.prize_percentage_1 = 3;
        self.prize_percentage_2 = 8;
        self.prize_percentage_3 = 23;
        self.prize_percentage_4 = 65;
    }

    receive(msg: ComputePrizeAmount) {
        let prize_amount: Int = 0;
        repeat(3) {
            let pick_payload: Slice = msg.pick_payload.loadRef().beginParse();
            let amount: Int = self.compute_prize_amount(pick_payload);
            prize_amount = prize_amount + amount;
        }
    }

    fun compute_prize_amount(pick_payload: Slice): Int {
        let prize_amount: Int = 0;
        let size: Int = pick_payload.bits() / self.PICK_BITS;
        repeat(size) {
            let pick_number: Int = pick_payload.loadUint(self.PICK_BITS);
            let tier: Int = self.compute_tier(pick_number);
            let amount: Int = self.prize_amount_per_pick(tier);
            prize_amount = prize_amount + amount;
        }
        return prize_amount;
    }

    fun compute_tier(pick_number: Int): Int {
        let winning_number: Int = self.winning_number;
        let tier: Int = self.CARDINALITY;
        let user_num: Int = pick_number % self.CHOICES;
        let win_num: Int = winning_number % self.CHOICES;
        while(user_num != win_num && tier > 0) {
            tier = tier - 1;
            pick_number = pick_number / self.CHOICES;
            winning_number = winning_number / self.CHOICES;
            user_num = pick_number % self.CHOICES;
            win_num = winning_number % self.CHOICES;
        }
        return tier;
    }

    inline fun prize_amount_per_pick(tier: Int): Int {
        if (tier == 0) {
            return self.prize_amount * self.prize_percentage_0 / 100;
        } else if (tier == 1) {
            return self.prize_amount * self.prize_percentage_1 / 1500;
        } else if (tier == 2) {
            return self.prize_amount * self.prize_percentage_2 / 24000;
        } else if (tier == 3) {
            return self.prize_amount * self.prize_percentage_3 / 384000;
        } else if (tier == 4) {
            return self.prize_amount * self.prize_percentage_4 / 6144000;
        } else {
            return 0;
        }
    }
}