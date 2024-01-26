import "./messages";


trait BaseStakingPool {

    const DEPOSIT_FEE: Int = ton("1.0");

    jetton_master: Address;
    
    receive(msg: PoolDeposit) {
        let ctx: Context = self.context();
        
        let balance_before: Int = myBalance() - self.storageReserve - ctx.value;
        require(balance_before > 0, "insufficient balance");
        
        let deposit_amount: Int = ctx.value - self.DEPOSIT_FEE;
        require(deposit_amount > 0, "invalid deposit amount");
        
        nativeReserve(balance_before + deposit_amount, 0);
        send(SendParameters {
            bounce: false,
            to: self.jetton_master,
            value: rest_value,
            mode: SendRemainingBalance,
            body: JettonMint {
                query_id: msg.query_id,
                receiver: ctx.sender,
                total_balance: balance_before,
                deposit_amount: deposit_amount
            }.toCell()
        });



        // let balance_before_msg: Int = myBalance() - ctx.value;
        // let storage_fee: Int = self.storageReserve - min(balance_before_msg, self.storageReserve);
        // let rest_value: Int = self.DEPOSIT_FEE - storage_fee - ton("0.01");
        // require(rest_value > 0, "insufficient value");

        // let balance: Int = myBalance() - self.storageReserve;
    }

    fun msg_value(ctx: Context, gas_consumption: Int): Int {
        let balance_before_msg: Int = myBalance() - ctx.value;
        let storage_fee: Int = self.storageReserve - min(balance_before_msg, self.storageReserve);
        return ctx.value - (storage_fee + gas_consumption);
    }
}