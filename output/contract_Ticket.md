# TACT Compilation Report
Contract: Ticket
BOC Size: 2060 bytes

# Types
Total Types: 31

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

## DepositInternal
TLB: `deposit_internal#a152ad13 amount:coins user:address = DepositInternal`
Signature: `DepositInternal{amount:coins,user:address}`

## WithdrawInternal
TLB: `withdraw_internal#ff1a77b3 amount:coins user:address = WithdrawInternal`
Signature: `WithdrawInternal{amount:coins,user:address}`

## Borrow
TLB: `borrow#44d2eb3f amount:coins = Borrow`
Signature: `Borrow{amount:coins}`

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
TLB: `prepare_init_ticket#fd2a75d9 period:uint32 start:uint64 end:uint64 avg_balance:coins = PrepareInitTicket`
Signature: `PrepareInitTicket{period:uint32,start:uint64,end:uint64,avg_balance:coins}`

## InitDraw
TLB: `init_draw#b956078d twab_timestamp:uint64 twab_amount:uint128 refund_address:address = InitDraw`
Signature: `InitDraw{twab_timestamp:uint64,twab_amount:uint128,refund_address:address}`

## OpenDraw
TLB: `open_draw#d0953867 twab_timestamp:uint64 twab_amount:uint128 prize_amount:coins refund_address:address = OpenDraw`
Signature: `OpenDraw{twab_timestamp:uint64,twab_amount:uint128,prize_amount:coins,refund_address:address}`

## InitTicket
TLB: `init_ticket#94b4cb51 pool_account:address = InitTicket`
Signature: `InitTicket{pool_account:address}`

## ClaimPrizeInternal
TLB: `claim_prize_internal#aad107a3 user:address pool_account:address pick_payload:remainder<slice> = ClaimPrizeInternal`
Signature: `ClaimPrizeInternal{user:address,pool_account:address,pick_payload:remainder<slice>}`

## InitTicketInternal
TLB: `init_ticket_internal#b10fd50e draw_avg_balance:coins user_avg_balance:coins = InitTicketInternal`
Signature: `InitTicketInternal{draw_avg_balance:coins,user_avg_balance:coins}`

## PayPrizeDebtInternal
TLB: `pay_prize_debt_internal#59d2c79e user:address amount:coins = PayPrizeDebtInternal`
Signature: `PayPrizeDebtInternal{user:address,amount:coins}`

## ClaimPrize
TLB: `claim_prize#bbc4b04f index_payload:remainder<slice> = ClaimPrize`
Signature: `ClaimPrize{index_payload:remainder<slice>}`

## ClaimPrizeDebt
TLB: `claim_prize_debt#771f1b42 amount:coins reserve:address = ClaimPrizeDebt`
Signature: `ClaimPrizeDebt{amount:coins,reserve:address}`

## ClaimPrizeDebtInternal
TLB: `claim_prize_debt_internal#3dc1492c amount:coins user:address draw:address period:uint32 = ClaimPrizeDebtInternal`
Signature: `ClaimPrizeDebtInternal{amount:coins,user:address,draw:address,period:uint32}`

## PoolMasterData
TLB: `_ owner:address prize_reserve:address twab:Twab{timestamp:uint64,amount:uint128} share_amount:coins borrow_amount:coins prize_amount:coins next_period:uint32 = PoolMasterData`
Signature: `PoolMasterData{owner:address,prize_reserve:address,twab:Twab{timestamp:uint64,amount:uint128},share_amount:coins,borrow_amount:coins,prize_amount:coins,next_period:uint32}`

## PoolAccountData
TLB: `_ owner:address master:address prize_reserve:address share_amount:coins = PoolAccountData`
Signature: `PoolAccountData{owner:address,master:address,prize_reserve:address,share_amount:coins}`

## DrawData
TLB: `_ active:bool pool_master:address prize_reserve:address period:uint32 start:Maybe Twab{timestamp:uint64,amount:uint128} end:Maybe Twab{timestamp:uint64,amount:uint128} prize_amount:coins avail_prize_amount:coins winning_number:uint32 deadline:uint64 prize_percentage_0:uint16 prize_percentage_1:uint16 prize_percentage_2:uint16 prize_percentage_3:uint16 prize_percentage_4:uint16 = DrawData`
Signature: `DrawData{active:bool,pool_master:address,prize_reserve:address,period:uint32,start:Maybe Twab{timestamp:uint64,amount:uint128},end:Maybe Twab{timestamp:uint64,amount:uint128},prize_amount:coins,avail_prize_amount:coins,winning_number:uint32,deadline:uint64,prize_percentage_0:uint16,prize_percentage_1:uint16,prize_percentage_2:uint16,prize_percentage_3:uint16,prize_percentage_4:uint16}`

## TicketData
TLB: `_ active:bool owner:address pool_account:address draw:address period:uint32 picks:uint32 debt_amount:coins = TicketData`
Signature: `TicketData{active:bool,owner:address,pool_account:address,draw:address,period:uint32,picks:uint32,debt_amount:coins}`

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
Total Get Methods: 3

## get_core_data

## get_index_status
Argument: index

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
13788: Invalid pick size
16022: Insufficient picks
16960: Invalid claim amount
17110: Draw already initialized
19074: Empty twab store
19102: Account locked
19317: Invalid timestamp
23432: timestamp >= End time
24632: Only from pool master
30919: Ticket is active
31206: Start time >= End time
41207: invalid sender
46439: Invalid withdraw amount
47849: Draw is over
49516: Ticket is inactive
51181: No prize
54615: Insufficient balance
54665: Draw is inactive
60931: Pick is used