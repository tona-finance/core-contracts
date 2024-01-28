import "./library/twab";
import "./library/helper";
import "./messages";
import "./draw_beacon";


trait PrizeDistributor with DrawBeacon, MsgValueHelper {

    const CHOICES: Int = 16;
    const CARDINALITY: Int = 5;
    const PICK_BITS: Int = 4 * 5;
    const TOTAL_PICKS: Int = 1 << (4 * 5);

    // from draw beacon
    // ---------------------
    active: Bool;
    pool_master: Address;
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

    receive(msg: ClaimPrizeInternal) {
        self.require_active();
        self.require_not_over();
        self.require_ticket(msg.user, msg.pool_account);

        let prize_amount: Int = self.compute_prize_amount(msg.pick_payload);
        if (prize_amount > 0) {
            let pay_amount: Int = min(prize_amount, self.avail_prize_amount);
            if (pay_amount > 0) {
                self.avail_prize_amount = self.avail_prize_amount - pay_amount;
                send(SendParameters {
                    bounce: false,
                    to: self.jetton_wallet!!,
                    value: ton("0.1"), // transfer value 0.1
                    mode: SendIgnoreErrors,
                    body: JettonTransfer {
                        query_id: msg.query_id,
                        amount: pay_amount,
                        destination: msg.user,
                        response_destination: msg.user,
                        custom_payload: null,
                        forward_ton_amount: 0,
                        forward_payload: emptySlice()
                    }.toCell()
                });
            }

            let debt_amount: Int = prize_amount - pay_amount;
            if (debt_amount > 0) {
                self.notify(
                    PayPrizeDebtInternal {
                        user: msg.user,
                        amount: debt_amount
                    }.toCell()
                );
                return;
            }
        }

        // refund gas
        self.forward(msg.user, null, false, null);
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

    inline fun activate_distributor(prize_amount: Int, deadline: Int) {
        self.prize_amount = prize_amount;
        self.winning_number = randomInt() % self.TOTAL_PICKS;
        self.deadline = deadline;
        self.avail_prize_amount = self.avail_prize_amount + prize_amount; 
    }

    inline fun prizes_per_tier(tier: Int): Int {
        require(tier < self.CARDINALITY, "Invalid tier");

        if (tier == 0) {
            return 1;
        } else if (tier == 1) {
            return 15;
        } else if (tier == 2) {
            return 240;
        } else if (tier == 3) {
            return 3840;
        } else {
            return 61440;
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

    inline fun require_ticket(user: Address, pool_account: Address) {
        require(sender() == self._get_ticket_address(user, pool_account), "Invalid sender");
    }

    inline fun require_not_over() {
        require(now() < self.deadline, "Draw is over");
    }

    inline fun _get_ticket_address(user: Address, pool_account: Address): Address {
        let sinit: StateInit = self._get_ticket_init(user, pool_account);
        return contractAddress(sinit);
    }

    abstract inline fun _get_ticket_init(user: Address, pool_account: Address): StateInit;
}
