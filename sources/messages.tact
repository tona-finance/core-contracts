

// === ton staker messages ===

message(0x47d54391) DepositInStaker {
    query_id: Int as uint64;
}

message(0x0a77535c) StakerWithdrawal {
    query_id: Int as uint64;
}

// === Jetton wallet messages ===

message(0x7362d09c) TokenNotification {
    query_id: Int as uint64;
    amount: Int as coins;
    from: Address;
    forward_payload: Slice as remaining;
}

message(0xd53276db) TokenExcesses {
    query_id: Int as uint64;
}

message(0xf8a7ea5) TokenTransfer {
    query_id: Int as uint64;
    amount: Int as coins;
    destination: Address;
    response_destination: Address;
    custom_payload: Cell?;
    forward_ton_amount: Int as coins;
    forward_payload: Slice as remaining;
}

message(0x595f07bc) TokenBurn {
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
    user: Address;
    withdraw_amount: Int as coins;
    acc_contribute_amount: Int as coins;
    acc_withdraw_amount: Int as coins;
}

message WithdrawFinishInternal {
    user: Address;
    timestamp: Int as uint64;
    amount: Int as coins;
}

// === pool account messages ===

message InitPoolAccountInternal {
    staker: Address;
    jetton_wallet: Address;
}

message Deposit {
    query_id: Int as uint64;
}

message Withdraw {
    amount: Int as coins;
}

// === Draw messages ===

message InitDraw {
    deployer: Address;
    reserve: Address;
    jetton_wallet: Address;
    twab_timestamp: Int as uint64;
    twab_amount: Int as uint128;
}

message ClaimPrizeInternal {
    query_id: Int as uint64;
    user: Address;
    pick_payload: Slice as remaining;
}

// === Reserve messages ===

message RepayToOwner {
    query_id: Int as coins;
    amount: Int as coins;
}

message ClaimPrizeDebtInternal {
    query_id: Int as uint64;
    period: Int as uint32;
    user: Address;
    amount: Int as coins;
}

// === Ticket messages ===

message InitTicket {
    beacon_avg_balance: Int as coins;
    user_avg_balance: Int as coins;
}

message PayPrizeDebtInternal {
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
