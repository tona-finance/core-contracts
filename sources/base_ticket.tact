import "@stdlib/ownable";
import "./library/helper";
import "./library/prize_calculator";
import "./messages";

trait BaseTicket with Ownable, MsgValueHelper {

    owner: Address;

    active: Bool;
    pool_master: Address;
    period: Int;
    winning_split: WinningSplit?;
    total_prize_amount: Int;
    picks: Int;
    jetton_amount: Int;
    used_indexes: map<Int, Bool>;

    receive(msg: InitTicketInternal) {
        self.require_inactive();
        self.require_pool_account();

        self.active = true;
        self.winning_split = new_winning_split(msg.winning_number);
        self.total_prize_amount = msg.total_prize_amount;
        self.picks = msg.picks;
        self.jetton_amount = msg.jetton_amount;

        // refund gas
        self.forward(self.owner, null, false, null);
    }

    receive(msg: ClaimPrize) {
        self.require_active();
        self.requireOwner();

        // claim prize gas fee 0.5
        let rest_value: Int = self.msg_value(context(), ton("0.5"));
        require(rest_value >= 0, "Insufficient value");

        let index_payload: Slice = msg.index_payload.beginParse();
        let prize_scale: Int = self.compute_prize_scale(index_payload);

        self.forward(
            msg.pool_master,
            ClaimPrizeInternal {
                amount: self.total_prize_amount * prize_scale / PRIZE_SCALE_BASE,
                period: self.period,
                user: self.owner
            }.toCell(),
            false,
            null
        );
    }

    receive(msg: ClaimJetton) {
        self.require_active();
        self.requireOwner();
        require(self.jetton_amount > 0, "Zero jetton amount");

        // claim prize gas fee 0.1
        let rest_value: Int = self.msg_value(context(), ton("0.1"));
        require(rest_value >= 0, "Insufficient value");

        self.forward(
            msg.pool_master,
            ClaimJettonInternal {
                amount: self.jetton_amount,
                period: self.period,
                user: self.owner
            }.toCell(),
            true, // bounce this message
            null
        );
        self.jetton_amount = 0;
    }

    bounced(src: bounced<ClaimJettonInternal>) {
        self.jetton_amount = src.amount;
    }

    fun compute_prize_scale(index_payload: Slice): Int {
        let size: Int = index_payload.bits() / PICK_BITS;
        self.picks = self.picks - size;
        require(self.picks >= 0, "Insufficient picks");

        // 12 + 12 + ... + 12
        // \______  _______/
        //        \/
        //       <=85
        let scale: Int = 0;
        let winning_split: WinningSplit = self.winning_split!!;
        repeat(size) {
            let pick_index: Int = index_payload.loadUint(PICK_BITS);
            let pick_used: Bool? = self.used_indexes.get(pick_index);
            require(pick_used == null, "Pick used");
            self.used_indexes.set(pick_index, true);

            let pick_number: Int = self.compute_pick_number(pick_index);
            scale = scale + winning_split.compute_prize_scale(pick_number);
        }
        return scale;
    }

    inline fun compute_pick_number(index: Int): Int {
        let hash: Int = beginCell()
            .storeAddress(myAddress())
            .storeUint(index, PICK_BITS)
            .endCell()
            .hash();
        return hash % TOTAL_PICKS;
    }

    inline fun require_active() {
        require(self.active, "Ticket is inactive");
    }

    inline fun require_inactive() {
        require(!self.active, "Ticket is active");
    }

    inline fun require_pool_account() {
        require(sender() == self._get_pool_account_address(), "Only pool account");
    }

    inline fun _get_pool_account_address(): Address {
        let sinit: StateInit = self._get_pool_account_init();
        return contractAddress(sinit);
    }

    abstract inline fun _get_pool_account_init(): StateInit;
}