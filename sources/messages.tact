

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

message Deposit {
    query_id: Int as uint64;
}

message Withdraw {
    amount: Int as coins;
}

message WithdrawNotification {
    query_id: Int as uint64;
}

message WithdrawReceipt {
    timestamp: Int as uint64;
    owner: Address;
    share_amount: Int as coins;
}

// === Draw Beacon messages ===

message DeployDrawBeacon {
    timestamp: Int as uint64;
    amount: Int;
}