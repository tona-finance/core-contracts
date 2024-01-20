import "@stdlib/deploy";
import "./trait/prize_reserve";
import "./staker/wallet";
import "./messages";
import "./ticket";

contract PrizeReserve with BasePrizeReserve, Deployable {
    override const storageReserve: Int = ton("0.05");

    // from base prize reserve
    // ------------------------
    jetton_wallet: Address;
    // ------------------------

    pool: Address;

    init(
        pool: Address,
        jetton_master: Address,
        jetton_wallet_code: Cell
    ) {
        let jetton_wallet: Address = get_jetton_wallet_address(
            myAddress(),
            jetton_master,
            jetton_wallet_code
        );
        self.init_prize_reserve(jetton_wallet);
        self.pool = pool;
    }

    override inline fun get_ticket_address(user: Address, draw: Address): Address {
        let sinit: StateInit = initOf Ticket(user, draw);
        return contractAddress(sinit);
    }
}