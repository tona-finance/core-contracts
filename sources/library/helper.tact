

trait MsgValueHelper {

    fun msg_value(ctx: Context, gas_consumption: Int): Int {
        let balance_before_msg: Int = myBalance() - ctx.value;
        let storage_fee: Int = self.storageReserve - min(balance_before_msg, self.storageReserve);
        return ctx.value - (storage_fee + gas_consumption);
    }
}
