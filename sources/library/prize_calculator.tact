
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
