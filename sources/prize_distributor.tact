import "./library/twab";
import "./library/prize_calculator";
import "./messages";
import "./draw_beacon";


trait PrizeDistributor with DrawBeacon {

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

    receive(msg: ClaimPrizeInternal) {
        self.require_active();
        self.require_not_over();
        self.require_ticket(msg.user, msg.pool_account);

        let prize_amount: Int = self.compute_prize_amount(msg.prize_scale);
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

                // send debt to pool account
                send(SendParameters {
                    bounce: false,
                    to: msg.pool_account,
                    value: 0,
                    mode: SendRemainingBalance,
                    body: PayPrizeDebtInternal {
                        user: msg.user,
                        amount: debt_amount,
                        period: self.period
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

    inline fun compute_prize_amount(prize_scale: Int): Int {
        return self.prize_amount * prize_scale / TOTAL_PRIZE_SCALE;
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
