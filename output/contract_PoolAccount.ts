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

export type Twab = {
    $$type: 'Twab';
    timestamp: bigint;
    amount: bigint;
}

export function storeTwab(src: Twab) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.timestamp, 64);
        b_0.storeUint(src.amount, 128);
    };
}

export function loadTwab(slice: Slice) {
    let sc_0 = slice;
    let _timestamp = sc_0.loadUintBig(64);
    let _amount = sc_0.loadUintBig(128);
    return { $$type: 'Twab' as const, timestamp: _timestamp, amount: _amount };
}

function loadTupleTwab(source: TupleReader) {
    let _timestamp = source.readBigNumber();
    let _amount = source.readBigNumber();
    return { $$type: 'Twab' as const, timestamp: _timestamp, amount: _amount };
}

function storeTupleTwab(source: Twab) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.timestamp);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserTwab(): DictionaryValue<Twab> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTwab(src)).endCell());
        },
        parse: (src) => {
            return loadTwab(src.loadRef().beginParse());
        }
    }
}

export type TwabStore = {
    $$type: 'TwabStore';
    store: Dictionary<bigint, Twab>;
    size: bigint;
}

export function storeTwabStore(src: TwabStore) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeDict(src.store, Dictionary.Keys.BigInt(257), dictValueParserTwab());
        b_0.storeUint(src.size, 64);
    };
}

export function loadTwabStore(slice: Slice) {
    let sc_0 = slice;
    let _store = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserTwab(), sc_0);
    let _size = sc_0.loadUintBig(64);
    return { $$type: 'TwabStore' as const, store: _store, size: _size };
}

function loadTupleTwabStore(source: TupleReader) {
    let _store = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserTwab(), source.readCellOpt());
    let _size = source.readBigNumber();
    return { $$type: 'TwabStore' as const, store: _store, size: _size };
}

function storeTupleTwabStore(source: TwabStore) {
    let builder = new TupleBuilder();
    builder.writeCell(source.store.size > 0 ? beginCell().storeDictDirect(source.store, Dictionary.Keys.BigInt(257), dictValueParserTwab()).endCell() : null);
    builder.writeNumber(source.size);
    return builder.build();
}

function dictValueParserTwabStore(): DictionaryValue<TwabStore> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTwabStore(src)).endCell());
        },
        parse: (src) => {
            return loadTwabStore(src.loadRef().beginParse());
        }
    }
}

export type DepositInStaker = {
    $$type: 'DepositInStaker';
    query_id: bigint;
}

export function storeDepositInStaker(src: DepositInStaker) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1205158801, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadDepositInStaker(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1205158801) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'DepositInStaker' as const, query_id: _query_id };
}

function loadTupleDepositInStaker(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'DepositInStaker' as const, query_id: _query_id };
}

function storeTupleDepositInStaker(source: DepositInStaker) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserDepositInStaker(): DictionaryValue<DepositInStaker> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDepositInStaker(src)).endCell());
        },
        parse: (src) => {
            return loadDepositInStaker(src.loadRef().beginParse());
        }
    }
}

export type StakerWithdrawal = {
    $$type: 'StakerWithdrawal';
    query_id: bigint;
}

export function storeStakerWithdrawal(src: StakerWithdrawal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(175592284, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadStakerWithdrawal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 175592284) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'StakerWithdrawal' as const, query_id: _query_id };
}

function loadTupleStakerWithdrawal(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'StakerWithdrawal' as const, query_id: _query_id };
}

function storeTupleStakerWithdrawal(source: StakerWithdrawal) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserStakerWithdrawal(): DictionaryValue<StakerWithdrawal> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStakerWithdrawal(src)).endCell());
        },
        parse: (src) => {
            return loadStakerWithdrawal(src.loadRef().beginParse());
        }
    }
}

export type TokenNotification = {
    $$type: 'TokenNotification';
    query_id: bigint;
    amount: bigint;
    from: Address;
    forward_payload: Cell;
}

export function storeTokenNotification(src: TokenNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'TokenNotification' as const, query_id: _query_id, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function loadTupleTokenNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _forward_payload = source.readCell();
    return { $$type: 'TokenNotification' as const, query_id: _query_id, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function storeTupleTokenNotification(source: TokenNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserTokenNotification(): DictionaryValue<TokenNotification> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenNotification(src)).endCell());
        },
        parse: (src) => {
            return loadTokenNotification(src.loadRef().beginParse());
        }
    }
}

export type TokenExcesses = {
    $$type: 'TokenExcesses';
    query_id: bigint;
}

export function storeTokenExcesses(src: TokenExcesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadTokenExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'TokenExcesses' as const, query_id: _query_id };
}

function loadTupleTokenExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'TokenExcesses' as const, query_id: _query_id };
}

function storeTupleTokenExcesses(source: TokenExcesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserTokenExcesses(): DictionaryValue<TokenExcesses> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadTokenExcesses(src.loadRef().beginParse());
        }
    }
}

export type TokenTransfer = {
    $$type: 'TokenTransfer';
    query_id: bigint;
    amount: bigint;
    destination: Address;
    response_destination: Address;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Cell;
}

export function storeTokenTransfer(src: TokenTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(260734629, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTokenTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _destination = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'TokenTransfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleTokenTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'TokenTransfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleTokenTransfer(source: TokenTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserTokenTransfer(): DictionaryValue<TokenTransfer> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTokenTransfer(src.loadRef().beginParse());
        }
    }
}

export type TokenBurn = {
    $$type: 'TokenBurn';
    query_id: bigint;
    amount: bigint;
    response_destination: Address;
    custom_payload: Cell | null;
}

export function storeTokenBurn(src: TokenBurn) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1499400124, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
    };
}

export function loadTokenBurn(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1499400124) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'TokenBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function loadTupleTokenBurn(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    return { $$type: 'TokenBurn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function storeTupleTokenBurn(source: TokenBurn) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    return builder.build();
}

function dictValueParserTokenBurn(): DictionaryValue<TokenBurn> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTokenBurn(src)).endCell());
        },
        parse: (src) => {
            return loadTokenBurn(src.loadRef().beginParse());
        }
    }
}

