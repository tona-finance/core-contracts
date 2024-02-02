# TACT Compilation Report
Contract: PoolAccount
BOC Size: 4180 bytes

# Types
Total Types: 34

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

## WinningSplit
TLB: `_ n0:uint8 n1:uint8 n2:uint8 n3:uint8 = WinningSplit`
Signature: `WinningSplit{n0:uint8,n1:uint8,n2:uint8,n3:uint8}`

## OpenDraw
TLB: `open_draw#c4e969c3 prize_amount:coins = OpenDraw`
Signature: `OpenDraw{prize_amount:coins}`

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
TLB: `prepare_init_ticket#46b9f6cb period:uint32 winning_number:uint32 start:uint64 end:uint64 avg_balance:coins = PrepareInitTicket`
Signature: `PrepareInitTicket{period:uint32,winning_number:uint32,start:uint64,end:uint64,avg_balance:coins}`

## ClaimPrizeDebt
TLB: `claim_prize_debt#771f1b42 amount:coins reserve:address = ClaimPrizeDebt`
Signature: `ClaimPrizeDebt{amount:coins,reserve:address}`

## InitDraw
TLB: `init_draw#b956078d twab_timestamp:uint64 twab_amount:uint128 refund_address:address = InitDraw`
Signature: `InitDraw{twab_timestamp:uint64,twab_amount:uint128,refund_address:address}`

## OpenDrawInternal
TLB: `open_draw_internal#8c567c19 twab_timestamp:uint64 twab_amount:uint128 refund_address:address = OpenDrawInternal`
Signature: `OpenDrawInternal{twab_timestamp:uint64,twab_amount:uint128,refund_address:address}`

## InitTicket
TLB: `init_ticket#94b4cb51 pool_account:address = InitTicket`
Signature: `InitTicket{pool_account:address}`

## ClaimPrizeInternal
TLB: `claim_prize_internal#8e3ba93f user:address pool_account:address prize_scale:uint32 = ClaimPrizeInternal`
Signature: `ClaimPrizeInternal{user:address,pool_account:address,prize_scale:uint32}`

## InitTicketInternal
TLB: `init_ticket_internal#46b5d74d winning_number:uint32 draw_avg_balance:coins user_avg_balance:coins = InitTicketInternal`
Signature: `InitTicketInternal{winning_number:uint32,draw_avg_balance:coins,user_avg_balance:coins}`

## PayPrizeDebtInternal
TLB: `pay_prize_debt_internal#54cb9090 user:address amount:coins period:uint32 = PayPrizeDebtInternal`
Signature: `PayPrizeDebtInternal{user:address,amount:coins,period:uint32}`

## ClaimPrize
TLB: `claim_prize#bbc4b04f index_payload:remainder<slice> = ClaimPrize`
Signature: `ClaimPrize{index_payload:remainder<slice>}`

## ClaimPrizeDebtInternal
TLB: `claim_prize_debt_internal#342cd755 amount:coins user:address = ClaimPrizeDebtInternal`
Signature: `ClaimPrizeDebtInternal{amount:coins,user:address}`

## PoolMasterData
TLB: `_ owner:address prize_reserve:address twab:Twab{timestamp:uint64,amount:uint128} share_amount:coins borrow_amount:coins prize_amount:coins next_period:uint32 = PoolMasterData`
Signature: `PoolMasterData{owner:address,prize_reserve:address,twab:Twab{timestamp:uint64,amount:uint128},share_amount:coins,borrow_amount:coins,prize_amount:coins,next_period:uint32}`

## PoolAccountData
TLB: `_ owner:address master:address prize_reserve:address share_amount:coins debt_amount:coins = PoolAccountData`
Signature: `PoolAccountData{owner:address,master:address,prize_reserve:address,share_amount:coins,debt_amount:coins}`

## DrawData
TLB: `_ active:bool pool_master:address prize_reserve:address period:uint32 start:Maybe Twab{timestamp:uint64,amount:uint128} end:Maybe Twab{timestamp:uint64,amount:uint128} prize_amount:coins avail_prize_amount:coins winning_number:uint32 deadline:uint64 = DrawData`
Signature: `DrawData{active:bool,pool_master:address,prize_reserve:address,period:uint32,start:Maybe Twab{timestamp:uint64,amount:uint128},end:Maybe Twab{timestamp:uint64,amount:uint128},prize_amount:coins,avail_prize_amount:coins,winning_number:uint32,deadline:uint64}`

## TicketData
TLB: `_ active:bool owner:address pool_account:address draw:address period:uint32 picks:uint32 = TicketData`
Signature: `TicketData{active:bool,owner:address,pool_account:address,draw:address,period:uint32,picks:uint32}`

## PrizeReserveData
TLB: `_ pool_master:address balance:coins = PrizeReserveData`
Signature: `PrizeReserveData{pool_master:address,balance:coins}`

## ChangeOwner
TLB: `change_owner#819dbe99 queryId:uint64 newOwner:address = ChangeOwner`
Signature: `ChangeOwner{queryId:uint64,newOwner:address}`

## ChangeOwnerOk
TLB: `change_owner_ok#327b2b4a queryId:uint64 newOwner:address = ChangeOwnerOk`
Signature: `ChangeOwnerOk{queryId:uint64,newOwner:address}`

# Get Methods
Total Get Methods: 5

## get_core_data

## get_ticket_address
Argument: period

## get_twab_size

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
3556: Draw not initialized
4429: Invalid sender
6571: Draw is not over
8459: Invalid twab timestamp
8888: Only from draw
10349: Start time >= timestamp
11439: Zero average balance
16022: Insufficient picks
16960: Invalid claim amount
17110: Draw already initialized
19074: Empty twab store
19102: Account locked
19317: Invalid timestamp
23432: timestamp >= End time
24632: Only from pool master
28129: Invalid prize amount
30347: Invalid repay amount
30919: Ticket is active
31206: Start time >= End time
40127: Only pool account
41207: invalid sender
46002: Pick used
46439: Invalid withdraw amount
47447: Invalid borrow amount
47849: Draw is over
49516: Ticket is inactive
54615: Insufficient balance
54665: Draw is inactive