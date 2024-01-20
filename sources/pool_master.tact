import "@stdlib/deploy";
import "./library/twab";
import "./trait/pool_master";
import "./messages";
import "./draw";
import "./prize_reserve";
import "./account";

contract PoolMaster with BasePoolMaster, Deployable {
    override const storageReserve: Int = ton("0.1"); // from base trait

    // from BasePoolMaster
    // --------------------
    owner: Address;

    staker: Address;
    jetton_master: Address;
    jetton_wallet_code: Cell;
    jetton_wallet: Address;
    twab: Twab;
    share_amount: Int as coins;
    contribute_amount: Int as coins;
    spent_amount: Int as coins;
    next_period: Int as uint32;
    // --------------------

    init(
        owner: Address,
        staker: Address,
        jetton_master: Address,
        jetton_wallet_code: Cell
    ) {
        self.init_master(owner, staker, jetton_master, jetton_wallet_code);
    }

    receive(msg: TokenNotification) {
        self.require_jetton_wallet();

        self.on_jetton_received_from_account(msg.query_id, msg.amount, msg.forward_payload);
    }

    override inline fun get_reserve_address(): Address {
        let sinit: StateInit = initOf PrizeReserve(
            myAddress(),
            self.jetton_master,
            self.jetton_wallet_code
        );
        return contractAddress(sinit);
    }

    override inline fun get_account_init(user: Address): StateInit {
        return initOf PoolAccount(user, myAddress());
    }

    override inline fun get_draw_init(period: Int): StateInit {
        return initOf Draw(myAddress(), period);
    }
}
