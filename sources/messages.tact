
// === Pool messages ===

message Borrow {
    amount: Int as coins;
}

message Repay {
    amount: Int as coins;
}

message DepositInternal {
    amount: Int as coins;
    user: Address;
}

message WithdrawInternal {
    amount: Int as coins;
    user: Address;
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
    winning_number: Int as uint32;
    start: Int as uint64;
    end: Int as uint64;
    avg_balance: Int as coins;
}

message ClaimPrizeDebt {
    amount: Int as coins;
    reserve: Address;
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
    refund_address: Address;
}

message InitTicket {
    pool_account: Address;
}

message ClaimPrizeInternal {
    user: Address;
    pool_account: Address;
    prize_scale: Int as uint32;
}

// === Ticket messages ===

message InitTicketInternal {
    winning_number: Int as uint32;
    draw_avg_balance: Int as coins;
    user_avg_balance: Int as coins;
}

message PayPrizeDebtInternal {
    user: Address;
    amount: Int as coins;
    period: Int as uint32;
}

message ClaimPrize {
    index_payload: Cell;
}

// === Reserve messages ===

message ClaimPrizeDebtInternal {
    amount: Int as coins;
    user: Address;
}
