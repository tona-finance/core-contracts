import "../library/helper";
import "../messages";

const INVALID_SENDER: Int = 0;

trait BasePrizeReserve with MsgValueHelper {

    jetton_wallet: Address;

    receive(msg: ClaimPrizeDebtInternal) {
        self.require_ticket(msg.user, msg.draw);

        self.forward(
            self.jetton_wallet,
            TokenTransfer {
                query_id: msg.query_id,
                amount: msg.amount,
                destination: msg.user,
                response_destination: msg.user,
                forward_ton_amount: 0,
                forward_payload: emptySlice()
            }.toCell(),
            false,
            null
        );
    }

    inline fun init_prize_reserve(jetton_wallet: Address) {
        self.jetton_wallet = jetton_wallet;
    }

    inline fun require_jetton_wallet() {
        nativeThrowWhen(INVALID_SENDER, sender() != self.jetton_wallet);
    }

    inline fun require_ticket(user: Address, draw: Address) {
        nativeThrowWhen(INVALID_SENDER, sender() != self.get_ticket_address(user, draw));
    }

    abstract inline fun get_ticket_address(user: Address, draw: Address): Address;
}