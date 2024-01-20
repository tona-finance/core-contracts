import "@stdlib/ownable";
import "../library/helper";
import "../messages";

const ALREADY_ACTIVE: Int = 0xF001;
const INACTIVE: Int = 0xF000;

trait BaseTicket with MsgValueHelper, Ownable {

    const PICK_BITS: Int = 4 * 5;
    const TOTAL_PICKS: Int = 1 << (4 * 5);

    owner: Address; // from Ownable

    active: Bool;
    draw: Address;
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
        require(rest_value >= 0, "insufficient value");

        let pick_payload: Slice = self.compute_pick_payload(msg.index_payload);
        self.forward(
            self.draw,
            ClaimPrizeInternal {
                query_id: msg.query_id,
                user: self.owner,
                pick_payload: pick_payload
            }.toCell(),
            false,
            null
        );
    }

    receive(msg: ClaimPrizeDebt) {
        self.require_active();
        self.requireOwner();
        require(msg.amount <= self.debt_amount, "invalid amount");

        // claim prize debt gas fee 0.1
        let rest_value: Int = self.msg_value(context(), ton("0.1"));
        require(rest_value >= 0, "insufficient value");

        self.debt_amount = self.debt_amount - msg.amount;
        self.forward(
            msg.reserve,
            ClaimPrizeDebtInternal {
                query_id: msg.query_id,
                draw: self.draw,
                user: self.owner,
                amount: msg.amount
            }.toCell(),
            false,
            null
        );
    }

    receive(msg: PayPrizeDebtInternal) {
        self.require_draw();

        self.debt_amount = self.debt_amount + msg.amount;

        // refund gas
        self.forward(self.owner, null, false, null);
    }

    inline fun init_ticket(owner: Address, draw: Address) {
        self.owner = owner;
        self.active = false;
        self.draw = draw;
        self.picks = 0;
        self.used_indexes = emptyMap();
        self.debt_amount = 0;
    }

    fun compute_pick_payload(index_payload: Slice): Slice {
        let size: Int = index_payload.bits() / self.PICK_BITS;
        require(size > 0 && size < 256, "invalid size");
        require(self.picks >= size, "insufficient picks");
        self.picks = self.picks - size;

        // 8 + 20 + 20 + ...
        let pick_payload: Builder = beginCell().storeUint(size, 8);
        repeat(size) {
            let pick_index: Int = index_payload.loadUint(self.PICK_BITS);
            let pick_used: Bool? = self.used_indexes.get(pick_index);
            require(pick_used == null, "pick used");
            self.used_indexes.set(pick_index, true);

            let pick_number: Int = self.compute_pick_number(pick_index);
            pick_payload.storeUint(pick_number % self.TOTAL_PICKS, self.PICK_BITS);
        }
        return pick_payload.asSlice();
    }

    fun compute_pick_number(index: Int): Int {
        let preimage: Cell = beginCell()
            .storeAddress(myAddress())
            .storeUint(index, self.PICK_BITS)
            .endCell();
        return hash(preimage);
    }

    inline fun require_draw() {
        nativeThrowWhen(INVALID_SENDER, sender() != self.draw);
    }

    inline fun require_pool_account() {
        nativeThrowWhen(INVALID_SENDER, sender() != self.get_pool_account_address());
    }

    inline fun require_active() {
        nativeThrowUnless(INACTIVE, self.active);
    }

    inline fun require_inactive() {
        nativeThrowWhen(ALREADY_ACTIVE, self.active);
    }

    abstract inline fun get_pool_account_address(): Address;
}