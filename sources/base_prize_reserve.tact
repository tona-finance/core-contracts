import "./messages";


trait BasePrizeReserve {

    receive() {}

    receive(msg: ClaimPrizeDebtInternal) {
        self.require_pool_account(msg.user);

        let fee: Int = context().readForwardFee() + ton("0.01");
        nativeReserve(myBalance() - self.storageReserve - fee - msg.amount, 0);
        send(SendParameters {
            bounce: false,
            to: msg.user,
            value: msg.amount,
            mode: SendRemainingBalance + SendIgnoreErrors
        });
    }

    inline fun require_pool_account(user: Address) {
        require(sender() == self._get_pool_account_address(user), "Only pool account");
    }

    inline fun _get_pool_account_address(user: Address): Address {
        let sinit: StateInit = self._get_pool_account_init(user);
        return contractAddress(sinit);
    }

    abstract inline fun _get_pool_account_init(user: Address): StateInit;
}
