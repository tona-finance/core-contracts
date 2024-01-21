import "@stdlib/deploy";
import "./library/staker_wallet";
import "./base_prize_reserve";
import "./pool_account";
import "./ticket";

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

    inline fun get_pool_account_address(user: Address): Address {
        let sinit: StateInit = initOf PoolAccount(user, self.pool_master, self.staker, myAddress());
        return contractAddress(sinit);
    }

    override inline fun get_ticket_address(user: Address, draw: Address, period: Int): Address {
        let pool_account: Address = self.get_pool_account_address(user);
        let sinit: StateInit = initOf Ticket(user, pool_account, draw, period);
        return contractAddress(sinit);
    }
}