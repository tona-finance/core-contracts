
@name(store_dict)
extends native storeDict(self: Builder, cell: Cell): Builder;

inline fun pack_jetton_wallet_data(
    balance: Int,
    owner: Address,
    master: Address,
    code: Cell
): Cell {
    return beginCell()
        .storeCoins(balance)
        .storeAddress(owner)
        .storeAddress(master)
        .storeRef(code)
        .endCell();
}

inline fun get_jetton_wallet_state_init(
    owner: Address,
    master: Address,
    code: Cell
): StateInit {
    return StateInit {
        code: code,
        data: pack_jetton_wallet_data(0, owner, master, code)
    };
}

inline fun compute_jetton_wallet_address(sinit: StateInit): Address {
    let hash: Int = beginCell()
        .storeUint(0, 2)
        .storeDict(sinit.code)
        .storeDict(sinit.data)
        .storeUint(0, 1)
        .endCell()
        .hash();
    return newAddress(0, hash);
}