export type SetPrize = {
    $$type: 'SetPrize';
    amount: bigint;
}

export function storeSetPrize(src: SetPrize) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3546560533, 32);
        b_0.storeCoins(src.amount);
    };
}

export function loadSetPrize(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3546560533) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    return { $$type: 'SetPrize' as const, amount: _amount };
}

function loadTupleSetPrize(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'SetPrize' as const, amount: _amount };
}

function storeTupleSetPrize(source: SetPrize) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserSetPrize(): DictionaryValue<SetPrize> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSetPrize(src)).endCell());
        },
        parse: (src) => {
            return loadSetPrize(src.loadRef().beginParse());
        }
    }
}

export type WithdrawInternal = {
    $$type: 'WithdrawInternal';
    query_id: bigint;
    user: Address;
    withdraw_amount: bigint;
    acc_contribute_amount: bigint;
    acc_withdraw_amount: bigint;
}

export function storeWithdrawInternal(src: WithdrawInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2498498580, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.user);
        b_0.storeCoins(src.withdraw_amount);
        b_0.storeCoins(src.acc_contribute_amount);
        b_0.storeCoins(src.acc_withdraw_amount);
    };
}

export function loadWithdrawInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2498498580) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _user = sc_0.loadAddress();
    let _withdraw_amount = sc_0.loadCoins();
    let _acc_contribute_amount = sc_0.loadCoins();
    let _acc_withdraw_amount = sc_0.loadCoins();
    return { $$type: 'WithdrawInternal' as const, query_id: _query_id, user: _user, withdraw_amount: _withdraw_amount, acc_contribute_amount: _acc_contribute_amount, acc_withdraw_amount: _acc_withdraw_amount };
}

function loadTupleWithdrawInternal(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _user = source.readAddress();
    let _withdraw_amount = source.readBigNumber();
    let _acc_contribute_amount = source.readBigNumber();
    let _acc_withdraw_amount = source.readBigNumber();
    return { $$type: 'WithdrawInternal' as const, query_id: _query_id, user: _user, withdraw_amount: _withdraw_amount, acc_contribute_amount: _acc_contribute_amount, acc_withdraw_amount: _acc_withdraw_amount };
}

function storeTupleWithdrawInternal(source: WithdrawInternal) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.user);
    builder.writeNumber(source.withdraw_amount);
    builder.writeNumber(source.acc_contribute_amount);
    builder.writeNumber(source.acc_withdraw_amount);
    return builder.build();
}

function dictValueParserWithdrawInternal(): DictionaryValue<WithdrawInternal> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeWithdrawInternal(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawInternal(src.loadRef().beginParse());
        }
    }
}

export type WithdrawFinishInternal = {
    $$type: 'WithdrawFinishInternal';
    query_id: bigint;
    user: Address;
    timestamp: bigint;
    amount: bigint;
}

export function storeWithdrawFinishInternal(src: WithdrawFinishInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2966263530, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.user);
        b_0.storeUint(src.timestamp, 64);
        b_0.storeCoins(src.amount);
    };
}

export function loadWithdrawFinishInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2966263530) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _user = sc_0.loadAddress();
    let _timestamp = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    return { $$type: 'WithdrawFinishInternal' as const, query_id: _query_id, user: _user, timestamp: _timestamp, amount: _amount };
}

function loadTupleWithdrawFinishInternal(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _user = source.readAddress();
    let _timestamp = source.readBigNumber();
    let _amount = source.readBigNumber();
    return { $$type: 'WithdrawFinishInternal' as const, query_id: _query_id, user: _user, timestamp: _timestamp, amount: _amount };
}

function storeTupleWithdrawFinishInternal(source: WithdrawFinishInternal) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.user);
    builder.writeNumber(source.timestamp);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserWithdrawFinishInternal(): DictionaryValue<WithdrawFinishInternal> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeWithdrawFinishInternal(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawFinishInternal(src.loadRef().beginParse());
        }
    }
}

export type DepositNotify = {
    $$type: 'DepositNotify';
    query_id: bigint;
    timestamp: bigint;
    share_amount: bigint;
    contribute_amount: bigint;
}

export function storeDepositNotify(src: DepositNotify) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(472802433, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeUint(src.timestamp, 64);
        b_0.storeCoins(src.share_amount);
        b_0.storeCoins(src.contribute_amount);
    };
}

export function loadDepositNotify(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 472802433) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _timestamp = sc_0.loadUintBig(64);
    let _share_amount = sc_0.loadCoins();
    let _contribute_amount = sc_0.loadCoins();
    return { $$type: 'DepositNotify' as const, query_id: _query_id, timestamp: _timestamp, share_amount: _share_amount, contribute_amount: _contribute_amount };
}

function loadTupleDepositNotify(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _timestamp = source.readBigNumber();
    let _share_amount = source.readBigNumber();
    let _contribute_amount = source.readBigNumber();
    return { $$type: 'DepositNotify' as const, query_id: _query_id, timestamp: _timestamp, share_amount: _share_amount, contribute_amount: _contribute_amount };
}

function storeTupleDepositNotify(source: DepositNotify) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.timestamp);
    builder.writeNumber(source.share_amount);
    builder.writeNumber(source.contribute_amount);
    return builder.build();
}

function dictValueParserDepositNotify(): DictionaryValue<DepositNotify> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDepositNotify(src)).endCell());
        },
        parse: (src) => {
            return loadDepositNotify(src.loadRef().beginParse());
        }
    }
}

export type WithdrawNotify = {
    $$type: 'WithdrawNotify';
    query_id: bigint;
    timestamp: bigint;
    share_amount: bigint;
}

export function storeWithdrawNotify(src: WithdrawNotify) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3746789257, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeUint(src.timestamp, 64);
        b_0.storeCoins(src.share_amount);
    };
}

export function loadWithdrawNotify(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3746789257) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _timestamp = sc_0.loadUintBig(64);
    let _share_amount = sc_0.loadCoins();
    return { $$type: 'WithdrawNotify' as const, query_id: _query_id, timestamp: _timestamp, share_amount: _share_amount };
}

