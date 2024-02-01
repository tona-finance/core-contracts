# TACT Compilation Report
Contract: TicketTester
BOC Size: 711 bytes

# Types
Total Types: 5

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## ComputePickNumber
TLB: `compute_pick_number#28b5ae3b index:uint32 expected_number:uint32 = ComputePickNumber`
Signature: `ComputePickNumber{index:uint32,expected_number:uint32}`

## ComputePickPayload
TLB: `compute_pick_payload#a0188134 index_payload:^slice = ComputePickPayload`
Signature: `ComputePickPayload{index_payload:^slice}`

# Get Methods
Total Get Methods: 0

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
13788: Invalid pick size
16022: Insufficient picks
40648: Invalid pick number
60931: Pick is used