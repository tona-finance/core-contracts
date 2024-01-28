
// **************** Jetton Messages **************** //

message(0x0f8a7ea5) JettonTransfer {
    query_id: Int as uint64;                // arbitrary request number
    amount: Int as coins;                   // amount of jettons to transfer
    destination: Address;                   // address of the new owner of the jettons
    response_destination: Address;          // address where to send a response with confirmation of a successful transfer and the rest of the incoming message Toncoins.
    custom_payload: Cell?;                  // optional custom payload
    forward_ton_amount: Int as coins;       // the amount of nanotons to be sent to the destination address.
    forward_payload: Cell;    // optional custom data that should be sent to the destination address.
}

message(0x7362d09c) JettonTransferNotification {
    query_id: Int as uint64;                // arbitrary request number
    amount: Int as coins;                   // amount of jettons to transfer
    sender: Address;                        // address of the sender of the jettons
    forward_payload: Cell;    // optional custom payload
}

message(0x595f07bc) JettonBurn {
    query_id: Int as uint64;        // arbitrary request number
    amount: Int as coins;           // amount of jettons to burn
    response_destination: Address;  // address where to send a response with confirmation of a successful burn and the rest of the incoming message coins.
    custom_payload: Cell?;          // optional custom payload
}

message(0xd53276db) JettonExcesses {
    query_id: Int as uint64;        // arbitrary request number
}

message(0x178d4519) JettonInternalTransfer {
    query_id: Int as uint64;                // arbitrary request number
    amount: Int as coins;                   // amount of jettons to transfer
    from: Address;                          // address of the sender of the jettons 
    response_address: Address;              // address where to send a response with confirmation of a successful transfer and the rest of the incoming message coins.
    forward_ton_amount: Int as coins;       // the amount of nanotons to be sent to the destination address.
    forward_payload: Cell;    // optional custom data that should be sent to the destination address.
}

message(0x7bdd97de) JettonBurnNotification {
    query_id: Int as uint64;          // arbitrary request number
    amount: Int as coins;             // amount of jettons to burn
    sender: Address;                  // address of the sender of the jettons
    response_destination: Address;    // address where to send a response with confirmation of a successful burn and the rest of the incoming message coins.
}

// **************** Pool Messages **************** //

message(0x1674b0a0) JettonMint {
    query_id: Int as uint64;
    total_balance: Int as coins;
    deposit_amount: Int as coins;
    receiver: Address;
}

message(0x47d54391) PoolDeposit {
    query_id: Int as uint64;
}

message(0x319b0cdc) PoolWithdraw {
    query_id: Int as uint64;
    total_supply: Int as coins;
    jetton_amount: Int as coins;
    from_address: Address;
    response_address: Address;
}

message(0x0a77535c) PoolWithdrawal {
    query_id: Int as uint64;
}
