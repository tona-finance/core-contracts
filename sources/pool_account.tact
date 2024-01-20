import "./library/twab";
import "./trait/ticket_initializer";
import "./messages";
import "./draw";
import "./ticket";

contract PoolAccount with TicketInitializer {
    override const storageReserve: Int = ton("0.1"); // from base trait

    // from TicketInitializer
    // ---------------------
    owner: Address;

    master: Address;
    staker: Address?;
    jetton_wallet: Address?;
    deposit_cache: map<Int, Int>;
    twab_store: TwabStore;
    share_amount: Int as coins;
    contribute_amount: Int as coins;
    withdraw_amount: Int as coins;
    // ---------------------

    init(owner: Address, master: Address) {
        self.init_account(owner, master);
    }

    receive(msg: TokenExcesses) {
        self.forward(self.owner, null, false, null);
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
        let sinit: StateInit = initOf Draw(self.master, period);
        return contractAddress(sinit);
    }

    override inline fun get_ticket_init(draw: Address): StateInit {
        return initOf Ticket(self.owner, draw);
    }
}