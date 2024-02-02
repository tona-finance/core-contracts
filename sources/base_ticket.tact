import "@stdlib/ownable";
import "./library/helper";
import "./library/prize_calculator";
import "./messages";

trait BaseTicket with Ownable, MsgValueHelper {

    owner: Address;

    active: Bool;
    pool_account: Address;
    draw: Address;
    period: Int;
    winning_split: WinningSplit;
    picks: Int;
    used_indexes: map<Int, Bool>;

    receive(msg: InitTicketInternal) {
        self.require_inactive();
        self.require_pool_account();

        self.active = true;
        self.winning_split.apply(msg.winning_number);
        self.picks = TOTAL_PICKS * msg.user_avg_balance / msg.draw_avg_balance;

        // refund gas
        self.forward(self.owner, null, false, null);
    }

    receive(msg: ClaimPrize) {
        self.require_active();
        self.requireOwner();

        // claim prize gas fee 0.8
        let rest_value: Int = self.msg_value(context(), ton("0.8"));
        require(rest_value >= 0, "Insufficient value");

        // Every cell has up to 4 references to other cells, but cause of the 
        // max gas limit, we set it to 2 references.
        let prize_scale: Int = 0;
        repeat(2) {
            let index_payload: Slice = msg.index_payload.loadRef().beginParse();
            prize_scale = prize_scale + self.compute_prize_scale(index_payload);
        }
    
        self.forward(
            self.draw,
            ClaimPrizeInternal {
                user: self.owner,
                pool_account: self.pool_account,
                prize_scale: prize_scale
            }.toCell(),
            false,
            null
        );
    }

    fun compute_prize_scale(index_payload: Slice): Int {
        let size: Int = index_payload.bits() / PICK_BITS;
        self.picks = self.picks - size;
        require(self.picks >= 0, "Insufficient picks");

        // 16 + 16 + ... + 16
        // \______  _______/
        //        \/
        //       <=63
        let scale: Int = 0;
        repeat(size) {
            let pick_index: Int = index_payload.loadUint(PICK_BITS);
            let pick_used: Bool? = self.used_indexes.get(pick_index);
            require(pick_used == null, "Pick used");
            self.used_indexes.set(pick_index, true);

            let pick_number: Int = self.compute_pick_number(pick_index);
            scale = scale + self.winning_split.compute_prize_scale(pick_number);
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