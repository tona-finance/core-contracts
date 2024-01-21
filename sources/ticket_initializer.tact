import "./library/twab";
import "./messages";
import "./base_pool_account";


trait TicketInitializer with BasePoolAccount {

    // from BasePoolAccount
    // ---------------------
    owner: Address;

    master: Address;
    staker: Address;
    jetton_wallet: Address?;
    deposit_cache: map<Int, Int>;
    twab_store: TwabStore;
    share_amount: Int;
    contribute_amount: Int;
    withdraw_amount: Int;
    // ---------------------

    receive(msg: InitTicketInternal1) {
        self.require_draw(msg.period);

        let start: Twab = self.twab_store.binarySearchTwab(msg.start);
        let end: Twab = self.twab_store.binarySearchTwab(msg.end);
        let avg_balance: Int = averageBalance(start, end);
        let sinit: StateInit = self.get_ticket_init(sender(), msg.period);
        let ticket: Address = contractAddress(sinit);
        // deploy and init ticket
        self.forward(
            ticket,
            InitTicketInternal2 {
                draw_avg_balance: msg.avg_balance,
                user_avg_balance: avg_balance
            }.toCell(),
            false,
            sinit
        );
    }

    inline fun require_draw(period: Int) {
        require(sender() == self.get_draw_address(period), "Invalid sender");
    }

    abstract fun get_draw_address(period: Int): Address;

    abstract fun get_ticket_init(draw: Address, period: Int): StateInit;
}