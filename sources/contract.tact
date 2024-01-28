import "@stdlib/deploy";
import "./library/twab";
import "./library/timestamp";
import "./library/staker_wallet";
import "./messages";
import "./data";
import "./base_ticket.tact";
import "./base_prize_reserve";
import "./base_pool_master";
import "./prize_distributor";
import "./ticket_initializer";

// === Pool Master Contract ===
contract PoolMaster with BasePoolMaster, Deployable {
    override const storageReserve: Int = ton("0.1"); // from base trait

    // from BasePoolMaster
    // --------------------
    owner: Address;

    jetton_master: Address;
    jetton_wallet_code: Cell;
    jetton_system: Cell; // note: Only in Testnet!
    jetton_wallet: Address;
    twab: Twab;
    share_amount: Int as coins;
    contribute_amount: Int as coins;
    spent_amount: Int as coins;
    next_period: Int as uint32;
    // --------------------

    staker: Address;

    init(
        owner: Address,
        staker: Address,
        jetton_master: Address,
        jetton_wallet_code: Cell,
        jetton_system: Cell  // note: Only in Testnet!
    ) {
        self.owner = owner;
        self.jetton_master = jetton_master;
        self.jetton_wallet_code = jetton_wallet_code;
        self.jetton_system = jetton_system;  // note: Only in Testnet!
        self.jetton_wallet = get_jetton_wallet_address(
            myAddress(),
            jetton_master,
            jetton_wallet_code,
            jetton_system  // note: Only in Testnet!
        );
        self.twab = new_twab();
        self.share_amount = 0;
        self.contribute_amount = 0;
        self.spent_amount = 0;
        self.next_period = 0;
        self.staker = staker;
    }

    receive(msg: JettonNotification) {
        self.require_jetton_wallet();

        self.on_jetton_received_from_account(
            msg.query_id,
            msg.from,
            msg.amount,
            msg.forward_payload
        );
    }

    inline fun _get_prize_reserve_address(): Address {
        let sinit: StateInit = initOf PrizeReserve(
            myAddress(),
            self.staker,
            self.jetton_master,
            self.jetton_wallet_code,
            self.jetton_system // note: Only in Testnet!
        );
        return contractAddress(sinit);
    }

    override inline fun _get_account_init(user: Address): StateInit {
        let reserve: Address = self._get_prize_reserve_address();
        return initOf PoolAccount(user, myAddress(), self.staker, reserve);
    }

    override inline fun _get_draw_init(period: Int): StateInit {
        let reserve: Address = self._get_prize_reserve_address();
        return initOf Draw(myAddress(), reserve, period);
    }

    // === get functions ===

    get fun get_core_data(): PoolMasterData {
        return PoolMasterData {
            owner: self.owner,
            staker: self.staker,
            prize_reserve: self._get_prize_reserve_address(),
            twab: self.twab,
            share_amount: self.share_amount,
            contribute_amount: self.contribute_amount,
            spent_amount: self.spent_amount,
            next_period: self.next_period
        };
    }

    get fun get_account_code(): Cell {
        return self._get_account_init(self.owner).code;
    }

    get fun get_draw_code(period: Int): Cell {
        return self._get_draw_init(period).code;
    }

    get fun get_account_address(user: Address): Address {
        return self._get_account_address(user);
    }

    get fun get_draw_address(period: Int): Address {
        return self._get_draw_address(period);
    }
}

