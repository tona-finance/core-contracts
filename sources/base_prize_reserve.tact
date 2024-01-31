import "./library/helper";
import "./messages";


trait BasePrizeReserve with MsgValueHelper {

    receive() {}

    receive(msg: ClaimPrizeDebtInternal) {
        self.require_ticket(msg.user, msg.draw, msg.period);

        let ctx: Context = context();
        let fee: Int = ctx.readForwardFee() + ton("0.01");
        nativeReserve(myBalance() - self.storageReserve - fee - msg.amount, 0);
        send(SendParameters {
            bounce: false,
            to: msg.user,
            value: msg.amount,
            mode: SendRemainingBalance
        });
    }

    inline fun require_ticket(user: Address, draw: Address, period: Int) {
        require(sender() == self._get_ticket_address(user, draw, period), "Invalid sender");
    }

    inline fun _get_ticket_address(user: Address, draw: Address, period: Int): Address {
        let sinit: StateInit = self._get_ticket_init(user, draw, period);
        return contractAddress(sinit);
    }

    abstract inline fun _get_ticket_init(user: Address, draw: Address, period: Int): StateInit;
}
