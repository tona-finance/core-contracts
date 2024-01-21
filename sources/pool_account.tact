import "./library/twab";
import "./messages";
import "./draw";
import "./ticket";
import "./ticket_initializer";


contract PoolAccount with TicketInitializer {
    override const storageReserve: Int = ton("0.1"); // from base trait

    // from TicketInitializer
    // ---------------------
    owner: Address;

    master: Address;
    staker: Address;
    jetton_wallet: Address?;
    deposit_cache: map<Int, Int>;
    twab_store: TwabStore;
    share_amount: Int as coins = 0;
    contribute_amount: Int as coins = 0;
    withdraw_amount: Int as coins = 0;
    // ---------------------

    reserve: Address;

    init(owner: Address, master: Address, staker: Address, reserve: Address) {
        self.owner = owner;
        self.master = master;
        self.staker = staker;
        self.deposit_cache = emptyMap();
        self.twab_store = newTwabStore();
        self.reserve = reserve;
    }

    receive(msg: TokenNotification) {
        self.require_jetton_wallet();

        if (msg.from == newAddress(0, 0)) {
            // jetton minted
            self.on_jetton_minted(msg.query_id, msg.amount);
        } else if (msg.from == self.master) {
            // jetton transfered from master
            self.on_jetton_received_from_master(msg.query_id, msg.amount);
        } else {
            // TODO: should handle unexpected jetton?
        }
    }

    override inline fun get_draw_address(period: Int): Address {
        let sinit: StateInit = initOf Draw(self.master, self.reserve, period);
        return contractAddress(sinit);
    }

    override inline fun get_ticket_init(draw: Address, period: Int): StateInit {
        return initOf Ticket(self.owner, myAddress(), draw, period);
    }
}