
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