function loadTupleWithdrawNotify(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _timestamp = source.readBigNumber();
    let _share_amount = source.readBigNumber();
    return { $$type: 'WithdrawNotify' as const, query_id: _query_id, timestamp: _timestamp, share_amount: _share_amount };
}

function storeTupleWithdrawNotify(source: WithdrawNotify) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.timestamp);
    builder.writeNumber(source.share_amount);
    return builder.build();
}

function dictValueParserWithdrawNotify(): DictionaryValue<WithdrawNotify> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeWithdrawNotify(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawNotify(src.loadRef().beginParse());
        }
    }
}

export type InitPoolAccountInternal = {
    $$type: 'InitPoolAccountInternal';
    jetton_wallet: Address;
}

export function storeInitPoolAccountInternal(src: InitPoolAccountInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(948467383, 32);
        b_0.storeAddress(src.jetton_wallet);
    };
}

export function loadInitPoolAccountInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 948467383) { throw Error('Invalid prefix'); }
    let _jetton_wallet = sc_0.loadAddress();
    return { $$type: 'InitPoolAccountInternal' as const, jetton_wallet: _jetton_wallet };
}

function loadTupleInitPoolAccountInternal(source: TupleReader) {
    let _jetton_wallet = source.readAddress();
    return { $$type: 'InitPoolAccountInternal' as const, jetton_wallet: _jetton_wallet };
}

function storeTupleInitPoolAccountInternal(source: InitPoolAccountInternal) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.jetton_wallet);
    return builder.build();
}

function dictValueParserInitPoolAccountInternal(): DictionaryValue<InitPoolAccountInternal> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeInitPoolAccountInternal(src)).endCell());
        },
        parse: (src) => {
            return loadInitPoolAccountInternal(src.loadRef().beginParse());
        }
    }
}

export type InitTicketInternal1 = {
    $$type: 'InitTicketInternal1';
    period: bigint;
    start: bigint;
    end: bigint;
    avg_balance: bigint;
}

export function storeInitTicketInternal1(src: InitTicketInternal1) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3056927071, 32);
        b_0.storeUint(src.period, 32);
        b_0.storeUint(src.start, 64);
        b_0.storeUint(src.end, 64);
        b_0.storeCoins(src.avg_balance);
    };
}

export function loadInitTicketInternal1(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3056927071) { throw Error('Invalid prefix'); }
    let _period = sc_0.loadUintBig(32);
    let _start = sc_0.loadUintBig(64);
    let _end = sc_0.loadUintBig(64);
    let _avg_balance = sc_0.loadCoins();
    return { $$type: 'InitTicketInternal1' as const, period: _period, start: _start, end: _end, avg_balance: _avg_balance };
}

function loadTupleInitTicketInternal1(source: TupleReader) {
    let _period = source.readBigNumber();
    let _start = source.readBigNumber();
    let _end = source.readBigNumber();
    let _avg_balance = source.readBigNumber();
    return { $$type: 'InitTicketInternal1' as const, period: _period, start: _start, end: _end, avg_balance: _avg_balance };
}

function storeTupleInitTicketInternal1(source: InitTicketInternal1) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.period);
    builder.writeNumber(source.start);
    builder.writeNumber(source.end);
    builder.writeNumber(source.avg_balance);
    return builder.build();
}

function dictValueParserInitTicketInternal1(): DictionaryValue<InitTicketInternal1> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeInitTicketInternal1(src)).endCell());
        },
        parse: (src) => {
            return loadInitTicketInternal1(src.loadRef().beginParse());
        }
    }
}

export type Deposit = {
    $$type: 'Deposit';
    query_id: bigint;
}

export function storeDeposit(src: Deposit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2729222253, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadDeposit(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2729222253) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'Deposit' as const, query_id: _query_id };
}

function loadTupleDeposit(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'Deposit' as const, query_id: _query_id };
}

function storeTupleDeposit(source: Deposit) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserDeposit(): DictionaryValue<Deposit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeposit(src)).endCell());
        },
        parse: (src) => {
            return loadDeposit(src.loadRef().beginParse());
        }
    }
}

export type Withdraw = {
    $$type: 'Withdraw';
    query_id: bigint;
    amount: bigint;
}

export function storeWithdraw(src: Withdraw) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3383805122, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
    };
}

export function loadWithdraw(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3383805122) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    return { $$type: 'Withdraw' as const, query_id: _query_id, amount: _amount };
}

function loadTupleWithdraw(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    return { $$type: 'Withdraw' as const, query_id: _query_id, amount: _amount };
}

function storeTupleWithdraw(source: Withdraw) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserWithdraw(): DictionaryValue<Withdraw> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeWithdraw(src)).endCell());
        },
        parse: (src) => {
            return loadWithdraw(src.loadRef().beginParse());
        }
    }
}

export type InitDrawInternal = {
    $$type: 'InitDrawInternal';
    deployer: Address;
    jetton_wallet: Address;
    twab_timestamp: bigint;
    twab_amount: bigint;
}

export function storeInitDrawInternal(src: InitDrawInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1013334560, 32);
        b_0.storeAddress(src.deployer);
        b_0.storeAddress(src.jetton_wallet);
        b_0.storeUint(src.twab_timestamp, 64);
        b_0.storeUint(src.twab_amount, 128);
    };
}

export function loadInitDrawInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1013334560) { throw Error('Invalid prefix'); }
    let _deployer = sc_0.loadAddress();
    let _jetton_wallet = sc_0.loadAddress();
    let _twab_timestamp = sc_0.loadUintBig(64);
    let _twab_amount = sc_0.loadUintBig(128);
    return { $$type: 'InitDrawInternal' as const, deployer: _deployer, jetton_wallet: _jetton_wallet, twab_timestamp: _twab_timestamp, twab_amount: _twab_amount };
}

function loadTupleInitDrawInternal(source: TupleReader) {
    let _deployer = source.readAddress();
    let _jetton_wallet = source.readAddress();
    let _twab_timestamp = source.readBigNumber();
    let _twab_amount = source.readBigNumber();
    return { $$type: 'InitDrawInternal' as const, deployer: _deployer, jetton_wallet: _jetton_wallet, twab_timestamp: _twab_timestamp, twab_amount: _twab_amount };
}

