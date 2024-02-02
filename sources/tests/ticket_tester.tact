import "@stdlib/deploy";


const CARDINALITY: Int = 4;
const PICK_BITS: Int = 4 * 4;
const TOTAL_PICKS: Int = 1 << (4 * 4);
const CHOICES: Int = 16;
const PRIZE_SCALE_0: Int = 16 * 16 * 15 * 250;
const PRIZE_SCALE_1: Int = 16 * 16 * 750;
const PRIZE_SCALE_2: Int = 16 * 2250;
const PRIZE_SCALE_3: Int = 1 * 6750;
const TOTAL_PRIZE_SCALE: Int = 16 * 16 * 15 * 10000;


struct WinningSplit {
    n0: Int as uint8;
    n1: Int as uint8;
    n2: Int as uint8;
    n3: Int as uint8;
}

fun empty_winning_split(): WinningSplit {
    return WinningSplit {
        n0: 0,
        n1: 0,
        n2: 0,
        n3: 0
    };
}

extends mutates fun apply(self: WinningSplit, winning_number: Int) {
    self.n0 = winning_number % CHOICES;
    winning_number = winning_number / CHOICES;
    self.n1 = winning_number % CHOICES;
    winning_number = winning_number / CHOICES;
    self.n2 = winning_number % CHOICES;
    winning_number = winning_number / CHOICES;
    self.n3 = winning_number % CHOICES;
}

extends fun compute_prize_scale(self: WinningSplit, pick_number: Int): Int {
    let num: Int = pick_number % CHOICES;
    if (num != self.n0) {
        return 0;
    }
    pick_number = pick_number / CHOICES;
    num = pick_number % CHOICES;
    if (num != self.n1) {
        return PRIZE_SCALE_3;
    }
    pick_number = pick_number / CHOICES;
    num = pick_number % CHOICES;
    if (num != self.n2) {
        return PRIZE_SCALE_2;
    }
    pick_number = pick_number / CHOICES;
    num = pick_number % CHOICES;
    if (num != self.n3) {
        return PRIZE_SCALE_1;
    }
    return PRIZE_SCALE_0;
}

message ComputePickNumber {
    index: Int as uint32;
    expected_number: Int as uint32;
}

message ComputePrizeAmount {
    expected_amount: Int as coins;
    index_payload: Slice as remaining;
}

contract TicketTester with Deployable {

    owner: Address;
    picks: Int as uint32 = 0;
    prize_amount: Int as coins = 0;
    winning_split: WinningSplit;
    used_indexes: map<Int, Bool>;

    init(owner: Address, picks: Int, prize_amount: Int) {
        self.owner = owner;
        self.picks = picks;
        self.prize_amount = prize_amount;
        self.winning_split = empty_winning_split();
        self.used_indexes = emptyMap();
    }

    receive(msg: ComputePickNumber) {
        let pick_number: Int = self.compute_pick_number(msg.index) % TOTAL_PICKS;
        require(pick_number == msg.expected_number, "Unmatched pick number");
    }

    receive(msg: ComputePrizeAmount) {
        let prize_scale: Int = 0;
        repeat(2) {
            let index_payload: Slice = msg.index_payload.loadRef().beginParse();
            prize_scale = prize_scale + self.compute_prize_scale(index_payload);
        }
        let prize_amount: Int = self.prize_amount * prize_scale / TOTAL_PRIZE_SCALE;
        require(prize_amount == msg.expected_amount, "Unmatched prize amount");
    }

    fun compute_prize_scale(index_payload: Slice): Int {
        let size: Int = index_payload.bits() / PICK_BITS;
        self.picks = self.picks - size;
        require(self.picks >= 0, "Insufficient picks");

        // 16 + 16 + ... + 16
        // \______  _______/
        //        \/
        //       <=63
        let scale: Int = 0;
        repeat(size) {
            let pick_index: Int = index_payload.loadUint(PICK_BITS);
            let pick_used: Bool? = self.used_indexes.get(pick_index);
            require(pick_used == null, "Pick used");
            self.used_indexes.set(pick_index, true);

            let pick_number: Int = self.compute_pick_number(pick_index);
            scale = scale + self.winning_split.compute_prize_scale(pick_number);
        }
        return scale;
    }

    inline fun compute_pick_number(index: Int): Int {
        let hash: Int = beginCell()
            .storeAddress(myAddress())
            .storeUint(index, PICK_BITS)
            .endCell()
            .hash();
        return hash % TOTAL_PICKS;
    }
}
