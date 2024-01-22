import "@stdlib/deploy";
import "./library/twab";
import "./messages";
import "./draw";
import "./ticket";
import "./ticket_initializer";

struct PoolAccountData {
    owner: Address;
    master: Address;
    staker: Address;
    reserve: Address;
    jetton_wallet: Address;
    share_amount: Int as coins;
    contribute_amount: Int as coins;
    withdraw_amount: Int as coins;
}

contract PoolAccount with TicketInitializer, Deployable {
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
        self.twab_store = new_twab_store();
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

    override inline fun _get_draw_init(period: Int): StateInit {
        return initOf Draw(self.master, self.reserve, period);
    }

    override inline fun _get_ticket_init(period: Int): StateInit {
        let draw: Address = self._get_draw_address(period);
        return initOf Ticket(self.owner, myAddress(), draw, period);
    }

    // === get functions ===

    get fun get_core_data(): PoolAccountData {
        return PoolAccountData {
            owner: self.owner,
            master: self.master,
            staker: self.staker,
            reserve: self.reserve,
            jetton_wallet: self.jetton_wallet!!,
            share_amount: self.share_amount,
            contribute_amount: self.contribute_amount,
            withdraw_amount: self.withdraw_amount
        };
    }

    get fun get_draw_code(period: Int): Cell {
        return self._get_draw_init(period).code;
    }

    get fun get_ticket_code(period: Int): Cell {
        return self._get_ticket_init(period).code;
    }

    get fun get_draw_address(period: Int): Address {
        return self._get_draw_address(period);
    }

    get fun get_ticket_address(period: Int): Address {
        return self._get_ticket_address(period);
    }

    get fun get_deposit_cache(query_id: Int): Int? {
        return self.deposit_cache.get(query_id);
    }

    get fun get_twab_size(): Int {
        return self.twab_store.size;
    }

    get fun binary_search_twab(timestamp: Int): Twab {
        return self.twab_store.binary_search_twab(timestamp);
    }
}