function storeTupleInitDrawInternal(source: InitDrawInternal) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.deployer);
    builder.writeAddress(source.jetton_wallet);
    builder.writeNumber(source.twab_timestamp);
    builder.writeNumber(source.twab_amount);
    return builder.build();
}

function dictValueParserInitDrawInternal(): DictionaryValue<InitDrawInternal> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeInitDrawInternal(src)).endCell());
        },
        parse: (src) => {
            return loadInitDrawInternal(src.loadRef().beginParse());
        }
    }
}

export type InitTicket = {
    $$type: 'InitTicket';
    pool_account: Address;
}

export function storeInitTicket(src: InitTicket) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2494876497, 32);
        b_0.storeAddress(src.pool_account);
    };
}

export function loadInitTicket(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2494876497) { throw Error('Invalid prefix'); }
    let _pool_account = sc_0.loadAddress();
    return { $$type: 'InitTicket' as const, pool_account: _pool_account };
}

function loadTupleInitTicket(source: TupleReader) {
    let _pool_account = source.readAddress();
    return { $$type: 'InitTicket' as const, pool_account: _pool_account };
}

function storeTupleInitTicket(source: InitTicket) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.pool_account);
    return builder.build();
}

function dictValueParserInitTicket(): DictionaryValue<InitTicket> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeInitTicket(src)).endCell());
        },
        parse: (src) => {
            return loadInitTicket(src.loadRef().beginParse());
        }
    }
}

export type ClaimPrizeInternal = {
    $$type: 'ClaimPrizeInternal';
    query_id: bigint;
    user: Address;
    pool_account: Address;
    pick_payload: Cell;
}

export function storeClaimPrizeInternal(src: ClaimPrizeInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1469963099, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.user);
        b_0.storeAddress(src.pool_account);
        b_0.storeBuilder(src.pick_payload.asBuilder());
    };
}

export function loadClaimPrizeInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1469963099) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _user = sc_0.loadAddress();
    let _pool_account = sc_0.loadAddress();
    let _pick_payload = sc_0.asCell();
    return { $$type: 'ClaimPrizeInternal' as const, query_id: _query_id, user: _user, pool_account: _pool_account, pick_payload: _pick_payload };
}

function loadTupleClaimPrizeInternal(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _user = source.readAddress();
    let _pool_account = source.readAddress();
    let _pick_payload = source.readCell();
    return { $$type: 'ClaimPrizeInternal' as const, query_id: _query_id, user: _user, pool_account: _pool_account, pick_payload: _pick_payload };
}

function storeTupleClaimPrizeInternal(source: ClaimPrizeInternal) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.user);
    builder.writeAddress(source.pool_account);
    builder.writeSlice(source.pick_payload);
    return builder.build();
}

function dictValueParserClaimPrizeInternal(): DictionaryValue<ClaimPrizeInternal> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeClaimPrizeInternal(src)).endCell());
        },
        parse: (src) => {
            return loadClaimPrizeInternal(src.loadRef().beginParse());
        }
    }
}

export type InitTicketInternal2 = {
    $$type: 'InitTicketInternal2';
    draw_avg_balance: bigint;
    user_avg_balance: bigint;
}

export function storeInitTicketInternal2(src: InitTicketInternal2) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(898493778, 32);
        b_0.storeCoins(src.draw_avg_balance);
        b_0.storeCoins(src.user_avg_balance);
    };
}

export function loadInitTicketInternal2(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 898493778) { throw Error('Invalid prefix'); }
    let _draw_avg_balance = sc_0.loadCoins();
    let _user_avg_balance = sc_0.loadCoins();
    return { $$type: 'InitTicketInternal2' as const, draw_avg_balance: _draw_avg_balance, user_avg_balance: _user_avg_balance };
}

function loadTupleInitTicketInternal2(source: TupleReader) {
    let _draw_avg_balance = source.readBigNumber();
    let _user_avg_balance = source.readBigNumber();
    return { $$type: 'InitTicketInternal2' as const, draw_avg_balance: _draw_avg_balance, user_avg_balance: _user_avg_balance };
}

function storeTupleInitTicketInternal2(source: InitTicketInternal2) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.draw_avg_balance);
    builder.writeNumber(source.user_avg_balance);
    return builder.build();
}

function dictValueParserInitTicketInternal2(): DictionaryValue<InitTicketInternal2> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeInitTicketInternal2(src)).endCell());
        },
        parse: (src) => {
            return loadInitTicketInternal2(src.loadRef().beginParse());
        }
    }
}

export type PayPrizeDebtInternal = {
    $$type: 'PayPrizeDebtInternal';
    user: Address;
    amount: bigint;
}

export function storePayPrizeDebtInternal(src: PayPrizeDebtInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1506985886, 32);
        b_0.storeAddress(src.user);
        b_0.storeCoins(src.amount);
    };
}

export function loadPayPrizeDebtInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1506985886) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _amount = sc_0.loadCoins();
    return { $$type: 'PayPrizeDebtInternal' as const, user: _user, amount: _amount };
}

function loadTuplePayPrizeDebtInternal(source: TupleReader) {
    let _user = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'PayPrizeDebtInternal' as const, user: _user, amount: _amount };
}

function storeTuplePayPrizeDebtInternal(source: PayPrizeDebtInternal) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserPayPrizeDebtInternal(): DictionaryValue<PayPrizeDebtInternal> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePayPrizeDebtInternal(src)).endCell());
        },
        parse: (src) => {
            return loadPayPrizeDebtInternal(src.loadRef().beginParse());
        }
    }
}

export type ClaimPrize = {
    $$type: 'ClaimPrize';
    query_id: bigint;
    index_payload: Cell;
}

export function storeClaimPrize(src: ClaimPrize) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(5212376, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeBuilder(src.index_payload.asBuilder());
    };
}

export function loadClaimPrize(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 5212376) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _index_payload = sc_0.asCell();
    return { $$type: 'ClaimPrize' as const, query_id: _query_id, index_payload: _index_payload };
}

function loadTupleClaimPrize(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _index_payload = source.readCell();
    return { $$type: 'ClaimPrize' as const, query_id: _query_id, index_payload: _index_payload };
}

