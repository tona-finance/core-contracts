import "@stdlib/ownable";
import "./library/helper";
import "./messages";

trait BaseTicket with Ownable, MsgValueHelper {

    const PICK_BITS: Int = 4 * 5;
    const TOTAL_PICKS: Int = 1 << (4 * 5);

    owner: Address;

    active: Bool;
    pool_account: Address;
    draw: Address;
    period: Int;
    picks: Int;
    used_indexes: map<Int, Bool>;
    debt_amount: Int;

    receive(msg: InitTicketInternal2) {
        self.require_inactive();
        self.require_pool_account();

        self.active = true;
        self.picks = self.TOTAL_PICKS * msg.user_avg_balance / msg.draw_avg_balance;

        // refund gas
        self.forward(self.owner, null, false, null);
    }

    receive(msg: ClaimPrize) {
        self.require_active();
        self.requireOwner();

        // claim prize gas fee 1.0
        let rest_value: Int = self.msg_value(context(), ton("1.0"));
        require(rest_value >= 0, "Insufficient value");

        let pick_payload: Slice = self.compute_pick_payload(msg.index_payload);
        self.forward(
            self.draw,
            ClaimPrizeInternal {
                query_id: msg.query_id,
                user: self.owner,
                pool_account: self.pool_account,
                pick_payload: pick_payload
            }.toCell(),
            false,
            null
        );
    }

    receive(msg: ClaimPrizeDebt) {
        self.require_active();
        self.requireOwner();
        require(msg.amount <= self.debt_amount, "Invalid claim amount");

        // claim prize debt gas fee 0.1
        let rest_value: Int = self.msg_value(context(), ton("0.1"));
        require(rest_value >= 0, "Insufficient value");

        self.debt_amount = self.debt_amount - msg.amount;
        self.forward(
            msg.reserve,
            ClaimPrizeDebtInternal {
                query_id: msg.query_id,
                user: self.owner,
                draw: self.draw,
                period: self.period,
                amount: msg.amount
            }.toCell(),
            false,
            null
        );
    }

    receive(msg: PayPrizeDebtInternal) {
        self.require_active();
        self.require_draw();

        self.debt_amount = self.debt_amount + msg.amount;

        // refund gas
        self.forward(msg.user, null, false, null);
    }

    fun compute_pick_payload(index_payload: Slice): Slice {
        let size: Int = index_payload.bits() / self.PICK_BITS;
        require(size > 0 && size < 256, "Invalid pick size");
        require(self.picks >= size, "Insufficient picks");
        self.picks = self.picks - size;

        // 8 + 20 + 20 + ...
        let pick_payload: Builder = beginCell().storeUint(size, 8);
        repeat(size) {
            let pick_index: Int = index_payload.loadUint(self.PICK_BITS);
            let pick_used: Bool? = self.used_indexes.get(pick_index);
            require(pick_used == null, "Pick is used");
            self.used_indexes.set(pick_index, true);

            let pick_number: Int = self.compute_pick_number(pick_index);
            pick_payload.storeUint(pick_number % self.TOTAL_PICKS, self.PICK_BITS);
        }
        return pick_payload.asSlice();
    }

    inline fun compute_pick_number(index: Int): Int {
        return beginCell()
            .storeAddress(myAddress())
            .storeUint(index, self.PICK_BITS)
            .endCell()
            .hash();
    }

    inline fun require_draw() {
        require(sender() == self.draw, "Invalid sender");
    }

    inline fun require_pool_account() {
        require(sender() == self.pool_account, "Invalid sender");
    }

    inline fun require_active() {
        require(self.active, "Ticket is inactive");
    }

    inline fun require_inactive() {
        require(!self.active, "Ticket is active");
    }
}