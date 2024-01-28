import "@stdlib/deploy";
import "./jetton_master";
import "./messages";


contract StakingPool with Deployable {
    override const storageReserve: Int = ton("0.05");

    jetton_content: Cell;

    init(jetton_content: Cell) {
        self.jetton_content = jetton_content;
    }

    receive() {
        // receive staking rewards
    }

    receive("init jetton master") {
        let sinit: StateInit = self.jetton_master_init();
        self.forward(contractAddress(sinit), null, false, sinit);
    }

    receive(msg: PoolDeposit) {
        let ctx: Context = context();
        // deposit fee 1.0
        let deposit_amount: Int = ctx.value - ton("1.0");
        require(deposit_amount > 0, "invalid deposit amount");

        let balance_before: Int = max(myBalance() - self.storageReserve - ctx.value, 0);
        nativeReserve(balance_before + deposit_amount, 0);

        send(SendParameters {
            bounce: false,
            to: self.jetton_master_address(),
            value: 0,
            mode: SendRemainingBalance,
            body: JettonMint {
                query_id: msg.query_id,
                receiver: ctx.sender,
                total_balance: balance_before,
                deposit_amount: deposit_amount
            }.toCell()
        });
    }

    receive(msg: PoolWithdraw) {
        let ctx: Context = context();
        require(ctx.sender == self.jetton_master_address(), "only jetton master");

        let balance_before: Int = myBalance() - self.storageReserve - ctx.value;
        require(balance_before > 0, "insufficient balance");
        let withdraw_amount: Int = balance_before * msg.jetton_amount / msg.total_supply;
        nativeReserve(balance_before + self.storageReserve - withdraw_amount, 0);

        send(SendParameters {
            bounce: false,
            to: msg.from_address,
            value: withdraw_amount,
            mode: SendRemainingBalance,
            body: PoolWithdrawal {
                query_id: msg.query_id
            }.toCell()
        });
    }

    inline fun jetton_master_init(): StateInit {
        return initOf JettonMaster(myAddress(), self.jetton_content);
    }

    inline fun jetton_master_address(): Address {
        let sinit: StateInit = self.jetton_master_init();
        return contractAddress(sinit);
    }

    // === Get methods ===
    get fun jetton_master(): Address {
        return self.jetton_master_address();
    }
}