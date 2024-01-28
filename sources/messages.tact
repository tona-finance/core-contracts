

// === Tonstaker messages ===

message(0x47d54391) DepositInStaker {
    query_id: Int as uint64;
}

message(0x0a77535c) StakerWithdrawal {
    query_id: Int as uint64;
}

// === Jetton messages ===

message(0x7362d09c) JettonNotification {
    query_id: Int as uint64;
    amount: Int as coins;
    from: Address;
    forward_payload: Slice as remaining;
}

message(0xd53276db) JettonExcesses {
    query_id: Int as uint64;
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

message(0x595f07bc) JettonBurn {
    query_id: Int as uint64;
    amount: Int as coins;
    response_destination: Address;
    custom_payload: Cell?;
}

// === Pool messages ===

message SetPrize {
    amount: Int as coins;
}

message WithdrawInternal {
    query_id: Int as uint64;
    withdraw_amount: Int as coins;
    acc_contribute_amount: Int as coins;
    acc_withdraw_amount: Int as coins;
    user: Address;
}

message WithdrawFinishInternal {
    query_id: Int as uint64;
    timestamp: Int as uint64;
    amount: Int as coins;
    user: Address;
}

message DepositNotify {
    query_id: Int as uint64;
    timestamp: Int as uint64;
    share_amount: Int as coins;
    contribute_amount: Int as coins;
}

message WithdrawNotify {
    query_id: Int as uint64;
    timestamp: Int as uint64;
    share_amount: Int as coins;
}

// === pool account messages ===

message InitPoolAccountInternal {
    jetton_wallet: Address;
}

message InitTicketInternal1 {
    period: Int as uint32;
    start: Int as uint64;
    end: Int as uint64;
    avg_balance: Int as coins;
}

message Deposit {
    query_id: Int as uint64;
}

message Withdraw {
    query_id: Int as uint64;
    amount: Int as coins;
}

// === Draw messages ===

message InitDrawInternal {
    deployer: Address;
    jetton_wallet: Address;
    twab_timestamp: Int as uint64;
    twab_amount: Int as uint128;
}

message InitTicket {
    pool_account: Address;
}

message ClaimPrizeInternal {
    query_id: Int as uint64;
    user: Address;
    pool_account: Address;
    pick_payload: Slice as remaining;
}

// === Ticket messages ===

message InitTicketInternal2 {
    draw_avg_balance: Int as coins;
    user_avg_balance: Int as coins;
}

message PayPrizeDebtInternal {
    user: Address;
    amount: Int as coins;
}

message ClaimPrize {
    query_id: Int as uint64;
    index_payload: Slice as remaining;
}

message ClaimPrizeDebt {
    query_id: Int as uint64;
    amount: Int as coins;
    reserve: Address;
}

// === Reserve messages ===

message ClaimPrizeDebtInternal {
    query_id: Int as uint64;
    user: Address;
    draw: Address;
    period: Int as uint32;
    amount: Int as coins;
}