function storeTupleClaimPrize(source: ClaimPrize) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeSlice(source.index_payload);
    return builder.build();
}

function dictValueParserClaimPrize(): DictionaryValue<ClaimPrize> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeClaimPrize(src)).endCell());
        },
        parse: (src) => {
            return loadClaimPrize(src.loadRef().beginParse());
        }
    }
}

export type ClaimPrizeDebt = {
    $$type: 'ClaimPrizeDebt';
    query_id: bigint;
    amount: bigint;
    reserve: Address;
}

export function storeClaimPrizeDebt(src: ClaimPrizeDebt) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3860707243, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.reserve);
    };
}

export function loadClaimPrizeDebt(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3860707243) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _reserve = sc_0.loadAddress();
    return { $$type: 'ClaimPrizeDebt' as const, query_id: _query_id, amount: _amount, reserve: _reserve };
}

function loadTupleClaimPrizeDebt(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _reserve = source.readAddress();
    return { $$type: 'ClaimPrizeDebt' as const, query_id: _query_id, amount: _amount, reserve: _reserve };
}

function storeTupleClaimPrizeDebt(source: ClaimPrizeDebt) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.reserve);
    return builder.build();
}

function dictValueParserClaimPrizeDebt(): DictionaryValue<ClaimPrizeDebt> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeClaimPrizeDebt(src)).endCell());
        },
        parse: (src) => {
            return loadClaimPrizeDebt(src.loadRef().beginParse());
        }
    }
}

export type ClaimPrizeDebtInternal = {
    $$type: 'ClaimPrizeDebtInternal';
    query_id: bigint;
    user: Address;
    draw: Address;
    period: bigint;
    amount: bigint;
}

export function storeClaimPrizeDebtInternal(src: ClaimPrizeDebtInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3759136416, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.user);
        b_0.storeAddress(src.draw);
        b_0.storeUint(src.period, 32);
        b_0.storeCoins(src.amount);
    };
}

export function loadClaimPrizeDebtInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3759136416) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _user = sc_0.loadAddress();
    let _draw = sc_0.loadAddress();
    let _period = sc_0.loadUintBig(32);
    let _amount = sc_0.loadCoins();
    return { $$type: 'ClaimPrizeDebtInternal' as const, query_id: _query_id, user: _user, draw: _draw, period: _period, amount: _amount };
}

function loadTupleClaimPrizeDebtInternal(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _user = source.readAddress();
    let _draw = source.readAddress();
    let _period = source.readBigNumber();
    let _amount = source.readBigNumber();
    return { $$type: 'ClaimPrizeDebtInternal' as const, query_id: _query_id, user: _user, draw: _draw, period: _period, amount: _amount };
}

function storeTupleClaimPrizeDebtInternal(source: ClaimPrizeDebtInternal) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.user);
    builder.writeAddress(source.draw);
    builder.writeNumber(source.period);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserClaimPrizeDebtInternal(): DictionaryValue<ClaimPrizeDebtInternal> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeClaimPrizeDebtInternal(src)).endCell());
        },
        parse: (src) => {
            return loadClaimPrizeDebtInternal(src.loadRef().beginParse());
        }
    }
}

export type PoolMasterData = {
    $$type: 'PoolMasterData';
    owner: Address;
    staker: Address;
    prize_reserve: Address;
    twab: Twab;
    share_amount: bigint;
    contribute_amount: bigint;
    spent_amount: bigint;
    next_period: bigint;
}

export function storePoolMasterData(src: PoolMasterData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.staker);
        b_0.storeAddress(src.prize_reserve);
        b_0.store(storeTwab(src.twab));
        let b_1 = new Builder();
        b_1.storeCoins(src.share_amount);
        b_1.storeCoins(src.contribute_amount);
        b_1.storeCoins(src.spent_amount);
        b_1.storeUint(src.next_period, 32);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPoolMasterData(slice: Slice) {
    let sc_0 = slice;
    let _owner = sc_0.loadAddress();
    let _staker = sc_0.loadAddress();
    let _prize_reserve = sc_0.loadAddress();
    let _twab = loadTwab(sc_0);
    let sc_1 = sc_0.loadRef().beginParse();
    let _share_amount = sc_1.loadCoins();
    let _contribute_amount = sc_1.loadCoins();
    let _spent_amount = sc_1.loadCoins();
    let _next_period = sc_1.loadUintBig(32);
    return { $$type: 'PoolMasterData' as const, owner: _owner, staker: _staker, prize_reserve: _prize_reserve, twab: _twab, share_amount: _share_amount, contribute_amount: _contribute_amount, spent_amount: _spent_amount, next_period: _next_period };
}

function loadTuplePoolMasterData(source: TupleReader) {
    let _owner = source.readAddress();
    let _staker = source.readAddress();
    let _prize_reserve = source.readAddress();
    const _twab = loadTupleTwab(source.readTuple());
    let _share_amount = source.readBigNumber();
    let _contribute_amount = source.readBigNumber();
    let _spent_amount = source.readBigNumber();
    let _next_period = source.readBigNumber();
    return { $$type: 'PoolMasterData' as const, owner: _owner, staker: _staker, prize_reserve: _prize_reserve, twab: _twab, share_amount: _share_amount, contribute_amount: _contribute_amount, spent_amount: _spent_amount, next_period: _next_period };
}

function storeTuplePoolMasterData(source: PoolMasterData) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.staker);
    builder.writeAddress(source.prize_reserve);
    builder.writeTuple(storeTupleTwab(source.twab));
    builder.writeNumber(source.share_amount);
    builder.writeNumber(source.contribute_amount);
    builder.writeNumber(source.spent_amount);
    builder.writeNumber(source.next_period);
    return builder.build();
}

function dictValueParserPoolMasterData(): DictionaryValue<PoolMasterData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePoolMasterData(src)).endCell());
        },
        parse: (src) => {
            return loadPoolMasterData(src.loadRef().beginParse());
        }
    }
}

export type PoolAccountData = {
    $$type: 'PoolAccountData';
    owner: Address;
    master: Address;
    staker: Address;
    reserve: Address;
    jetton_wallet: Address;
    share_amount: bigint;
    contribute_amount: bigint;
    withdraw_amount: bigint;
}

