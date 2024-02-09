# TACT Compilation Report
Contract: PrizeReserve
BOC Size: 1335 bytes

# Types
Total Types: 37

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

## Twab
TLB: `_ timestamp:uint64 amount:uint128 = Twab`
Signature: `Twab{timestamp:uint64,amount:uint128}`

## TwabStore
TLB: `_ store:dict<int, ^Twab{timestamp:uint64,amount:uint128}> size:uint64 = TwabStore`
Signature: `TwabStore{store:dict<int, ^Twab{timestamp:uint64,amount:uint128}>,size:uint64}`

## Borrow
TLB: `borrow#44d2eb3f amount:coins = Borrow`
Signature: `Borrow{amount:coins}`

## Repay
TLB: `repay#cda0bc81 amount:coins = Repay`
Signature: `Repay{amount:coins}`

## DepositInternal
TLB: `deposit_internal#a152ad13 amount:coins user:address = DepositInternal`
Signature: `DepositInternal{amount:coins,user:address}`

## WithdrawInternal
TLB: `withdraw_internal#ff1a77b3 amount:coins user:address = WithdrawInternal`
Signature: `WithdrawInternal{amount:coins,user:address}`

## ClaimPrizeInternal
TLB: `claim_prize_internal#a07ecafa amount:coins period:uint32 user:address = ClaimPrizeInternal`
Signature: `ClaimPrizeInternal{amount:coins,period:uint32,user:address}`

## Withdraw
TLB: `withdraw#0ba69751 amount:coins = Withdraw`
Signature: `Withdraw{amount:coins}`

## DepositFinish
TLB: `deposit_finish#cff32eaa timestamp:uint64 amount:coins = DepositFinish`
Signature: `DepositFinish{timestamp:uint64,amount:coins}`

## WithdrawFinish
TLB: `withdraw_finish#1440585b timestamp:uint64 amount:coins = WithdrawFinish`
Signature: `WithdrawFinish{timestamp:uint64,amount:coins}`

## PrepareInitTicket
TLB: `prepare_init_ticket#889fabba period:uint32 start:uint64 end:uint64 winning_number:uint16 prize_amount:coins jetton_amount:coins avg_balance:coins ticket_code:^cell ticket_data:^cell = PrepareInitTicket`
Signature: `PrepareInitTicket{period:uint32,start:uint64,end:uint64,winning_number:uint16,prize_amount:coins,jetton_amount:coins,avg_balance:coins,ticket_code:^cell,ticket_data:^cell}`

## PayPrizeDebtInternal
TLB: `pay_prize_debt_internal#4988123a amount:coins user:address = PayPrizeDebtInternal`
Signature: `PayPrizeDebtInternal{amount:coins,user:address}`

## ClaimPrizeDebt
TLB: `claim_prize_debt#2c07892c amount:coins prize_reserve:address = ClaimPrizeDebt`
Signature: `ClaimPrizeDebt{amount:coins,prize_reserve:address}`

## InitDraw
TLB: `init_draw#b956078d twab_timestamp:uint64 twab_amount:uint128 refund_address:address = InitDraw`
Signature: `InitDraw{twab_timestamp:uint64,twab_amount:uint128,refund_address:address}`

## OpenDraw
TLB: `open_draw#82c7e974 twab_timestamp:uint64 twab_amount:uint128 prize_amount:coins jetton_amount:coins refund_address:address = OpenDraw`
Signature: `OpenDraw{twab_timestamp:uint64,twab_amount:uint128,prize_amount:coins,jetton_amount:coins,refund_address:address}`

## InitTicket
TLB: `init_ticket#1ee7f835 pool_account:address code:^cell data:^cell = InitTicket`
Signature: `InitTicket{pool_account:address,code:^cell,data:^cell}`

## ClaimJettonInternal
TLB: `claim_jetton_internal#e91b367f amount:coins period:uint32 user:address = ClaimJettonInternal`
Signature: `ClaimJettonInternal{amount:coins,period:uint32,user:address}`

## InitTicketInternal
TLB: `init_ticket_internal#9814dacb winning_number:uint16 total_prize_amount:coins picks:uint16 jetton_amount:coins = InitTicketInternal`
Signature: `InitTicketInternal{winning_number:uint16,total_prize_amount:coins,picks:uint16,jetton_amount:coins}`

## ClaimPrize
TLB: `claim_prize#8c027f1f index_payload:^cell pool_master:address = ClaimPrize`
Signature: `ClaimPrize{index_payload:^cell,pool_master:address}`

