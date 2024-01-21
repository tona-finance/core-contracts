# TACT Compilation Report
Contract: PoolAccount
BOC Size: 4815 bytes

# Types
Total Types: 36

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## Deploy
TLB: `deploy#946a98b6 queryId:uint64 = Deploy`
Signature: `Deploy{queryId:uint64}`

## DeployOk
TLB: `deploy_ok#aff90f57 queryId:uint64 = DeployOk`
Signature: `DeployOk{queryId:uint64}`

## FactoryDeploy
TLB: `factory_deploy#6d0ff13b queryId:uint64 cashback:address = FactoryDeploy`
Signature: `FactoryDeploy{queryId:uint64,cashback:address}`

## PoolAccountData
TLB: `_ owner:address master:address staker:address reserve:address jetton_wallet:address share_amount:coins contribute_amount:coins withdraw_amount:coins = PoolAccountData`
Signature: `PoolAccountData{owner:address,master:address,staker:address,reserve:address,jetton_wallet:address,share_amount:coins,contribute_amount:coins,withdraw_amount:coins}`

## TicketData
TLB: `_ active:bool owner:address pool_account:address draw:address period:uint32 picks:uint32 debt_amount:coins = TicketData`
Signature: `TicketData{active:bool,owner:address,pool_account:address,draw:address,period:uint32,picks:uint32,debt_amount:coins}`

## DepositInStaker
TLB: `deposit_in_staker#47d54391 query_id:uint64 = DepositInStaker`
Signature: `DepositInStaker{query_id:uint64}`

## StakerWithdrawal
TLB: `staker_withdrawal#0a77535c query_id:uint64 = StakerWithdrawal`
Signature: `StakerWithdrawal{query_id:uint64}`

## TokenNotification
TLB: `token_notification#7362d09c query_id:uint64 amount:coins from:address forward_payload:remainder<slice> = TokenNotification`
Signature: `TokenNotification{query_id:uint64,amount:coins,from:address,forward_payload:remainder<slice>}`

## TokenExcesses
TLB: `token_excesses#d53276db query_id:uint64 = TokenExcesses`
Signature: `TokenExcesses{query_id:uint64}`

## TokenTransfer
TLB: `token_transfer#0f8a7ea5 query_id:uint64 amount:coins destination:address response_destination:address custom_payload:Maybe ^cell forward_ton_amount:coins forward_payload:remainder<slice> = TokenTransfer`
Signature: `TokenTransfer{query_id:uint64,amount:coins,destination:address,response_destination:address,custom_payload:Maybe ^cell,forward_ton_amount:coins,forward_payload:remainder<slice>}`

## TokenBurn
TLB: `token_burn#595f07bc query_id:uint64 amount:coins response_destination:address custom_payload:Maybe ^cell = TokenBurn`
Signature: `TokenBurn{query_id:uint64,amount:coins,response_destination:address,custom_payload:Maybe ^cell}`

## SetPrize
TLB: `set_prize#d3643815 amount:coins = SetPrize`
Signature: `SetPrize{amount:coins}`

## WithdrawInternal
TLB: `withdraw_internal#94ec1014 query_id:uint64 user:address withdraw_amount:coins acc_contribute_amount:coins acc_withdraw_amount:coins = WithdrawInternal`
Signature: `WithdrawInternal{query_id:uint64,user:address,withdraw_amount:coins,acc_contribute_amount:coins,acc_withdraw_amount:coins}`

## WithdrawFinishInternal
TLB: `withdraw_finish_internal#b0cd96ea query_id:uint64 user:address timestamp:uint64 amount:coins = WithdrawFinishInternal`
Signature: `WithdrawFinishInternal{query_id:uint64,user:address,timestamp:uint64,amount:coins}`

## DepositNotify
TLB: `deposit_notify#1c2e6481 query_id:uint64 timestamp:uint64 share_amount:coins contribute_amount:coins = DepositNotify`
Signature: `DepositNotify{query_id:uint64,timestamp:uint64,share_amount:coins,contribute_amount:coins}`

## WithdrawNotify
TLB: `withdraw_notify#df537789 query_id:uint64 timestamp:uint64 share_amount:coins = WithdrawNotify`
Signature: `WithdrawNotify{query_id:uint64,timestamp:uint64,share_amount:coins}`

## InitPoolAccountInternal
TLB: `init_pool_account_internal#388876b7 jetton_wallet:address = InitPoolAccountInternal`
Signature: `InitPoolAccountInternal{jetton_wallet:address}`

## InitTicketInternal1
TLB: `init_ticket_internal1#b635015f period:uint32 start:uint64 end:uint64 avg_balance:coins = InitTicketInternal1`
Signature: `InitTicketInternal1{period:uint32,start:uint64,end:uint64,avg_balance:coins}`

## Deposit
TLB: `deposit#a2aca06d query_id:uint64 = Deposit`
Signature: `Deposit{query_id:uint64}`

## Withdraw
TLB: `withdraw#c9b0c4c2 query_id:uint64 amount:coins = Withdraw`
Signature: `Withdraw{query_id:uint64,amount:coins}`

