import "@stdlib/ownable";
import "../messages";

trait BasePrizeReserve with OwnableTransferable {

    owner: Address; // from ownable

    jetton_wallet: Address;
    debt_amount: Int;

    receive(msg: TokenNotification) {
        require(sender() == self.jetton_wallet, "invalid sender");

        if (msg.from == self.owner) {
            self.debt_amount = self.debt_amount + msg.amount;
        }
    }

    receive(msg: RepayToOwner) {
        self.requireOwner();
        require(msg.amount <= self.debt_amount, "invalid amount");

        // TODO: check gas

        self.debt_amount = self.debt_amount - msg.amount;
        self.forward(
            self.jetton_wallet,
            TokenTransfer {
                query_id: msg.query_id,
                amount: msg.amount,
                destination: self.owner,
                response_destination: myAddress(),
                forward_ton_amount: 0,
                forward_payload: emptySlice()
            }.toCell(),
            false,
            null
        );
    }

    receive(msg: ClaimPrizeDebtInternal) {
        require(sender() == self.get_ticket_address(msg.period, msg.user), "invalid sender");

        self.forward(
            self.jetton_wallet,
            TokenTransfer {
                query_id: msg.query_id,
                amount: amount,
                destination: msg.user,
                response_destination: myAddress(),
                forward_ton_amount: 0,
                forward_payload: emptySlice()
            }.toCell(),
            false,
            null
        );
    }

    inline fun init_prize_reserve(owner: Address, jetton_wallet: Address) {
        self.owner = owner;
        self.jetton_wallet = jetton_wallet;
        self.debt_amount = 0;
    }

    abstract inline fun get_ticket_address(period: Int, user: Address): Address;
}