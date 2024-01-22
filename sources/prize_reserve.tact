import "@stdlib/deploy";
import "./library/staker_wallet";
import "./base_prize_reserve";
import "./pool_account";
import "./ticket";

struct PrizeReserveData {
    jetton_wallet: Address;
    pool_master: Address;
    staker: Address;
}

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
        jetton_wallet_code: Cell
    ) {
        let jetton_wallet: Address = get_jetton_wallet_address(
            myAddress(),
            jetton_master,
            jetton_wallet_code
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
