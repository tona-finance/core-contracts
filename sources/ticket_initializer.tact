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
        let start: Twab = self.twab_store.binary_search_twab(msg.start);
        let end: Twab = self.twab_store.binary_search_twab(msg.end);
        let avg_balance: Int = average_balance(start, end);
        let sinit: StateInit = self._get_ticket_init(msg.period);
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

    inline fun _get_draw_address(period: Int): Address {
        let sinit: StateInit = self._get_draw_init(period);
        return contractAddress(sinit);
    }

    inline fun _get_ticket_address(period: Int): Address {
        let sinit: StateInit = self._get_ticket_init(period);
        return contractAddress(sinit);
    }

    abstract fun _get_draw_init(period: Int): StateInit;

    abstract fun _get_ticket_init(period: Int): StateInit;
}