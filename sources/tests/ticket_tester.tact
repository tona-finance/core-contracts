import "@stdlib/deploy";

const PICK_BITS: Int = 3 * 4;
const TOTAL_PICKS: Int = 1 << (3 * 4);
const CHOICES: Int = 16;
const PRIZE_SCALE_0: Int = 16 * 15 * 5;
const PRIZE_SCALE_1: Int = 16 * 20;
const PRIZE_SCALE_2: Int = 1 * 75;
const PRIZE_SCALE_BASE: Int = 16 * 15 * 100;


struct WinningSplit {
    n0: Int as uint8;
    n1: Int as uint8;
    n2: Int as uint8;
}

inline fun new_winning_split(winning_number: Int): WinningSplit {
    let n0: Int = winning_number % CHOICES;
    winning_number = winning_number / CHOICES;
    let n1: Int = winning_number % CHOICES;
    winning_number = winning_number / CHOICES;
    let n2: Int = winning_number % CHOICES;
    return WinningSplit {
        n0: n0,
        n1: n1,
        n2: n2
    };
}

extends fun compute_prize_scale(self: WinningSplit, pick_number: Int): Int {
    let num: Int = pick_number % CHOICES;
    if (num != self.n0) {
        return 0;
    }
    pick_number = pick_number / CHOICES;
    num = pick_number % CHOICES;
    if (num != self.n1) {
        return PRIZE_SCALE_2;
    }
    pick_number = pick_number / CHOICES;
    num = pick_number % CHOICES;
    if (num != self.n2) {
        return PRIZE_SCALE_1;
    }
    return PRIZE_SCALE_0;
}

message ComputePickNumber {
    index: Int as uint16;
    expected_number: Int as uint16;
}

message ComputePrizeAmount {
    expected_amount: Int as coins;
    index_payload: Cell;
}

contract TicketTester with Deployable {

    owner: Address;
    picks: Int as uint16;
    prize_amount: Int as coins;
    winning_split: WinningSplit;
    used_indexes: map<Int, Bool>;

    init(owner: Address, picks: Int, prize_amount: Int, winning_number: Int) {
        self.owner = owner;
        self.picks = picks;
        self.prize_amount = prize_amount;
        self.winning_split = new_winning_split(winning_number);
        self.used_indexes = emptyMap();
    }

    receive(msg: ComputePickNumber) {
        let pick_number: Int = self.compute_pick_number(msg.index) % TOTAL_PICKS;
        require(pick_number == msg.expected_number, "Unmatched pick number");
    }

    receive(msg: ComputePrizeAmount) {
        let prize_scale: Int = self.compute_prize_scale(msg.index_payload.beginParse());
        let prize_amount: Int = self.prize_amount * prize_scale / PRIZE_SCALE_BASE;
        require(prize_amount == msg.expected_amount, "Unmatched prize amount");
    }

    fun compute_prize_scale(index_payload: Slice): Int {
        let size: Int = index_payload.bits() / PICK_BITS;
        self.picks = self.picks - size;
        require(self.picks >= 0, "Insufficient picks");

        // 12 + 12 + ... + 12
        // \______  _______/
        //        \/
        //       <=85
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
