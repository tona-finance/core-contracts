import "./draw/reserve";
import "./tonstakers/wallet.tact";

contract PrizeReserve with BasePrizeReserve {
    override const storageReserve: Int = ton("0.05");

    // from base prize reserve
    // ------------------------
    owner: Address; // from ownable

    jetton_wallet: Address;
    debt_amount: Int;
    // ------------------------

    pool: Address;

    init(
        owner: Address,
        pool: Address,
        jetton_master: Address,
        jetton_wallet_code: Cell
    ) {
        let jetton_wallet: Address = get_jetton_wallet_address(
            myAddress(),
            jetton_master,
            jetton_wallet_code
        );
        self.init_prize_reserve(owner, jetton_wallet);
        self.pool = pool;
    }

    override inline fun get_ticket_address(period: Int, user: Address): Address {
        
    }
}