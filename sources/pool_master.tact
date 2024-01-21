import "@stdlib/deploy";
import "./library/twab";
import "./base_pool_master";
import "./messages";
import "./draw";
import "./pool_account";
import "./prize_reserve";

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
    next_period: Int as coins;
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
        self.twab = newTwab();
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

    inline fun get_prize_reserve_address(): Address {
        let sinit: StateInit = initOf PrizeReserve(
            myAddress(),
            self.staker,
            self.jetton_master,
            self.jetton_wallet_code
        );
        return contractAddress(sinit);
    }

    override inline fun get_account_init(user: Address): StateInit {
        let reserve: Address = self.get_prize_reserve_address();
        return initOf PoolAccount(user, myAddress(), self.staker, reserve);
    }

    override inline fun get_draw_init(period: Int): StateInit {
        let reserve: Address = self.get_prize_reserve_address();
        return initOf Draw(myAddress(), reserve, period);
    }
}
