import "@stdlib/ownable.tact";
import "./library/twab.tact";
import "./tonstakers/wallet.tact";
import "./messages.tact";

contract DrawBeacon {
    override const storageReserve: Int = ton("0.01");

    const DEPOSIT_GAS_FEE: Int = ton("0.1");
    const STAKER_DEPOSIT_FEE: Int = ton("1.0");
    const TRANSFER_FWD_FEE: Int = ton("0.01");

    pool: Address;
    
    jetton_wallet: Address;

    period: Int;
    start: Twab;
    end: Twab?;
    share_amount: Int;
    prize_amount: Int;
    active: Bool;

    init(
        pool: Address,
        jetton_master: Address,
        jetton_wallet_code: Cell,
        period: Int
    ) {
        self.pool = pool;
        self.jetton_wallet = get_jetton_wallet_address(
            myAddress(),
            jetton_master,
            jetton_wallet_code
        );
        self.period = period;
        self.start = null;
        self.end = null;
        self.share_amount = 0;
        self.prize_amount = 0;
        self.active = false;
    }

    receive(msg: TokenExcesses) {}

    receive(msg: DeployDrawBeacon) {
        require(sender() == self.pool, "invalid sender");

        self.start = Twab {
            timestamp: msg.timestamp,
            amount: msg.amount
        };
    }

    receive(msg: TokenNotification) {
        require(sender() == self.jetton_wallet, "invalid sender");

        // any jetton received should be prize
        self.prize_amount = self.prize_amount + msg.amount;

        if (msg.from == self.pool) {
            self.on_jetton_from_pool(msg.amount, msg.forward_payload);
        }
    }

    fun on_jetton_from_pool(amount: Int, payload: Slice) {
        // share amount + twab timestamp + twab amount
        let share_amount: Int = payload.loadCoins();
        let twab_timestamp: Int = payload.loadTimestamp();
        let twab_amount: Int = payload.loadUint(128);
        payload.endParse();

        self.end = Twab {
            timestamp: twab_timestamp,
            amount: twab_amount
        };
        self.share_amount = share_amount;
        self.active = true;
    }
}