export function storePoolAccountData(src: PoolAccountData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.master);
        b_0.storeAddress(src.staker);
        let b_1 = new Builder();
        b_1.storeAddress(src.reserve);
        b_1.storeAddress(src.jetton_wallet);
        b_1.storeCoins(src.share_amount);
        b_1.storeCoins(src.contribute_amount);
        b_1.storeCoins(src.withdraw_amount);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPoolAccountData(slice: Slice) {
    let sc_0 = slice;
    let _owner = sc_0.loadAddress();
    let _master = sc_0.loadAddress();
    let _staker = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _reserve = sc_1.loadAddress();
    let _jetton_wallet = sc_1.loadAddress();
    let _share_amount = sc_1.loadCoins();
    let _contribute_amount = sc_1.loadCoins();
    let _withdraw_amount = sc_1.loadCoins();
    return { $$type: 'PoolAccountData' as const, owner: _owner, master: _master, staker: _staker, reserve: _reserve, jetton_wallet: _jetton_wallet, share_amount: _share_amount, contribute_amount: _contribute_amount, withdraw_amount: _withdraw_amount };
}

function loadTuplePoolAccountData(source: TupleReader) {
    let _owner = source.readAddress();
    let _master = source.readAddress();
    let _staker = source.readAddress();
    let _reserve = source.readAddress();
    let _jetton_wallet = source.readAddress();
    let _share_amount = source.readBigNumber();
    let _contribute_amount = source.readBigNumber();
    let _withdraw_amount = source.readBigNumber();
    return { $$type: 'PoolAccountData' as const, owner: _owner, master: _master, staker: _staker, reserve: _reserve, jetton_wallet: _jetton_wallet, share_amount: _share_amount, contribute_amount: _contribute_amount, withdraw_amount: _withdraw_amount };
}

function storeTuplePoolAccountData(source: PoolAccountData) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.master);
    builder.writeAddress(source.staker);
    builder.writeAddress(source.reserve);
    builder.writeAddress(source.jetton_wallet);
    builder.writeNumber(source.share_amount);
    builder.writeNumber(source.contribute_amount);
    builder.writeNumber(source.withdraw_amount);
    return builder.build();
}

function dictValueParserPoolAccountData(): DictionaryValue<PoolAccountData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePoolAccountData(src)).endCell());
        },
        parse: (src) => {
            return loadPoolAccountData(src.loadRef().beginParse());
        }
    }
}

export type DrawData = {
    $$type: 'DrawData';
    active: boolean;
    pool_master: Address;
    prize_reserve: Address;
    jetton_wallet: Address;
    period: bigint;
    start: Twab;
    end: Twab;
    prize_amount: bigint;
    winning_number: bigint;
    deadline: bigint;
    avail_prize_amount: bigint;
}

export function storeDrawData(src: DrawData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.active);
        b_0.storeAddress(src.pool_master);
        b_0.storeAddress(src.prize_reserve);
        b_0.storeAddress(src.jetton_wallet);
        b_0.storeUint(src.period, 32);
        let b_1 = new Builder();
        b_1.store(storeTwab(src.start));
        b_1.store(storeTwab(src.end));
        b_1.storeCoins(src.prize_amount);
        b_1.storeUint(src.winning_number, 32);
        b_1.storeUint(src.deadline, 64);
        b_1.storeCoins(src.avail_prize_amount);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadDrawData(slice: Slice) {
    let sc_0 = slice;
    let _active = sc_0.loadBit();
    let _pool_master = sc_0.loadAddress();
    let _prize_reserve = sc_0.loadAddress();
    let _jetton_wallet = sc_0.loadAddress();
    let _period = sc_0.loadUintBig(32);
    let sc_1 = sc_0.loadRef().beginParse();
    let _start = loadTwab(sc_1);
    let _end = loadTwab(sc_1);
    let _prize_amount = sc_1.loadCoins();
    let _winning_number = sc_1.loadUintBig(32);
    let _deadline = sc_1.loadUintBig(64);
    let _avail_prize_amount = sc_1.loadCoins();
    return { $$type: 'DrawData' as const, active: _active, pool_master: _pool_master, prize_reserve: _prize_reserve, jetton_wallet: _jetton_wallet, period: _period, start: _start, end: _end, prize_amount: _prize_amount, winning_number: _winning_number, deadline: _deadline, avail_prize_amount: _avail_prize_amount };
}

function loadTupleDrawData(source: TupleReader) {
    let _active = source.readBoolean();
    let _pool_master = source.readAddress();
    let _prize_reserve = source.readAddress();
    let _jetton_wallet = source.readAddress();
    let _period = source.readBigNumber();
    const _start = loadTupleTwab(source.readTuple());
    const _end = loadTupleTwab(source.readTuple());
    let _prize_amount = source.readBigNumber();
    let _winning_number = source.readBigNumber();
    let _deadline = source.readBigNumber();
    let _avail_prize_amount = source.readBigNumber();
    return { $$type: 'DrawData' as const, active: _active, pool_master: _pool_master, prize_reserve: _prize_reserve, jetton_wallet: _jetton_wallet, period: _period, start: _start, end: _end, prize_amount: _prize_amount, winning_number: _winning_number, deadline: _deadline, avail_prize_amount: _avail_prize_amount };
}

function storeTupleDrawData(source: DrawData) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.active);
    builder.writeAddress(source.pool_master);
    builder.writeAddress(source.prize_reserve);
    builder.writeAddress(source.jetton_wallet);
    builder.writeNumber(source.period);
    builder.writeTuple(storeTupleTwab(source.start));
    builder.writeTuple(storeTupleTwab(source.end));
    builder.writeNumber(source.prize_amount);
    builder.writeNumber(source.winning_number);
    builder.writeNumber(source.deadline);
    builder.writeNumber(source.avail_prize_amount);
    return builder.build();
}

function dictValueParserDrawData(): DictionaryValue<DrawData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDrawData(src)).endCell());
        },
        parse: (src) => {
            return loadDrawData(src.loadRef().beginParse());
        }
    }
}

export type TicketData = {
    $$type: 'TicketData';
    active: boolean;
    owner: Address;
    pool_account: Address;
    draw: Address;
    period: bigint;
    picks: bigint;
    debt_amount: bigint;
}

