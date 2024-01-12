import "../library/timestamp.tact";

inline fun pack_tonstaker_jetton_wallet_data(
    balance: Int,
    owner: Address,
    master: Address,
    code: Cell,
    locked: Int,
    locked_expiration: Int
): Cell {
    return beginCell()
        .storeCoins(balance)
        .storeAddress(owner)
        .storeAddress(master)
        .storeRef(code)
        .storeCoins(locked)
        .storeTimestamp(locked_expiration)
        .endCell();
}

fun get_tonstaker_jetton_wallet_state_init(
    owner: Address,
    master: Address,
    code: Cell
): StateInit {
    let data: Cell = pack_tonstaker_jetton_wallet_data(0, owner, master, code, 0, 0);
    return StateInit {
        code: code,
        data: data
    };
}