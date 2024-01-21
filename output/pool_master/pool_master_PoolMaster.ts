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
} from 'ton-core';

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

export type PoolMasterData = {
    $$type: 'PoolMasterData';
    owner: Address;
    staker: Address;
    reserve: Address;
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
        b_0.storeAddress(src.reserve);
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
    let _reserve = sc_0.loadAddress();
    let _twab = loadTwab(sc_0);
    let sc_1 = sc_0.loadRef().beginParse();
    let _share_amount = sc_1.loadCoins();
    let _contribute_amount = sc_1.loadCoins();
    let _spent_amount = sc_1.loadCoins();
    let _next_period = sc_1.loadUintBig(32);
    return { $$type: 'PoolMasterData' as const, owner: _owner, staker: _staker, reserve: _reserve, twab: _twab, share_amount: _share_amount, contribute_amount: _contribute_amount, spent_amount: _spent_amount, next_period: _next_period };
}

function loadTuplePoolMasterData(source: TupleReader) {
    let _owner = source.readAddress();
    let _staker = source.readAddress();
    let _reserve = source.readAddress();
    const _twab = loadTupleTwab(source.readTuple());
    let _share_amount = source.readBigNumber();
    let _contribute_amount = source.readBigNumber();
    let _spent_amount = source.readBigNumber();
    let _next_period = source.readBigNumber();
    return { $$type: 'PoolMasterData' as const, owner: _owner, staker: _staker, reserve: _reserve, twab: _twab, share_amount: _share_amount, contribute_amount: _contribute_amount, spent_amount: _spent_amount, next_period: _next_period };
}

function storeTuplePoolMasterData(source: PoolMasterData) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.staker);
    builder.writeAddress(source.reserve);
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

 type PoolMaster_init_args = {
    $$type: 'PoolMaster_init_args';
    owner: Address;
    staker: Address;
    jetton_master: Address;
    jetton_wallet_code: Cell;
}

function initPoolMaster_init_args(src: PoolMaster_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.staker);
        b_0.storeAddress(src.jetton_master);
        b_0.storeRef(src.jetton_wallet_code);
    };
}

async function PoolMaster_init(owner: Address, staker: Address, jetton_master: Address, jetton_wallet_code: Cell) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initPoolMaster_init_args({ $$type: 'PoolMaster_init_args', owner, staker, jetton_master, jetton_wallet_code })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const PoolMaster_errors: { [key: number]: { message: string } } = {
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

const PoolMaster_types: ABIType[] = [
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
    {"name":"DrawData","header":null,"fields":[{"name":"active","type":{"kind":"simple","type":"bool","optional":false}},{"name":"pool_master","type":{"kind":"simple","type":"address","optional":false}},{"name":"prize_reserve","type":{"kind":"simple","type":"address","optional":false}},{"name":"jetton_wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"period","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"start","type":{"kind":"simple","type":"Twab","optional":false}},{"name":"end","type":{"kind":"simple","type":"Twab","optional":false}},{"name":"prize_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"winning_number","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"deadline","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"avail_prize_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"PoolAccountData","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"master","type":{"kind":"simple","type":"address","optional":false}},{"name":"staker","type":{"kind":"simple","type":"address","optional":false}},{"name":"reserve","type":{"kind":"simple","type":"address","optional":false}},{"name":"jetton_wallet","type":{"kind":"simple","type":"address","optional":false}},{"name":"share_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"contribute_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"withdraw_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"TicketData","header":null,"fields":[{"name":"active","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"pool_account","type":{"kind":"simple","type":"address","optional":false}},{"name":"draw","type":{"kind":"simple","type":"address","optional":false}},{"name":"period","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"picks","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"debt_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"PoolMasterData","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"staker","type":{"kind":"simple","type":"address","optional":false}},{"name":"reserve","type":{"kind":"simple","type":"address","optional":false}},{"name":"twab","type":{"kind":"simple","type":"Twab","optional":false}},{"name":"share_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"contribute_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"spent_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"next_period","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
]

const PoolMaster_getters: ABIGetter[] = [
    {"name":"get_core_data","arguments":[],"returnType":{"kind":"simple","type":"PoolMasterData","optional":false}},
    {"name":"get_account_code","arguments":[],"returnType":{"kind":"simple","type":"cell","optional":false}},
    {"name":"get_account_address","arguments":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"get_draw_address","arguments":[{"name":"period","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const PoolMaster_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"TokenNotification"}},
    {"receiver":"internal","message":{"kind":"text","text":"init draw"}},
    {"receiver":"internal","message":{"kind":"text","text":"init account"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetPrize"}},
    {"receiver":"internal","message":{"kind":"typed","type":"WithdrawInternal"}},
    {"receiver":"internal","message":{"kind":"typed","type":"WithdrawFinishInternal"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeOwner"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class PoolMaster implements Contract {
    
    static async init(owner: Address, staker: Address, jetton_master: Address, jetton_wallet_code: Cell) {
        return await PoolMaster_init(owner, staker, jetton_master, jetton_wallet_code);
    }
    
    static async fromInit(owner: Address, staker: Address, jetton_master: Address, jetton_wallet_code: Cell) {
        const init = await PoolMaster_init(owner, staker, jetton_master, jetton_wallet_code);
        const address = contractAddress(0, init);
        return new PoolMaster(address, init);
    }
    
    static fromAddress(address: Address) {
        return new PoolMaster(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  PoolMaster_types,
        getters: PoolMaster_getters,
        receivers: PoolMaster_receivers,
        errors: PoolMaster_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: TokenNotification | 'init draw' | 'init account' | SetPrize | WithdrawInternal | WithdrawFinishInternal | ChangeOwner | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TokenNotification') {
            body = beginCell().store(storeTokenNotification(message)).endCell();
        }
        if (message === 'init draw') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'init account') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetPrize') {
            body = beginCell().store(storeSetPrize(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawInternal') {
            body = beginCell().store(storeWithdrawInternal(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawFinishInternal') {
            body = beginCell().store(storeWithdrawFinishInternal(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ChangeOwner') {
            body = beginCell().store(storeChangeOwner(message)).endCell();
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
        const result = loadTuplePoolMasterData(source);
        return result;
    }
    
    async getGetAccountCode(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_account_code', builder.build())).stack;
        let result = source.readCell();
        return result;
    }
    
    async getGetAccountAddress(provider: ContractProvider, user: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(user);
        let source = (await provider.get('get_account_address', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getGetDrawAddress(provider: ContractProvider, period: bigint) {
        let builder = new TupleBuilder();
        builder.writeNumber(period);
        let source = (await provider.get('get_draw_address', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
}