import "./library/twab";


struct PoolMasterData {
    owner: Address;
    prize_reserve: Address;
    twab: Twab;
    share_amount: Int as coins;
    borrow_amount: Int as coins;
    prize_amount: Int as coins;
    next_period: Int as uint32;
}

struct PoolAccountData {
    owner: Address;
    master: Address;
    prize_reserve: Address;
    share_amount: Int as coins;
}

struct DrawData {
    active: Bool;
    pool_master: Address;
    prize_reserve: Address;
    period: Int as uint32;
    start: Twab?;
    end: Twab?;
    prize_amount: Int as coins;
    avail_prize_amount: Int as coins;
    winning_number: Int as uint32;
    deadline: Int as uint64;
}

struct TicketData {
    active: Bool;
    owner: Address;
    pool_account: Address;
    draw: Address;
    period: Int as uint32;
    picks: Int as uint32;
    debt_amount: Int as coins;
}

struct PrizeReserveData {
    pool_master: Address;
    balance: Int as coins;
}
