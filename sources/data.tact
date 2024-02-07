import "./library/twab";


struct PoolMasterData {
    owner: Address;
    jetton_master: Address;
    jetton_wallet_code: Cell;
    twab: Twab;
    next_period: Int as uint32;
    share_amount: Int as coins;
    borrow_amount: Int as coins;
    prize_amount: Int as coins;
    avail_prize_amount: Int as coins;
    jetton_amount: Int as coins;
}

struct PoolAccountData {
    owner: Address;
    master: Address;
    share_amount: Int as coins;
    debt_amount: Int as coins;
}

struct DrawData {
    active: Bool;
    pool_master: Address;
    period: Int as uint32;
    start: Twab?;
    end: Twab?;
    prize_amount: Int as coins;
    jetton_amount: Int as coins;
    winning_number: Int as uint16;
}

struct TicketData {
    active: Bool;
    owner: Address;
    pool_master: Address;
    period: Int as uint32;
    picks: Int as uint16;
    jetton_amount: Int as coins;
}

struct PrizeReserveData {
    pool_master: Address;
    balance: Int as coins;
}
