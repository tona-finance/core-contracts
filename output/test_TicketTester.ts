import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type ComputePickNumber = {
    $$type: 'ComputePickNumber';
    index: bigint;
    expected_number: bigint;
}

export function storeComputePickNumber(src: ComputePickNumber) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(682995259, 32);
        b_0.storeUint(src.index, 32);
        b_0.storeUint(src.expected_number, 32);
    };
}

export function loadComputePickNumber(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 682995259) { throw Error('Invalid prefix'); }
    let _index = sc_0.loadUintBig(32);
    let _expected_number = sc_0.loadUintBig(32);
    return { $$type: 'ComputePickNumber' as const, index: _index, expected_number: _expected_number };
}

function loadTupleComputePickNumber(source: TupleReader) {
    let _index = source.readBigNumber();
    let _expected_number = source.readBigNumber();
    return { $$type: 'ComputePickNumber' as const, index: _index, expected_number: _expected_number };
}

function storeTupleComputePickNumber(source: ComputePickNumber) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.index);
    builder.writeNumber(source.expected_number);
    return builder.build();
}

function dictValueParserComputePickNumber(): DictionaryValue<ComputePickNumber> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeComputePickNumber(src)).endCell());
        },
        parse: (src) => {
            return loadComputePickNumber(src.loadRef().beginParse());
        }
    }
}

export type ComputePickPayload = {
    $$type: 'ComputePickPayload';
    prize_tester: Address;
    index_payload: Cell;
}

export function storeComputePickPayload(src: ComputePickPayload) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(849587341, 32);
        b_0.storeAddress(src.prize_tester);
        b_0.storeBuilder(src.index_payload.asBuilder());
    };
}

export function loadComputePickPayload(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 849587341) { throw Error('Invalid prefix'); }
    let _prize_tester = sc_0.loadAddress();
    let _index_payload = sc_0.asCell();
    return { $$type: 'ComputePickPayload' as const, prize_tester: _prize_tester, index_payload: _index_payload };
}

function loadTupleComputePickPayload(source: TupleReader) {
    let _prize_tester = source.readAddress();
    let _index_payload = source.readCell();
    return { $$type: 'ComputePickPayload' as const, prize_tester: _prize_tester, index_payload: _index_payload };
}

function storeTupleComputePickPayload(source: ComputePickPayload) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.prize_tester);
    builder.writeSlice(source.index_payload);
    return builder.build();
}

function dictValueParserComputePickPayload(): DictionaryValue<ComputePickPayload> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeComputePickPayload(src)).endCell());
        },
        parse: (src) => {
            return loadComputePickPayload(src.loadRef().beginParse());
        }
    }
}

export type ComputePrizeAmount = {
    $$type: 'ComputePrizeAmount';
    pick_payload: Cell;
}

export function storeComputePrizeAmount(src: ComputePrizeAmount) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3641436076, 32);
        b_0.storeBuilder(src.pick_payload.asBuilder());
    };
}

export function loadComputePrizeAmount(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3641436076) { throw Error('Invalid prefix'); }
    let _pick_payload = sc_0.asCell();
    return { $$type: 'ComputePrizeAmount' as const, pick_payload: _pick_payload };
}

function loadTupleComputePrizeAmount(source: TupleReader) {
    let _pick_payload = source.readCell();
    return { $$type: 'ComputePrizeAmount' as const, pick_payload: _pick_payload };
}

function storeTupleComputePrizeAmount(source: ComputePrizeAmount) {
    let builder = new TupleBuilder();
    builder.writeSlice(source.pick_payload);
    return builder.build();
}

function dictValueParserComputePrizeAmount(): DictionaryValue<ComputePrizeAmount> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeComputePrizeAmount(src)).endCell());
        },
        parse: (src) => {
            return loadComputePrizeAmount(src.loadRef().beginParse());
        }
    }
}

 type TicketTester_init_args = {
    $$type: 'TicketTester_init_args';
    owner: Address;
    size: bigint;
}

function initTicketTester_init_args(src: TicketTester_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeInt(src.size, 257);
    };
}

