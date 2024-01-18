import "../library/twab";
import "../lirabry/math";
import "../messages";
import "./beacon";

const INVALID_TIER: Int = 0xF001;
const DRAW_OVERED: Int = 0xF002;
const DRAW_NOT_OVER: Int = 0xF003;
const INVALID_SENDER: Int = 0xF003;

trait PrizeDistributor with DrawBeacon {

    const CHOICES: Int = 16;
    const CARDINALITY: Int = 5;
    const PICK_BITS: Int = 4 * 5;
    const TOTAL_PICKS: Int = 1 << (4 * 5);

    // from draw beacon
    // ---------------------
    active: Bool;
    pool: Address;
    reserve: Address?;
    period: Int;
    jetton_wallet: Address?;
    start: Twab?;
    end: Twab?;
    // ---------------------

    prize_amount: Int;
    winning_number: Int;
    prize_percentage: map<Int, Int>;
    deadline: Int;
    avail_prize_amount: Int;

    receive("send to reserve") {
        self.require_active();
        nativeThrowWhen(DRAW_NOT_OVER, now() < self.deadline);
        require(self.avail_prize_amount > 0, "invalid avail prize amount");
        let amount: Int = self.avail_prize_amount;
        self.avail_prize_amount = 0;

        send(SendParameters {
            bounce: false,
            to: self.jetton_wallet!!,
            value: ton("0.05"),
            mode: 0,
            body: TokenTransfer {
                query_id: 0,
                amount: amount,
                destination: self.reserve!!,
                response_destination: myAddress(),
                forward_ton_amount: ton("0.01"),
                forward_payload: emptySlice()
            }.toCell()
        });
    }

    receive(msg: ClaimPrizeInternal) {
        self.require_active();
        nativeThrowWhen(DRAW_OVERED, now() >= self.deadline);
        let sender: Address = sender();
        nativeThrowUnless(INVALID_SENDER, sender == self.get_ticket_address(msg.user));

        // TODO: check gas

        let prize_amount: Int = self.compute_prize_amount(msg.pick_payload);
        if (prize_amount > 0) {
            let pay_amount: Int = min(prize_amount, self.avail_prize_amount);
            if (pay_amount > 0) {
                self.avail_prize_amount = self.avail_prize_amount - pay_amount;
                send(SendParameters {
                    bounce: false,
                    to: self.jetton_wallet!!,
                    value: ton("0.05"),
                    mode: 0,
                    body: TokenTransfer {
                        query_id: msg.query_id,
                        amount: pay_amount,
                        destination: msg.user,
                        response_destination: myAddress(),
                        forward_ton_amount: ton("0.01"),
                        forward_payload: emptySlice()
                    }.toCell()
                });
            }

            let debt_amount: Int = prize_amount - pay_amount;
            if (debt_amount > 0) {
                send(SendParameters {
                    bounce: false,
                    to: sender,
                    value: ton("0.01"),
                    mode: 0,
                    body: PayPrizeDebtInternal {
                        amount: debt_amount
                    }.toCell()
                });
            } else {
                // TODO: refund gas
            }
        }
    }

    inline fun init_distributor() {
        self.prize_amount = 0;
        self.winning_number = 0;
        self.prize_percentage = emptyMap();
        self.prize_percentage.set(0, 1);
        self.prize_percentage.set(1, 3);
        self.prize_percentage.set(2, 8);
        self.prize_percentage.set(3, 23);
        self.prize_percentage.set(4, 65);
        self.deadline = 0;
        self.avail_prize_amount = 0;
    }

    inline fun start_distributor(prize_amount: Int, deadline: Int) {
        self.prize_amount = prize_amount;
        self.winning_number = randomInt() % self.TOTAL_PICKS;
        self.deadline = deadline;
        self.avail_prize_amount = self.avail_prize_amount + prize_amount; 
    }

    inline fun prizes_per_tier(tier: Int): Int {
        if (tier == 0) {
            return 1;
        } else if (tier == 1) {
            return 15;
        } else if (tier == 2) {
            return 240;
        } else if (tier == 3) {
            return 3840;
        } else if (tier == 4) {
            return 61440;
        } else {
            throw(INVALID_TIER);
        }
    }

    fun prize_amount_per_pick(tier: Int): Int {
        let percentage: Int? = self.prize_percentage.get(tier);
        if (percentage != null) {
            let prizes: Int = self.prizes_per_tier(tier);
            return self.prize_amount * percentage!! / 100 / prizes;
        } else {
            return 0;
        }
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

    fun compute_prize_amount(pick_payload: Slice): Int {
        let prize_amount: Int = 0;
        let size: Int = pick_payload.loadUint(8);
        repeat(size) {
            let pick_number: Int = pick_payload.loadUint(self.PICK_BITS);
            let tier: Int = self.compute_tier(pick_number);
            let amount: Int = self.prize_amount_per_pick(tier);
            prize_amount = prize_amount + amount;
        }
        return prize_amount;
    }

    abstract inline fun get_ticket_address(user: Address): Address;
}