## InitDrawInternal
TLB: `init_draw_internal#3c664220 deployer:address jetton_wallet:address twab_timestamp:uint64 twab_amount:uint128 = InitDrawInternal`
Signature: `InitDrawInternal{deployer:address,jetton_wallet:address,twab_timestamp:uint64,twab_amount:uint128}`

## InitTicket
TLB: `init_ticket#94b4cb51 pool_account:address = InitTicket`
Signature: `InitTicket{pool_account:address}`

## ClaimPrizeInternal
TLB: `claim_prize_internal#579ddb5b query_id:uint64 user:address pool_account:address pick_payload:remainder<slice> = ClaimPrizeInternal`
Signature: `ClaimPrizeInternal{query_id:uint64,user:address,pool_account:address,pick_payload:remainder<slice>}`

## InitTicketInternal2
TLB: `init_ticket_internal2#358ded52 draw_avg_balance:coins user_avg_balance:coins = InitTicketInternal2`
Signature: `InitTicketInternal2{draw_avg_balance:coins,user_avg_balance:coins}`

## PayPrizeDebtInternal
TLB: `pay_prize_debt_internal#59d2c79e user:address amount:coins = PayPrizeDebtInternal`
Signature: `PayPrizeDebtInternal{user:address,amount:coins}`

## ClaimPrize
TLB: `claim_prize#004f88d8 query_id:uint64 index_payload:remainder<slice> = ClaimPrize`
Signature: `ClaimPrize{query_id:uint64,index_payload:remainder<slice>}`

## ClaimPrizeDebt
TLB: `claim_prize_debt#e61db7ab query_id:uint64 amount:coins reserve:address = ClaimPrizeDebt`
Signature: `ClaimPrizeDebt{query_id:uint64,amount:coins,reserve:address}`

## ClaimPrizeDebtInternal
TLB: `claim_prize_debt_internal#e00fdea0 query_id:uint64 user:address draw:address period:uint32 amount:coins = ClaimPrizeDebtInternal`
Signature: `ClaimPrizeDebtInternal{query_id:uint64,user:address,draw:address,period:uint32,amount:coins}`

## Twab
TLB: `_ timestamp:uint64 amount:uint128 = Twab`
Signature: `Twab{timestamp:uint64,amount:uint128}`

## TwabStore
TLB: `_ store:dict<int, ^Twab{timestamp:uint64,amount:uint128}> size:uint64 = TwabStore`
Signature: `TwabStore{store:dict<int, ^Twab{timestamp:uint64,amount:uint128}>,size:uint64}`

## DrawData
TLB: `_ active:bool pool_master:address prize_reserve:address jetton_wallet:address period:uint32 start:Twab{timestamp:uint64,amount:uint128} end:Twab{timestamp:uint64,amount:uint128} prize_amount:coins winning_number:uint32 deadline:uint64 avail_prize_amount:coins = DrawData`
Signature: `DrawData{active:bool,pool_master:address,prize_reserve:address,jetton_wallet:address,period:uint32,start:Twab{timestamp:uint64,amount:uint128},end:Twab{timestamp:uint64,amount:uint128},prize_amount:coins,winning_number:uint32,deadline:uint64,avail_prize_amount:coins}`

## ChangeOwner
TLB: `change_owner#819dbe99 queryId:uint64 newOwner:address = ChangeOwner`
Signature: `ChangeOwner{queryId:uint64,newOwner:address}`

## ChangeOwnerOk
TLB: `change_owner_ok#327b2b4a queryId:uint64 newOwner:address = ChangeOwnerOk`
Signature: `ChangeOwnerOk{queryId:uint64,newOwner:address}`

# Get Methods
Total Get Methods: 7

## get_core_data

## get_ticket_address
Argument: period

## get_deposit_cache
Argument: query_id

## get_first_twab

## get_last_twab

## binary_search_twab
Argument: timestamp

## owner

# Error Codes
2: Stack undeflow
3: Stack overflow
4: Integer overflow
5: Integer out of expected range
6: Invalid opcode
7: Type check error
8: Cell overflow
9: Cell underflow
10: Dictionary error
13: Out of gas error
32: Method ID not found
34: Action is invalid or not supported
37: Not enough TON
38: Not enough extra-currencies
128: Null reference exception
129: Invalid serialization prefix
130: Invalid incoming message
131: Constraints error
132: Access denied
133: Contract stopped
134: Invalid argument
135: Code of a contract was not found
136: Invalid address
137: Masterchain support is not enabled for this contract
2805: Insufficient value
3012: Invalid deposit amount
4429: Invalid sender
6571: Draw is not over
6682: Query id not exists
7189: Zero amount
13788: Invalid pick size
16022: Insufficient picks
16960: Invalid claim amount
19074: Empty twab store
19317: Invalid timestamp
27055: No available prize
30919: Ticket is active
31206: Start time >= End time
47849: Draw is over
49516: Ticket is inactive
54665: Draw is inactive
55483: Invalid tier
58059: Query id used
60931: Pick is used