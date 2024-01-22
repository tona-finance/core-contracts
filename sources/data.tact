import "./library/twab";


struct PoolMasterData {
    owner: Address;
    staker: Address;
    prize_reserve: Address;
    twab: Twab;
    share_amount: Int as coins;
    contribute_amount: Int as coins;
    spent_amount: Int as coins;
    next_period: Int as uint32;
}

struct PoolAccountData {
    owner: Address;
    master: Address;
    staker: Address;
    reserve: Address;
    jetton_wallet: Address;
    share_amount: Int as coins;
    contribute_amount: Int as coins;
    withdraw_amount: Int as coins;
}

struct DrawData {
    active: Bool;
    pool_master: Address;
    prize_reserve: Address;
    jetton_wallet: Address;
    period: Int as uint32;
    start: Twab;
    end: Twab;
    prize_amount: Int as coins;
    winning_number: Int as uint32;
    deadline: Int as uint64;
    avail_prize_amount: Int as coins;
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
    jetton_wallet: Address;
    pool_master: Address;
    staker: Address;
}
