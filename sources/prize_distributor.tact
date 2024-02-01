import "./library/twab";
import "./library/helper";
import "./messages";
import "./draw_beacon";


trait PrizeDistributor with DrawBeacon, MsgValueHelper {

    const CHOICES: Int = 16;
    const CARDINALITY: Int = 5;
    const PICK_BITS: Int = 4 * 5;

    // from draw beacon
    // ---------------------
    active: Bool;
    pool_master: Address;
    prize_reserve: Address;
    period: Int;
    start: Twab?;
    end: Twab?;
    prize_amount: Int;
    avail_prize_amount: Int;
    winning_number: Int;
    deadline: Int;
    // ---------------------

    prize_percentage_0: Int;
    prize_percentage_1: Int;
    prize_percentage_2: Int;
    prize_percentage_3: Int;
    prize_percentage_4: Int;

    receive(msg: ClaimPrizeInternal) {
        self.require_active();
        self.require_not_over();
        self.require_ticket(msg.user, msg.pool_account);

        let prize_amount: Int = 0;
        repeat(4) {
            let pick_payload: Slice = msg.pick_payload.loadRef().beginParse();
            let amount: Int = self.compute_prize_amount(pick_payload);
            prize_amount = prize_amount + amount;
        }
        let pay_amount: Int = min(prize_amount, self.avail_prize_amount);
        let debt_amount: Int = prize_amount - pay_amount;
        self.avail_prize_amount = self.avail_prize_amount - pay_amount;
        self.native_reserve();

        if (prize_amount > 0) {
            if (debt_amount > 0) {
                // send prize to user
                send(SendParameters {
                    bounce: false,
                    to: msg.user,
                    value: pay_amount,
                    mode: SendPayGasSeparately + SendIgnoreErrors
                });

                // send debt to ticket
                send(SendParameters {
                    bounce: false,
                    to: sender(),
                    value: 0,
                    mode: SendRemainingBalance + SendIgnoreErrors,
                    body: PayPrizeDebtInternal {
                        user: msg.user,
                        amount: debt_amount
                    }.toCell()
                });
                return;
            }
        }

        // send all to user
        send(SendParameters {
            bounce: false,
            to: msg.user,
            value: 0,
            mode: SendRemainingBalance + SendIgnoreErrors
        });
    }

    fun prize_amount_per_pick(tier: Int): Int {
        if (tier == 0) {
            return self.prize_amount * self.prize_percentage_0 / 10000;
        } else if (tier == 1) {
            return self.prize_amount * self.prize_percentage_1 / 150000;
        } else if (tier == 2) {
            return self.prize_amount * self.prize_percentage_2 / 2400000;
        } else if (tier == 3) {
            return self.prize_amount * self.prize_percentage_3 / 38400000;
        } else if (tier == 4) {
            return self.prize_amount * self.prize_percentage_4 / 614400000;
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
        let size: Int = pick_payload.bits() / self.PICK_BITS;
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