## ClaimJetton
TLB: `claim_jetton#339eb8a7 pool_master:address = ClaimJetton`
Signature: `ClaimJetton{pool_master:address}`

## ClaimPrizeDebtInternal
TLB: `claim_prize_debt_internal#342cd755 amount:coins user:address = ClaimPrizeDebtInternal`
Signature: `ClaimPrizeDebtInternal{amount:coins,user:address}`

## JettonNotification
TLB: `jetton_notification#7362d09c query_id:uint64 amount:coins from:address forward_payload:remainder<slice> = JettonNotification`
Signature: `JettonNotification{query_id:uint64,amount:coins,from:address,forward_payload:remainder<slice>}`

## JettonTransfer
TLB: `jetton_transfer#0f8a7ea5 query_id:uint64 amount:coins destination:address response_destination:address custom_payload:Maybe ^cell forward_ton_amount:coins forward_payload:remainder<slice> = JettonTransfer`
Signature: `JettonTransfer{query_id:uint64,amount:coins,destination:address,response_destination:address,custom_payload:Maybe ^cell,forward_ton_amount:coins,forward_payload:remainder<slice>}`

## PoolMasterData
TLB: `_ owner:address jetton_master:address jetton_wallet_code:^cell twab:Twab{timestamp:uint64,amount:uint128} next_period:uint32 share_amount:coins borrow_amount:coins prize_amount:coins avail_prize_amount:coins jetton_amount:coins = PoolMasterData`
Signature: `PoolMasterData{owner:address,jetton_master:address,jetton_wallet_code:^cell,twab:Twab{timestamp:uint64,amount:uint128},next_period:uint32,share_amount:coins,borrow_amount:coins,prize_amount:coins,avail_prize_amount:coins,jetton_amount:coins}`

## PoolAccountData
TLB: `_ owner:address master:address share_amount:coins debt_amount:coins = PoolAccountData`
Signature: `PoolAccountData{owner:address,master:address,share_amount:coins,debt_amount:coins}`

## DrawData
TLB: `_ active:bool pool_master:address period:uint32 start:Maybe Twab{timestamp:uint64,amount:uint128} end:Maybe Twab{timestamp:uint64,amount:uint128} prize_amount:coins jetton_amount:coins winning_number:uint16 = DrawData`
Signature: `DrawData{active:bool,pool_master:address,period:uint32,start:Maybe Twab{timestamp:uint64,amount:uint128},end:Maybe Twab{timestamp:uint64,amount:uint128},prize_amount:coins,jetton_amount:coins,winning_number:uint16}`

## TicketData
TLB: `_ active:bool owner:address pool_master:address period:uint32 picks:uint16 jetton_amount:coins = TicketData`
Signature: `TicketData{active:bool,owner:address,pool_master:address,period:uint32,picks:uint16,jetton_amount:coins}`

## PrizeReserveData
TLB: `_ pool_master:address balance:coins = PrizeReserveData`
Signature: `PrizeReserveData{pool_master:address,balance:coins}`

## ChangeOwner
TLB: `change_owner#819dbe99 queryId:uint64 newOwner:address = ChangeOwner`
Signature: `ChangeOwner{queryId:uint64,newOwner:address}`

## ChangeOwnerOk
TLB: `change_owner_ok#327b2b4a queryId:uint64 newOwner:address = ChangeOwnerOk`
Signature: `ChangeOwnerOk{queryId:uint64,newOwner:address}`

## WinningSplit
TLB: `_ n0:uint8 n1:uint8 n2:uint8 = WinningSplit`
Signature: `WinningSplit{n0:uint8,n1:uint8,n2:uint8}`

# Get Methods
Total Get Methods: 1

## get_core_data

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
3556: Draw not initialized
5910: Only ticket
5913: Only draw
8459: Invalid twab timestamp
10349: Start time >= timestamp
11439: Zero average balance
16022: Insufficient picks
16874: Zero jetton amount
16960: Invalid claim amount
17110: Draw already initialized
19074: Empty twab store
19102: Account locked
19317: Invalid timestamp
23432: timestamp >= End time
27755: Insufficient prize amount
30347: Invalid repay amount
30919: Ticket is active
31206: Start time >= End time
40127: Only pool account
43086: Only pool master
45150: Only jetton wallet
46002: Pick used
46439: Invalid withdraw amount
47447: Invalid borrow amount
49516: Ticket is inactive
54615: Insufficient balance
54665: Draw is inactive