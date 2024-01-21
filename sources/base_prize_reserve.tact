import "./library/helper";
import "./messages";


trait BasePrizeReserve with MsgValueHelper {

    jetton_wallet: Address;

    receive(msg: ClaimPrizeDebtInternal) {
        self.require_ticket(msg.user, msg.draw, msg.period);

        self.forward(
            self.jetton_wallet,
            TokenTransfer {
                query_id: msg.query_id,
                amount: msg.amount,
                destination: msg.user,
                response_destination: msg.user,
                custom_payload: null,
                forward_ton_amount: 0,
                forward_payload: emptySlice()
            }.toCell(),
            false,
            null
        );
    }

    inline fun require_jetton_wallet() {
        require(sender() == self.jetton_wallet, "Invalid sender");
    }

    inline fun require_ticket(user: Address, draw: Address, period: Int) {
        require(sender() == self.get_ticket_address(user, draw, period), "Invalid sender");
    }

    abstract inline fun get_ticket_address(user: Address, draw: Address, period: Int): Address;
}