export function storeTicketData(src: TicketData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.active);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.pool_account);
        b_0.storeAddress(src.draw);
        b_0.storeUint(src.period, 32);
        b_0.storeUint(src.picks, 32);
        b_0.storeCoins(src.debt_amount);
    };
}

export function loadTicketData(slice: Slice) {
    let sc_0 = slice;
    let _active = sc_0.loadBit();
    let _owner = sc_0.loadAddress();
    let _pool_account = sc_0.loadAddress();
    let _draw = sc_0.loadAddress();
    let _period = sc_0.loadUintBig(32);
    let _picks = sc_0.loadUintBig(32);
    let _debt_amount = sc_0.loadCoins();
    return { $$type: 'TicketData' as const, active: _active, owner: _owner, pool_account: _pool_account, draw: _draw, period: _period, picks: _picks, debt_amount: _debt_amount };
}

function loadTupleTicketData(source: TupleReader) {
    let _active = source.readBoolean();
    let _owner = source.readAddress();
    let _pool_account = source.readAddress();
    let _draw = source.readAddress();
    let _period = source.readBigNumber();
    let _picks = source.readBigNumber();
    let _debt_amount = source.readBigNumber();
    return { $$type: 'TicketData' as const, active: _active, owner: _owner, pool_account: _pool_account, draw: _draw, period: _period, picks: _picks, debt_amount: _debt_amount };
}

function storeTupleTicketData(source: TicketData) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.active);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.pool_account);
    builder.writeAddress(source.draw);
    builder.writeNumber(source.period);
    builder.writeNumber(source.picks);
    builder.writeNumber(source.debt_amount);
    return builder.build();
}

function dictValueParserTicketData(): DictionaryValue<TicketData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTicketData(src)).endCell());
        },
        parse: (src) => {
            return loadTicketData(src.loadRef().beginParse());
        }
    }
}

export type PrizeReserveData = {
    $$type: 'PrizeReserveData';
    jetton_wallet: Address;
    pool_master: Address;
    staker: Address;
}

export function storePrizeReserveData(src: PrizeReserveData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.jetton_wallet);
        b_0.storeAddress(src.pool_master);
        b_0.storeAddress(src.staker);
    };
}

export function loadPrizeReserveData(slice: Slice) {
    let sc_0 = slice;
    let _jetton_wallet = sc_0.loadAddress();
    let _pool_master = sc_0.loadAddress();
    let _staker = sc_0.loadAddress();
    return { $$type: 'PrizeReserveData' as const, jetton_wallet: _jetton_wallet, pool_master: _pool_master, staker: _staker };
}

function loadTuplePrizeReserveData(source: TupleReader) {
    let _jetton_wallet = source.readAddress();
    let _pool_master = source.readAddress();
    let _staker = source.readAddress();
    return { $$type: 'PrizeReserveData' as const, jetton_wallet: _jetton_wallet, pool_master: _pool_master, staker: _staker };
}

function storeTuplePrizeReserveData(source: PrizeReserveData) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.jetton_wallet);
    builder.writeAddress(source.pool_master);
    builder.writeAddress(source.staker);
    return builder.build();
}

function dictValueParserPrizeReserveData(): DictionaryValue<PrizeReserveData> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePrizeReserveData(src)).endCell());
        },
        parse: (src) => {
            return loadPrizeReserveData(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

 type PoolAccount_init_args = {
    $$type: 'PoolAccount_init_args';
    owner: Address;
    master: Address;
    staker: Address;
    reserve: Address;
}

function initPoolAccount_init_args(src: PoolAccount_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.master);
        b_0.storeAddress(src.staker);
        let b_1 = new Builder();
        b_1.storeAddress(src.reserve);
        b_0.storeRef(b_1.endCell());
    };
}

async function PoolAccount_init(owner: Address, master: Address, staker: Address, reserve: Address) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initPoolAccount_init_args({ $$type: 'PoolAccount_init_args', owner, master, staker, reserve })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const PoolAccount_errors: { [key: number]: { message: string } } = {
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
    2805: { message: `Insufficient value` },
    3012: { message: `Invalid deposit amount` },
    3556: { message: `Draw not initialized` },
    4429: { message: `Invalid sender` },
    6571: { message: `Draw is not over` },
    6682: { message: `Query id not exists` },
    7189: { message: `Zero amount` },
    13788: { message: `Invalid pick size` },
    16022: { message: `Insufficient picks` },
    16960: { message: `Invalid claim amount` },
    19074: { message: `Empty twab store` },
    19317: { message: `Invalid timestamp` },
    27055: { message: `No available prize` },
    27196: { message: `Invalid pool account` },
    30919: { message: `Ticket is active` },
    31206: { message: `Start time >= End time` },
    41207: { message: `invalid sender` },
    46439: { message: `Invalid withdraw amount` },
    47849: { message: `Draw is over` },
    49516: { message: `Ticket is inactive` },
    53347: { message: `Draw is initialized` },
    54665: { message: `Draw is inactive` },
    55483: { message: `Invalid tier` },
    58059: { message: `Query id used` },
    60931: { message: `Pick is used` },
}