async function TicketTester_init(owner: Address, size: bigint) {
    const __code = Cell.fromBase64('te6ccgECEgEABA8AART/APSkE/S88sgLAQIBYgIDAt7QAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVEts88uCCyPhDAcx/AcoAVSBaINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WEssf9ADJ7VQEBQIBWA4PAdbtRNDUAfhj0gABjij6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdMf9ARVIGwT4Pgo1wsKgwm68uCJ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAFkC0QHbPAYD9gGSMH/gcCHXScIflTAg1wsf3iCCECi1rju6jksw0x8BghAota47uvLggdMf0x9ZbBJVMMj4KCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFssTyfkAqTgTggCeyAW6FPL0WH/gIIIQMqOsjbrjAoIQlGqYtrrjAgcICQACbQL2MNMfAYIQMqOsjbry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIIWwSyHOOrwHUAdAQNkVAINdJgBSpBIE13CHBNPL0UTOhgT6WIcL/8vTIBIrkMQLJUAXMRUAT5DHJ0MgBghDZC+esWMsfAc8WyXBt2zx/CgsBTtMfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8fwsABDBwAMoB0xMjgQEBI3FBM/QMb6GUAdcAMJJbbeKCAO4DAW7y9AOBAQEif3EhbpVbWfRaMJjIAc8AQTP0QuIQNQHI+Cgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbLE8n5ADBARAE2bW0ibrOZWyBu8tCAbyIBkTLiECRwAwSAQlAjDAHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wANAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMALm7vRgnBc7D1dLK57HoTsOdZKhRtmgnCd1jUtK2R8syLTry398WI5gnAgVcAbgGdjlM5YOq5HJbLDgnAb1J3vlUWW8cdT094FWcMmgnCdl05as07LczoOlm2UZuikgCAUgQEQARsK+7UTQ0gABgAHWybuNDVpcGZzOi8vUW1aaFJRdmRnQ1dLYUhtaG1NOWdDdWhiNXFGdm5GVGc3RW13N2ZVWFZ1TVhaZIIA==');
    const __system = Cell.fromBase64('te6cckECFAEABBkAAQHAAQEFoZ09AgEU/wD0pBP0vPLICwMCAWIJBAIBWAgFAgFIBwYAdbJu40NWlwZnM6Ly9RbVpoUlF2ZGdDV0thSG1obU05Z0N1aGI1cUZ2bkZUZzdFbXc3ZlVYVnVNWFpkggABGwr7tRNDSAAGAAubu9GCcFzsPV0srnsehOw51kqFG2aCcJ3WNS0rZHyzItOvLf3xYjmCcCBVwBuAZ2OUzlg6rkclssOCcBvUne+VRZbxx1PT3gVZwyaCcJ2XTlqzTstzOg6WbZRm6KSALe0AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRLbPPLggsj4QwHMfwHKAFUgWiDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhLLH/QAye1UEgoD9gGSMH/gcCHXScIflTAg1wsf3iCCECi1rju6jksw0x8BghAota47uvLggdMf0x9ZbBJVMMj4KCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFssTyfkAqTgTggCeyAW6FPL0WH/gIIIQMqOsjbrjAoIQlGqYtrrjAg0MCwAEMHABTtMfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8fw4C9jDTHwGCEDKjrI268uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiCFsEshzjq8B1AHQEDZFQCDXSYAUqQSBNdwhwTTy9FEzoYE+liHC//L0yASK5DECyVAFzEVAE+QxydDIAYIQ2QvnrFjLHwHPFslwbds8fxEOATZtbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCMPAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7ABAAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwAygHTEyOBAQEjcUEz9AxvoZQB1wAwkltt4oIA7gMBbvL0A4EBASJ/cSFulVtZ9FowmMgBzwBBM/RC4hA1Acj4KCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFssTyfkAMEBEAdbtRNDUAfhj0gABjij6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdMf9ARVIGwT4Pgo1wsKgwm68uCJ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAFkC0QHbPBMAAm1kWlS+');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initTicketTester_init_args({ $$type: 'TicketTester_init_args', owner, size })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const TicketTester_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    13788: { message: `Invalid pick size` },
    16022: { message: `Insufficient picks` },
    40648: { message: `Invalid pick number` },
    60931: { message: `Pick is used` },
}

const TicketTester_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ComputePickNumber","header":682995259,"fields":[{"name":"index","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"expected_number","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"ComputePickPayload","header":849587341,"fields":[{"name":"prize_tester","type":{"kind":"simple","type":"address","optional":false}},{"name":"index_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"ComputePrizeAmount","header":3641436076,"fields":[{"name":"pick_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
]

const TicketTester_getters: ABIGetter[] = [
]

const TicketTester_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"ComputePickNumber"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ComputePickPayload"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class TicketTester implements Contract {
    
    static async init(owner: Address, size: bigint) {
        return await TicketTester_init(owner, size);
    }
    
    static async fromInit(owner: Address, size: bigint) {
        const init = await TicketTester_init(owner, size);
        const address = contractAddress(0, init);
        return new TicketTester(address, init);
    }
    
    static fromAddress(address: Address) {
        return new TicketTester(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  TicketTester_types,
        getters: TicketTester_getters,
        receivers: TicketTester_receivers,
        errors: TicketTester_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: ComputePickNumber | ComputePickPayload | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ComputePickNumber') {
            body = beginCell().store(storeComputePickNumber(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ComputePickPayload') {
            body = beginCell().store(storeComputePickPayload(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
}