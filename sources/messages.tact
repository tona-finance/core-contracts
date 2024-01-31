
// === Pool messages ===

message DepositInternal {
    amount: Int as coins;
    user: Address;
}

message WithdrawInternal {
    amount: Int as coins;
    user: Address;
}

message Borrow {
    amount: Int as coins;
}

// === pool account messages ===

message Withdraw {
    amount: Int as coins;
}

message DepositFinish {
    timestamp: Int as uint64;
    amount: Int as coins;
}

message WithdrawFinish {
    timestamp: Int as uint64;
    amount: Int as coins;
}

message PrepareInitTicket {
    period: Int as uint32;
    start: Int as uint64;
    end: Int as uint64;
    avg_balance: Int as coins;
}

// === Draw messages ===

message InitDraw {
    twab_timestamp: Int as uint64;
    twab_amount: Int as uint128;
    refund_address: Address;
}

message OpenDraw {
    twab_timestamp: Int as uint64;
    twab_amount: Int as uint128;
    prize_amount: Int as coins;
    refund_address: Address;
}

message InitTicket {
    pool_account: Address;
}

message ClaimPrizeInternal {
    user: Address;
    pool_account: Address;
    pick_payload: Slice as remaining;
}

// === Ticket messages ===

message InitTicketInternal {
    draw_avg_balance: Int as coins;
    user_avg_balance: Int as coins;
}

message PayPrizeDebtInternal {
    user: Address;
    amount: Int as coins;
}

message ClaimPrize {
    index_payload: Slice as remaining;
}

message ClaimPrizeDebt {
    amount: Int as coins;
    reserve: Address;
}

// === Reserve messages ===

message ClaimPrizeDebtInternal {
    amount: Int as coins;
    user: Address;
    draw: Address;
    period: Int as uint32;
}