const PoolAccount_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Twab","header":null,"fields":[{"name":"timestamp","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":128}}]},
    {"name":"TwabStore","header":null,"fields":[{"name":"store","type":{"kind":"dict","key":"int","value":"Twab","valueFormat":"ref"}},{"name":"size","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DepositInStaker","header":1205158801,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"StakerWithdrawal","header":175592284,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"TokenNotification","header":1935855772,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenExcesses","header":3576854235,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"TokenTransfer","header":260734629,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TokenBurn","header":1499400124,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"SetPrize","header":3546560533,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"WithdrawInternal","header":2498498580,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"withdraw_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"acc_contribute_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"acc_withdraw_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"WithdrawFinishInternal","header":2966263530,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"timestamp","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"DepositNotify","header":472802433,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"timestamp","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"share_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"contribute_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"WithdrawNotify","header":3746789257,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"timestamp","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"share_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"InitPoolAccountInternal","header":948467383,"fields":[{"name":"jetton_wallet","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"InitTicketInternal1","header":3056927071,"fields":[{"name":"period","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"start","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"end","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"avg_balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"Deposit","header":2729222253,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"Withdraw","header":3383805122,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"InitDrawInternal","header":1013334560,"fields":[{"name":"deployer","type":{"kind":"simple","type":"address","optional":false}},{"name":"jetton_wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"twab_timestamp","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"twab_amount","type":{"kind":"simple","type":"uint","optional":false,"format":128}}]},
    {"name":"InitTicket","header":2494876497,"fields":[{"name":"pool_account","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ClaimPrizeInternal","header":1469963099,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"pool_account","type":{"kind":"simple","type":"address","optional":false}},{"name":"pick_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"InitTicketInternal2","header":898493778,"fields":[{"name":"draw_avg_balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"user_avg_balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"PayPrizeDebtInternal","header":1506985886,"fields":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"ClaimPrize","header":5212376,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"index_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"ClaimPrizeDebt","header":3860707243,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"reserve","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ClaimPrizeDebtInternal","header":3759136416,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"draw","type":{"kind":"simple","type":"address","optional":false}},{"name":"period","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"PoolMasterData","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"staker","type":{"kind":"simple","type":"address","optional":false}},{"name":"prize_reserve","type":{"kind":"simple","type":"address","optional":false}},{"name":"twab","type":{"kind":"simple","type":"Twab","optional":false}},{"name":"share_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"contribute_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"spent_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"next_period","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"PoolAccountData","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"master","type":{"kind":"simple","type":"address","optional":false}},{"name":"staker","type":{"kind":"simple","type":"address","optional":false}},{"name":"reserve","type":{"kind":"simple","type":"address","optional":false}},{"name":"jetton_wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"share_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"contribute_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"withdraw_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"DrawData","header":null,"fields":[{"name":"active","type":{"kind":"simple","type":"bool","optional":false}},{"name":"pool_master","type":{"kind":"simple","type":"address","optional":false}},{"name":"prize_reserve","type":{"kind":"simple","type":"address","optional":false}},{"name":"jetton_wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"period","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"start","type":{"kind":"simple","type":"Twab","optional":false}},{"name":"end","type":{"kind":"simple","type":"Twab","optional":false}},{"name":"prize_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"winning_number","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"deadline","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"avail_prize_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"TicketData","header":null,"fields":[{"name":"active","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"pool_account","type":{"kind":"simple","type":"address","optional":false}},{"name":"draw","type":{"kind":"simple","type":"address","optional":false}},{"name":"period","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"picks","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"debt_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"PrizeReserveData","header":null,"fields":[{"name":"jetton_wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"pool_master","type":{"kind":"simple","type":"address","optional":false}},{"name":"staker","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
]

const PoolAccount_getters: ABIGetter[] = [
    {"name":"get_core_data","arguments":[],"returnType":{"kind":"simple","type":"PoolAccountData","optional":false}},
    {"name":"get_draw_code","arguments":[{"name":"period","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"cell","optional":false}},
    {"name":"get_ticket_code","arguments":[{"name":"period","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"cell","optional":false}},
    {"name":"get_draw_address","arguments":[{"name":"period","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"get_ticket_address","arguments":[{"name":"period","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"get_deposit_cache","arguments":[{"name":"query_id","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"int","optional":true,"format":257}},
    {"name":"get_twab_size","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"binary_search_twab","arguments":[{"name":"timestamp","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"Twab","optional":false}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const PoolAccount_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"TokenNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"InitTicketInternal1"}},
    {"receiver":"internal","message":{"kind":"typed","type":"StakerWithdrawal"}},
    {"receiver":"internal","message":{"kind":"typed","type":"InitPoolAccountInternal"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deposit"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Withdraw"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class PoolAccount implements Contract {
    
    static async init(owner: Address, master: Address, staker: Address, reserve: Address) {
        return await PoolAccount_init(owner, master, staker, reserve);
    }
    
    static async fromInit(owner: Address, master: Address, staker: Address, reserve: Address) {
        const init = await PoolAccount_init(owner, master, staker, reserve);
        const address = contractAddress(0, init);
        return new PoolAccount(address, init);
    }
    
    static fromAddress(address: Address) {
        return new PoolAccount(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  PoolAccount_types,
        getters: PoolAccount_getters,
        receivers: PoolAccount_receivers,
        errors: PoolAccount_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: TokenNotification | InitTicketInternal1 | StakerWithdrawal | InitPoolAccountInternal | Deposit | Withdraw | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenNotification') {
            body = beginCell().store(storeTokenNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'InitTicketInternal1') {
            body = beginCell().store(storeInitTicketInternal1(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'StakerWithdrawal') {
            body = beginCell().store(storeStakerWithdrawal(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'InitPoolAccountInternal') {
            body = beginCell().store(storeInitPoolAccountInternal(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deposit') {
            body = beginCell().store(storeDeposit(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Withdraw') {
            body = beginCell().store(storeWithdraw(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetCoreData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_core_data', builder.build())).stack;
        const result = loadTuplePoolAccountData(source);
        return result;
    }
    
    async getGetDrawCode(provider: ContractProvider, period: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(period);
        let source = (await provider.get('get_draw_code', builder.build())).stack;
        let result = source.readCell();
        return result;
    }
    
    async getGetTicketCode(provider: ContractProvider, period: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(period);
        let source = (await provider.get('get_ticket_code', builder.build())).stack;
        let result = source.readCell();
        return result;
    }
    
    async getGetDrawAddress(provider: ContractProvider, period: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(period);
        let source = (await provider.get('get_draw_address', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getGetTicketAddress(provider: ContractProvider, period: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(period);
        let source = (await provider.get('get_ticket_address', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getGetDepositCache(provider: ContractProvider, query_id: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(query_id);
        let source = (await provider.get('get_deposit_cache', builder.build())).stack;
        let result = source.readBigNumberOpt();
        return result;
    }
    
    async getGetTwabSize(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_twab_size', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getBinarySearchTwab(provider: ContractProvider, timestamp: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(timestamp);
        let source = (await provider.get('binary_search_twab', builder.build())).stack;
        const result = loadTupleTwab(source);
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}