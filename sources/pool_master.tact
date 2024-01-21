import "@stdlib/deploy";
import "./library/twab";
import "./base_pool_master";
import "./messages";
import "./draw";
import "./pool_account";
import "./prize_reserve";

struct PoolMasterData {
    owner: Address;
    staker: Address;
    reserve: Address;
    twab: Twab;
    share_amount: Int as coins;
    contribute_amount: Int as coins;
    spent_amount: Int as coins;
    next_period: Int as uint32;
}

contract PoolMaster with BasePoolMaster, Deployable {
    override const storageReserve: Int = ton("0.1"); // from base trait

    // from BasePoolMaster
    // --------------------
    owner: Address;

    jetton_master: Address;
    jetton_wallet_code: Cell;
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
        jetton_wallet_code: Cell
    ) {
        self.owner = owner;
        self.jetton_master = jetton_master;
        self.jetton_wallet_code = jetton_wallet_code;
        self.jetton_wallet = get_jetton_wallet_address(
            myAddress(),
            jetton_master,
            jetton_wallet_code
        );
        self.twab = new_twab();
        self.share_amount = 0;
        self.contribute_amount = 0;
        self.spent_amount = 0;
        self.next_period = 0;
        self.staker = staker;
    }

    receive(msg: TokenNotification) {
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
            self.jetton_wallet_code
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
            reserve: self._get_prize_reserve_address(),
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

    get fun get_account_address(user: Address): Address {
        return self._get_account_address(user);
    }

    get fun get_draw_address(period: Int): Address {
        return self._get_draw_address(period);
    }
}
