import "../library/timestamp.tact";

fun get_staker_jetton_wallet_init(
    owner: Address,
    master: Address,
    code: Cell
): StateInit {
    let data: Cell = beginCell()
        .storeCoins(0) // balance
        .storeAddress(owner)
        .storeAddress(master)
        .storeRef(code)
        .storeCoins(0) // locked
        .storeTimestamp(0) // locked_expiration
        .endCell();
    return StateInit {
        code: code,
        data: data
    };
}

fun get_jetton_wallet_address(
    owner: Address,
    master: Address,
    code: Cell
): Address {
    let sinit: StateInit = get_staker_jetton_wallet_init(owner, master, code);
    return contractAddress(sinit);
}