// === Pool Account Contract ===
contract PoolAccount with TicketInitializer, Deployable {
    override const storageReserve: Int = ton("0.1"); // from base trait

    // from TicketInitializer
    // ---------------------
    owner: Address;

    master: Address;
    staker: Address;
    jetton_wallet: Address?;
    twab_store: TwabStore;
    share_amount: Int as coins = 0;
    contribute_amount: Int as coins = 0;
    withdraw_amount: Int as coins = 0;

    lock: Bool = false;
    deposit_amount: Int = 0;
    // ---------------------

    reserve: Address;

    init(owner: Address, master: Address, staker: Address, reserve: Address) {
        self.owner = owner;
        self.master = master;
        self.staker = staker;
        self.twab_store = new_twab_store();
        self.reserve = reserve;
    }

    receive(msg: JettonNotification) {
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

    get fun get_twab_size(): Int {
        return self.twab_store.size;
    }

    get fun binary_search_twab(timestamp: Int): Twab {
        return self.twab_store.binary_search_twab(timestamp);
    }
}

// === Draw Contract ===
contract Draw with PrizeDistributor {
    override const storageReserve: Int = ton("0.1");

    const EXPIRATION_INTERVAL: Int = 60 * 60 * 24 * 14; // 14 days

    // from prize distributor
    // ---------------------
    active: Bool = false;
    pool_master: Address;
    period: Int as uint32;
    jetton_wallet: Address?;
    start: Twab?;
    end: Twab?;

    prize_amount: Int as coins = 0;
    winning_number: Int as uint32 = 0;
    prize_percentage: map<Int, Int>;
    deadline: Int as uint64 = 0;
    avail_prize_amount: Int as coins = 0;
    // ---------------------

    reserve: Address;

    init(pool_master: Address, reserve: Address, period: Int) {
        self.pool_master = pool_master;
        self.period = period;        

        self.prize_percentage = emptyMap();
        self.prize_percentage.set(0, 1);
        self.prize_percentage.set(1, 3);
        self.prize_percentage.set(2, 8);
        self.prize_percentage.set(3, 23);
        self.prize_percentage.set(4, 65);

        self.reserve = reserve;
    }

    receive("send to reserve") {
        self.require_active();
        self.require_over();
        require(self.avail_prize_amount > 0, "No available prize");

        let ctx: Context = context();
        let rest_value: Int = self.msg_value(ctx, ton("0.1"));
        // token transfer value 0.1
        require(rest_value >= 0, "Insufficient value");
        
        let amount: Int = self.avail_prize_amount;
        self.avail_prize_amount = 0;

        self.forward(
            self.jetton_wallet!!,
            JettonTransfer {
                query_id: 0,
                amount: amount,
                destination: self.reserve,
                response_destination: ctx.sender,
                custom_payload: null,
                forward_ton_amount: 0, // no need to notify reserve
                forward_payload: emptyCell()
            }.toCell(),
            false,
            null
        );
    }

    receive(msg: JettonNotification) {
        self.require_jetton_wallet();

        if (msg.from == self.pool_master) {
            self.on_jetton_from_pool_master(msg.amount, msg.forward_payload);
        } else {
            // any jetton received can be prize
            self.avail_prize_amount = self.avail_prize_amount + msg.amount;
        }
    }

    fun on_jetton_from_pool_master(amount: Int, payload: Cell) {
        // twab timestamp + twab amount + pool owner
        let data: Slice = payload.beginParse();
        let twab_timestamp: Int = data.loadTimestamp();
        let twab_amount: Int = data.loadUint(128);
        let owner: Address = data.loadAddress();
        data.endParse();

        let twab: Twab = Twab {
            timestamp: twab_timestamp,
            amount: twab_amount
        };
        let deadline: Int = now() + self.EXPIRATION_INTERVAL;
        self.activate(twab, amount, deadline);

        // refund to pool owner
        self.forward(owner, null, false, null);
    }

    inline fun activate(twab: Twab, prize_amount: Int, deadline: Int) {
        self.activate_beacon(twab);
        self.activate_distributor(prize_amount, deadline);
        self.active = true;
    }

    inline fun require_over() {
        require(now() >= self.deadline, "Draw is not over");
    }

    override inline fun _get_ticket_init(user: Address, pool_account: Address): StateInit {
        return initOf Ticket(user, pool_account, myAddress(), self.period);
    }

    // === get functions ===

    get fun get_core_data(): DrawData {
        return DrawData {
            active: self.active,
            pool_master: self.pool_master,
            prize_reserve: self.reserve,
            jetton_wallet: self.jetton_wallet!!,
            period: self.period,
            start: self.start!!,
            end: self.end!!,
            prize_amount: self.prize_amount,
            winning_number: self.winning_number,
            deadline: self.deadline,
            avail_prize_amount: self.avail_prize_amount
        };
    }

    get fun get_prize_percentage(tier: Int): Int? {
        return self.prize_percentage.get(tier);
    }

    get fun get_ticket_code(user: Address, pool_account: Address): Cell {
        return self._get_ticket_init(user, pool_account).code;
    }

    get fun get_ticket_address(user: Address, pool_account: Address): Address {
        return self._get_ticket_address(user, pool_account);
    }
}

// === Ticket Contract ===
contract Ticket with BaseTicket {
    override const storageReserve: Int = ton("0.1");

    // from BaseTicket
    // ----------------
    owner: Address;

    active: Bool = false;
    pool_account: Address;
    draw: Address;
    period: Int as uint32;
    picks: Int as uint32 = 0;
    used_indexes: map<Int, Bool>;
    debt_amount: Int as coins = 0;
    // ----------------

    init(owner: Address, pool_account: Address, draw: Address, period: Int) {
        self.owner = owner;
        self.pool_account = pool_account;
        self.draw = draw;
        self.period = period;
        self.used_indexes = emptyMap();
    }

    // === get functions ===

    get fun get_core_data(): TicketData {
        return TicketData {
            active: self.active,
            owner: self.owner,
            pool_account: self.pool_account,
            draw: self.draw,
            period: self.period,
            picks: self.picks,
            debt_amount: self.debt_amount
        };
    }

    get fun get_index_status(index: Int): Bool? {
        return self.used_indexes.get(index);
    }
}

// === Prize Reserve Contract ===
contract PrizeReserve with BasePrizeReserve, Deployable {
    override const storageReserve: Int = ton("0.05");

    // from base prize reserve
    // ------------------------
    jetton_wallet: Address;
    // ------------------------

    pool_master: Address;
    staker: Address;

    init(
        pool_master: Address,
        staker: Address,
        jetton_master: Address,
        jetton_wallet_code: Cell,
        jetton_system: Cell  // note: Only in Testnet!
    ) {
        let jetton_wallet: Address = get_jetton_wallet_address(
            myAddress(),
            jetton_master,
            jetton_wallet_code,
            jetton_system  // note: Only in Testnet!
        );
        self.jetton_wallet = jetton_wallet;
        self.pool_master = pool_master;
        self.staker = staker;
    }

    inline fun _get_pool_account_address(user: Address): Address {
        let sinit: StateInit = initOf PoolAccount(user, self.pool_master, self.staker, myAddress());
        return contractAddress(sinit);
    }

    override inline fun _get_ticket_init(user: Address, draw: Address, period: Int): StateInit {
        let pool_account: Address = self._get_pool_account_address(user);
        return initOf Ticket(user, pool_account, draw, period);
    }

    // === get functions ===

    get fun get_core_data(): PrizeReserveData {
        return PrizeReserveData {
            jetton_wallet: self.jetton_wallet,
            pool_master: self.pool_master,
            staker: self.staker
        };
    }
}
