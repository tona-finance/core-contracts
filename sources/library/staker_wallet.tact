import "./timestamp.tact";

// note: Only in testnet!
fun get_jetton_wallet_init(
    owner: Address,
    master: Address,
    code: Cell,
    system: Cell
): StateInit {
    let data: Cell = beginCell()
        .storeRef(system)
        .storeUint(0, 1)
        .storeAddress(owner)
        .storeAddress(master)
        .endCell();
    return StateInit {
        code: code,
        data: data
    };
}

// note: Only in Testnet!
fun get_jetton_wallet_address(
    owner: Address,
    master: Address,
    code: Cell,
    system: Cell
): Address {
    let sinit: StateInit = get_jetton_wallet_init(owner, master, code, system);
    return contractAddress(sinit);
}
