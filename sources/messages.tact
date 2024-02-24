
// === Pool master messages ===

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

message ClaimPrizeInternal {
    amount: Int as coins;
    period: Int as uint32;
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
    start: Int as uint64;
    end: Int as uint64;
    winning_number: Int as uint16;
    prize_amount: Int as coins;
    jetton_amount: Int as coins;
    avg_balance: Int as coins;
    ticket_code: Cell;
    ticket_data: Cell;
}

message PayPrizeDebtInternal {
    amount: Int as coins;
    user: Address;
}

message ClaimPrizeDebt {
    amount: Int as coins;
    // prize_reserve: Address;
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
    jetton_amount: Int as coins;
    refund_address: Address;
}

message InitTicket {
    pool_account: Address;
    code: Cell;
    data: Cell;
}

message ClaimJettonInternal {
    amount: Int as coins;
    period: Int as uint32;
    user: Address;
}

// === Ticket messages ===

message InitTicketInternal {
    winning_number: Int as uint16;
    total_prize_amount: Int as coins;
    picks: Int as uint16;
    jetton_amount: Int as coins;
}

message ClaimPrize {
    index_payload: Cell;
    pool_master: Address;
}

message ClaimJetton {
    pool_master: Address;
}

// === Reserve messages ===

message ClaimPrizeDebtInternal {
    amount: Int as coins;
    user: Address;
}

// === Jetton messages ===

message(0x7362d09c) JettonNotification {
    query_id: Int as uint64;
    amount: Int as coins;
    from: Address;
    forward_payload: Slice as remaining;
}

message(0xf8a7ea5) JettonTransfer {
    query_id: Int as uint64;
    amount: Int as coins;
    destination: Address;
    response_destination: Address;
    custom_payload: Cell?;
    forward_ton_amount: Int as coins;
    forward_payload: Slice as remaining;
}
