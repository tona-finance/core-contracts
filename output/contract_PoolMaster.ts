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

export type DepositInternal = {
    $$type: 'DepositInternal';
    amount: bigint;
    user: Address;
}

export function storeDepositInternal(src: DepositInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2706550035, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.user);
    };
}

export function loadDepositInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2706550035) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _user = sc_0.loadAddress();
    return { $$type: 'DepositInternal' as const, amount: _amount, user: _user };
}

function loadTupleDepositInternal(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _user = source.readAddress();
    return { $$type: 'DepositInternal' as const, amount: _amount, user: _user };
}

function storeTupleDepositInternal(source: DepositInternal) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.user);
    return builder.build();
}

function dictValueParserDepositInternal(): DictionaryValue<DepositInternal> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDepositInternal(src)).endCell());
        },
        parse: (src) => {
            return loadDepositInternal(src.loadRef().beginParse());
        }
    }
}

export type WithdrawInternal = {
    $$type: 'WithdrawInternal';
    amount: bigint;
    user: Address;
}

export function storeWithdrawInternal(src: WithdrawInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4279924659, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.user);
    };
}

export function loadWithdrawInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4279924659) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _user = sc_0.loadAddress();
    return { $$type: 'WithdrawInternal' as const, amount: _amount, user: _user };
}

function loadTupleWithdrawInternal(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _user = source.readAddress();
    return { $$type: 'WithdrawInternal' as const, amount: _amount, user: _user };
}

function storeTupleWithdrawInternal(source: WithdrawInternal) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.user);
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

export type Borrow = {
    $$type: 'Borrow';
    amount: bigint;
}

export function storeBorrow(src: Borrow) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1154673471, 32);
        b_0.storeCoins(src.amount);
    };
}

export function loadBorrow(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1154673471) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    return { $$type: 'Borrow' as const, amount: _amount };
}

function loadTupleBorrow(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'Borrow' as const, amount: _amount };
}

function storeTupleBorrow(source: Borrow) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserBorrow(): DictionaryValue<Borrow> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeBorrow(src)).endCell());
        },
        parse: (src) => {
            return loadBorrow(src.loadRef().beginParse());
        }
    }
}

export type Withdraw = {
    $$type: 'Withdraw';
    amount: bigint;
}

export function storeWithdraw(src: Withdraw) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(195467089, 32);
        b_0.storeCoins(src.amount);
    };
}

export function loadWithdraw(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 195467089) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    return { $$type: 'Withdraw' as const, amount: _amount };
}

function loadTupleWithdraw(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'Withdraw' as const, amount: _amount };
}

function storeTupleWithdraw(source: Withdraw) {
    let builder = new TupleBuilder();
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

export type DepositFinish = {
    $$type: 'DepositFinish';
    timestamp: bigint;
    amount: bigint;
}

export function storeDepositFinish(src: DepositFinish) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3488820906, 32);
        b_0.storeUint(src.timestamp, 64);
        b_0.storeCoins(src.amount);
    };
}

export function loadDepositFinish(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3488820906) { throw Error('Invalid prefix'); }
    let _timestamp = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    return { $$type: 'DepositFinish' as const, timestamp: _timestamp, amount: _amount };
}

function loadTupleDepositFinish(source: TupleReader) {
    let _timestamp = source.readBigNumber();
    let _amount = source.readBigNumber();
    return { $$type: 'DepositFinish' as const, timestamp: _timestamp, amount: _amount };
}

function storeTupleDepositFinish(source: DepositFinish) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.timestamp);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserDepositFinish(): DictionaryValue<DepositFinish> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDepositFinish(src)).endCell());
        },
        parse: (src) => {
            return loadDepositFinish(src.loadRef().beginParse());
        }
    }
}

export type WithdrawFinish = {
    $$type: 'WithdrawFinish';
    timestamp: bigint;
    amount: bigint;
}

export function storeWithdrawFinish(src: WithdrawFinish) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(339761243, 32);
        b_0.storeUint(src.timestamp, 64);
        b_0.storeCoins(src.amount);
    };
}

export function loadWithdrawFinish(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 339761243) { throw Error('Invalid prefix'); }
    let _timestamp = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    return { $$type: 'WithdrawFinish' as const, timestamp: _timestamp, amount: _amount };
}

function loadTupleWithdrawFinish(source: TupleReader) {
    let _timestamp = source.readBigNumber();
    let _amount = source.readBigNumber();
    return { $$type: 'WithdrawFinish' as const, timestamp: _timestamp, amount: _amount };
}

function storeTupleWithdrawFinish(source: WithdrawFinish) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.timestamp);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserWithdrawFinish(): DictionaryValue<WithdrawFinish> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeWithdrawFinish(src)).endCell());
        },
        parse: (src) => {
            return loadWithdrawFinish(src.loadRef().beginParse());
        }
    }
}

export type PrepareInitTicket = {
    $$type: 'PrepareInitTicket';
    period: bigint;
    start: bigint;
    end: bigint;
    avg_balance: bigint;
}

export function storePrepareInitTicket(src: PrepareInitTicket) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4247418329, 32);
        b_0.storeUint(src.period, 32);
        b_0.storeUint(src.start, 64);
        b_0.storeUint(src.end, 64);
        b_0.storeCoins(src.avg_balance);
    };
}

export function loadPrepareInitTicket(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4247418329) { throw Error('Invalid prefix'); }
    let _period = sc_0.loadUintBig(32);
    let _start = sc_0.loadUintBig(64);
    let _end = sc_0.loadUintBig(64);
    let _avg_balance = sc_0.loadCoins();
    return { $$type: 'PrepareInitTicket' as const, period: _period, start: _start, end: _end, avg_balance: _avg_balance };
}

function loadTuplePrepareInitTicket(source: TupleReader) {
    let _period = source.readBigNumber();
    let _start = source.readBigNumber();
    let _end = source.readBigNumber();
    let _avg_balance = source.readBigNumber();
    return { $$type: 'PrepareInitTicket' as const, period: _period, start: _start, end: _end, avg_balance: _avg_balance };
}

function storeTuplePrepareInitTicket(source: PrepareInitTicket) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.period);
    builder.writeNumber(source.start);
    builder.writeNumber(source.end);
    builder.writeNumber(source.avg_balance);
    return builder.build();
}

function dictValueParserPrepareInitTicket(): DictionaryValue<PrepareInitTicket> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storePrepareInitTicket(src)).endCell());
        },
        parse: (src) => {
            return loadPrepareInitTicket(src.loadRef().beginParse());
        }
    }
}

export type InitDraw = {
    $$type: 'InitDraw';
    twab_timestamp: bigint;
    twab_amount: bigint;
    refund_address: Address;
}

export function storeInitDraw(src: InitDraw) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3109422989, 32);
        b_0.storeUint(src.twab_timestamp, 64);
        b_0.storeUint(src.twab_amount, 128);
        b_0.storeAddress(src.refund_address);
    };
}

export function loadInitDraw(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3109422989) { throw Error('Invalid prefix'); }
    let _twab_timestamp = sc_0.loadUintBig(64);
    let _twab_amount = sc_0.loadUintBig(128);
    let _refund_address = sc_0.loadAddress();
    return { $$type: 'InitDraw' as const, twab_timestamp: _twab_timestamp, twab_amount: _twab_amount, refund_address: _refund_address };
}

function loadTupleInitDraw(source: TupleReader) {
    let _twab_timestamp = source.readBigNumber();
    let _twab_amount = source.readBigNumber();
    let _refund_address = source.readAddress();
    return { $$type: 'InitDraw' as const, twab_timestamp: _twab_timestamp, twab_amount: _twab_amount, refund_address: _refund_address };
}

function storeTupleInitDraw(source: InitDraw) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.twab_timestamp);
    builder.writeNumber(source.twab_amount);
    builder.writeAddress(source.refund_address);
    return builder.build();
}

function dictValueParserInitDraw(): DictionaryValue<InitDraw> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeInitDraw(src)).endCell());
        },
        parse: (src) => {
            return loadInitDraw(src.loadRef().beginParse());
        }
    }
}

export type OpenDraw = {
    $$type: 'OpenDraw';
    twab_timestamp: bigint;
    twab_amount: bigint;
    prize_amount: bigint;
    refund_address: Address;
}

export function storeOpenDraw(src: OpenDraw) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3499440231, 32);
        b_0.storeUint(src.twab_timestamp, 64);
        b_0.storeUint(src.twab_amount, 128);
        b_0.storeCoins(src.prize_amount);
        b_0.storeAddress(src.refund_address);
    };
}

export function loadOpenDraw(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3499440231) { throw Error('Invalid prefix'); }
    let _twab_timestamp = sc_0.loadUintBig(64);
    let _twab_amount = sc_0.loadUintBig(128);
    let _prize_amount = sc_0.loadCoins();
    let _refund_address = sc_0.loadAddress();
    return { $$type: 'OpenDraw' as const, twab_timestamp: _twab_timestamp, twab_amount: _twab_amount, prize_amount: _prize_amount, refund_address: _refund_address };
}

function loadTupleOpenDraw(source: TupleReader) {
    let _twab_timestamp = source.readBigNumber();
    let _twab_amount = source.readBigNumber();
    let _prize_amount = source.readBigNumber();
    let _refund_address = source.readAddress();
    return { $$type: 'OpenDraw' as const, twab_timestamp: _twab_timestamp, twab_amount: _twab_amount, prize_amount: _prize_amount, refund_address: _refund_address };
}

function storeTupleOpenDraw(source: OpenDraw) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.twab_timestamp);
    builder.writeNumber(source.twab_amount);
    builder.writeNumber(source.prize_amount);
    builder.writeAddress(source.refund_address);
    return builder.build();
}

function dictValueParserOpenDraw(): DictionaryValue<OpenDraw> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeOpenDraw(src)).endCell());
        },
        parse: (src) => {
            return loadOpenDraw(src.loadRef().beginParse());
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
    user: Address;
    pool_account: Address;
    pick_payload: Cell;
}

export function storeClaimPrizeInternal(src: ClaimPrizeInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2865825699, 32);
        b_0.storeAddress(src.user);
        b_0.storeAddress(src.pool_account);
        b_0.storeBuilder(src.pick_payload.asBuilder());
    };
}

export function loadClaimPrizeInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2865825699) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _pool_account = sc_0.loadAddress();
    let _pick_payload = sc_0.asCell();
    return { $$type: 'ClaimPrizeInternal' as const, user: _user, pool_account: _pool_account, pick_payload: _pick_payload };
}

function loadTupleClaimPrizeInternal(source: TupleReader) {
    let _user = source.readAddress();
    let _pool_account = source.readAddress();
    let _pick_payload = source.readCell();
    return { $$type: 'ClaimPrizeInternal' as const, user: _user, pool_account: _pool_account, pick_payload: _pick_payload };
}

function storeTupleClaimPrizeInternal(source: ClaimPrizeInternal) {
    let builder = new TupleBuilder();
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

export type InitTicketInternal = {
    $$type: 'InitTicketInternal';
    draw_avg_balance: bigint;
    user_avg_balance: bigint;
}

export function storeInitTicketInternal(src: InitTicketInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2970604814, 32);
        b_0.storeCoins(src.draw_avg_balance);
        b_0.storeCoins(src.user_avg_balance);
    };
}

export function loadInitTicketInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2970604814) { throw Error('Invalid prefix'); }
    let _draw_avg_balance = sc_0.loadCoins();
    let _user_avg_balance = sc_0.loadCoins();
    return { $$type: 'InitTicketInternal' as const, draw_avg_balance: _draw_avg_balance, user_avg_balance: _user_avg_balance };
}

function loadTupleInitTicketInternal(source: TupleReader) {
    let _draw_avg_balance = source.readBigNumber();
    let _user_avg_balance = source.readBigNumber();
    return { $$type: 'InitTicketInternal' as const, draw_avg_balance: _draw_avg_balance, user_avg_balance: _user_avg_balance };
}

function storeTupleInitTicketInternal(source: InitTicketInternal) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.draw_avg_balance);
    builder.writeNumber(source.user_avg_balance);
    return builder.build();
}

function dictValueParserInitTicketInternal(): DictionaryValue<InitTicketInternal> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeInitTicketInternal(src)).endCell());
        },
        parse: (src) => {
            return loadInitTicketInternal(src.loadRef().beginParse());
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
    index_payload: Cell;
}

export function storeClaimPrize(src: ClaimPrize) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3150229583, 32);
        b_0.storeBuilder(src.index_payload.asBuilder());
    };
}

export function loadClaimPrize(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3150229583) { throw Error('Invalid prefix'); }
    let _index_payload = sc_0.asCell();
    return { $$type: 'ClaimPrize' as const, index_payload: _index_payload };
}

function loadTupleClaimPrize(source: TupleReader) {
    let _index_payload = source.readCell();
    return { $$type: 'ClaimPrize' as const, index_payload: _index_payload };
}

function storeTupleClaimPrize(source: ClaimPrize) {
    let builder = new TupleBuilder();
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
    amount: bigint;
    reserve: Address;
}

export function storeClaimPrizeDebt(src: ClaimPrizeDebt) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1998527298, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.reserve);
    };
}

export function loadClaimPrizeDebt(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1998527298) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _reserve = sc_0.loadAddress();
    return { $$type: 'ClaimPrizeDebt' as const, amount: _amount, reserve: _reserve };
}

function loadTupleClaimPrizeDebt(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _reserve = source.readAddress();
    return { $$type: 'ClaimPrizeDebt' as const, amount: _amount, reserve: _reserve };
}

function storeTupleClaimPrizeDebt(source: ClaimPrizeDebt) {
    let builder = new TupleBuilder();
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
    amount: bigint;
    user: Address;
    draw: Address;
    period: bigint;
}

export function storeClaimPrizeDebtInternal(src: ClaimPrizeDebtInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1036077356, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.user);
        b_0.storeAddress(src.draw);
        b_0.storeUint(src.period, 32);
    };
}

export function loadClaimPrizeDebtInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1036077356) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _user = sc_0.loadAddress();
    let _draw = sc_0.loadAddress();
    let _period = sc_0.loadUintBig(32);
    return { $$type: 'ClaimPrizeDebtInternal' as const, amount: _amount, user: _user, draw: _draw, period: _period };
}

function loadTupleClaimPrizeDebtInternal(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _user = source.readAddress();
    let _draw = source.readAddress();
    let _period = source.readBigNumber();
    return { $$type: 'ClaimPrizeDebtInternal' as const, amount: _amount, user: _user, draw: _draw, period: _period };
}

function storeTupleClaimPrizeDebtInternal(source: ClaimPrizeDebtInternal) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.user);
    builder.writeAddress(source.draw);
    builder.writeNumber(source.period);
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
    prize_reserve: Address;
    twab: Twab;
    share_amount: bigint;
    borrow_amount: bigint;
    prize_amount: bigint;
    next_period: bigint;
}

export function storePoolMasterData(src: PoolMasterData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.prize_reserve);
        b_0.store(storeTwab(src.twab));
        b_0.storeCoins(src.share_amount);
        b_0.storeCoins(src.borrow_amount);
        let b_1 = new Builder();
        b_1.storeCoins(src.prize_amount);
        b_1.storeUint(src.next_period, 32);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPoolMasterData(slice: Slice) {
    let sc_0 = slice;
    let _owner = sc_0.loadAddress();
    let _prize_reserve = sc_0.loadAddress();
    let _twab = loadTwab(sc_0);
    let _share_amount = sc_0.loadCoins();
    let _borrow_amount = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _prize_amount = sc_1.loadCoins();
    let _next_period = sc_1.loadUintBig(32);
    return { $$type: 'PoolMasterData' as const, owner: _owner, prize_reserve: _prize_reserve, twab: _twab, share_amount: _share_amount, borrow_amount: _borrow_amount, prize_amount: _prize_amount, next_period: _next_period };
}

function loadTuplePoolMasterData(source: TupleReader) {
    let _owner = source.readAddress();
    let _prize_reserve = source.readAddress();
    const _twab = loadTupleTwab(source.readTuple());
    let _share_amount = source.readBigNumber();
    let _borrow_amount = source.readBigNumber();
    let _prize_amount = source.readBigNumber();
    let _next_period = source.readBigNumber();
    return { $$type: 'PoolMasterData' as const, owner: _owner, prize_reserve: _prize_reserve, twab: _twab, share_amount: _share_amount, borrow_amount: _borrow_amount, prize_amount: _prize_amount, next_period: _next_period };
}

function storeTuplePoolMasterData(source: PoolMasterData) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.prize_reserve);
    builder.writeTuple(storeTupleTwab(source.twab));
    builder.writeNumber(source.share_amount);
    builder.writeNumber(source.borrow_amount);
    builder.writeNumber(source.prize_amount);
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
    prize_reserve: Address;
    share_amount: bigint;
}

export function storePoolAccountData(src: PoolAccountData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.master);
        b_0.storeAddress(src.prize_reserve);
        b_0.storeCoins(src.share_amount);
    };
}

export function loadPoolAccountData(slice: Slice) {
    let sc_0 = slice;
    let _owner = sc_0.loadAddress();
    let _master = sc_0.loadAddress();
    let _prize_reserve = sc_0.loadAddress();
    let _share_amount = sc_0.loadCoins();
    return { $$type: 'PoolAccountData' as const, owner: _owner, master: _master, prize_reserve: _prize_reserve, share_amount: _share_amount };
}

function loadTuplePoolAccountData(source: TupleReader) {
    let _owner = source.readAddress();
    let _master = source.readAddress();
    let _prize_reserve = source.readAddress();
    let _share_amount = source.readBigNumber();
    return { $$type: 'PoolAccountData' as const, owner: _owner, master: _master, prize_reserve: _prize_reserve, share_amount: _share_amount };
}

function storeTuplePoolAccountData(source: PoolAccountData) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.master);
    builder.writeAddress(source.prize_reserve);
    builder.writeNumber(source.share_amount);
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
    period: bigint;
    start: Twab | null;
    end: Twab | null;
    prize_amount: bigint;
    avail_prize_amount: bigint;
    winning_number: bigint;
    deadline: bigint;
    prize_percentage_0: bigint;
    prize_percentage_1: bigint;
    prize_percentage_2: bigint;
    prize_percentage_3: bigint;
    prize_percentage_4: bigint;
}

export function storeDrawData(src: DrawData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.active);
        b_0.storeAddress(src.pool_master);
        b_0.storeAddress(src.prize_reserve);
        b_0.storeUint(src.period, 32);
        if (src.start !== null && src.start !== undefined) { b_0.storeBit(true); b_0.store(storeTwab(src.start)); } else { b_0.storeBit(false); }
        if (src.end !== null && src.end !== undefined) { b_0.storeBit(true); b_0.store(storeTwab(src.end)); } else { b_0.storeBit(false); }
        let b_1 = new Builder();
        b_1.storeCoins(src.prize_amount);
        b_1.storeCoins(src.avail_prize_amount);
        b_1.storeUint(src.winning_number, 32);
        b_1.storeUint(src.deadline, 64);
        b_1.storeUint(src.prize_percentage_0, 16);
        b_1.storeUint(src.prize_percentage_1, 16);
        b_1.storeUint(src.prize_percentage_2, 16);
        b_1.storeUint(src.prize_percentage_3, 16);
        b_1.storeUint(src.prize_percentage_4, 16);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadDrawData(slice: Slice) {
    let sc_0 = slice;
    let _active = sc_0.loadBit();
    let _pool_master = sc_0.loadAddress();
    let _prize_reserve = sc_0.loadAddress();
    let _period = sc_0.loadUintBig(32);
    let _start = sc_0.loadBit() ? loadTwab(sc_0) : null;
    let _end = sc_0.loadBit() ? loadTwab(sc_0) : null;
    let sc_1 = sc_0.loadRef().beginParse();
    let _prize_amount = sc_1.loadCoins();
    let _avail_prize_amount = sc_1.loadCoins();
    let _winning_number = sc_1.loadUintBig(32);
    let _deadline = sc_1.loadUintBig(64);
    let _prize_percentage_0 = sc_1.loadUintBig(16);
    let _prize_percentage_1 = sc_1.loadUintBig(16);
    let _prize_percentage_2 = sc_1.loadUintBig(16);
    let _prize_percentage_3 = sc_1.loadUintBig(16);
    let _prize_percentage_4 = sc_1.loadUintBig(16);
    return { $$type: 'DrawData' as const, active: _active, pool_master: _pool_master, prize_reserve: _prize_reserve, period: _period, start: _start, end: _end, prize_amount: _prize_amount, avail_prize_amount: _avail_prize_amount, winning_number: _winning_number, deadline: _deadline, prize_percentage_0: _prize_percentage_0, prize_percentage_1: _prize_percentage_1, prize_percentage_2: _prize_percentage_2, prize_percentage_3: _prize_percentage_3, prize_percentage_4: _prize_percentage_4 };
}

function loadTupleDrawData(source: TupleReader) {
    let _active = source.readBoolean();
    let _pool_master = source.readAddress();
    let _prize_reserve = source.readAddress();
    let _period = source.readBigNumber();
    const _start_p = source.readTupleOpt();
    const _start = _start_p ? loadTupleTwab(_start_p) : null;
    const _end_p = source.readTupleOpt();
    const _end = _end_p ? loadTupleTwab(_end_p) : null;
    let _prize_amount = source.readBigNumber();
    let _avail_prize_amount = source.readBigNumber();
    let _winning_number = source.readBigNumber();
    let _deadline = source.readBigNumber();
    let _prize_percentage_0 = source.readBigNumber();
    let _prize_percentage_1 = source.readBigNumber();
    let _prize_percentage_2 = source.readBigNumber();
    let _prize_percentage_3 = source.readBigNumber();
    let _prize_percentage_4 = source.readBigNumber();
    return { $$type: 'DrawData' as const, active: _active, pool_master: _pool_master, prize_reserve: _prize_reserve, period: _period, start: _start, end: _end, prize_amount: _prize_amount, avail_prize_amount: _avail_prize_amount, winning_number: _winning_number, deadline: _deadline, prize_percentage_0: _prize_percentage_0, prize_percentage_1: _prize_percentage_1, prize_percentage_2: _prize_percentage_2, prize_percentage_3: _prize_percentage_3, prize_percentage_4: _prize_percentage_4 };
}

function storeTupleDrawData(source: DrawData) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.active);
    builder.writeAddress(source.pool_master);
    builder.writeAddress(source.prize_reserve);
    builder.writeNumber(source.period);
    if (source.start !== null && source.start !== undefined) {
        builder.writeTuple(storeTupleTwab(source.start));
    } else {
        builder.writeTuple(null);
    }
    if (source.end !== null && source.end !== undefined) {
        builder.writeTuple(storeTupleTwab(source.end));
    } else {
        builder.writeTuple(null);
    }
    builder.writeNumber(source.prize_amount);
    builder.writeNumber(source.avail_prize_amount);
    builder.writeNumber(source.winning_number);
    builder.writeNumber(source.deadline);
    builder.writeNumber(source.prize_percentage_0);
    builder.writeNumber(source.prize_percentage_1);
    builder.writeNumber(source.prize_percentage_2);
    builder.writeNumber(source.prize_percentage_3);
    builder.writeNumber(source.prize_percentage_4);
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
    pool_master: Address;
    balance: bigint;
}

export function storePrizeReserveData(src: PrizeReserveData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.pool_master);
        b_0.storeCoins(src.balance);
    };
}

export function loadPrizeReserveData(slice: Slice) {
    let sc_0 = slice;
    let _pool_master = sc_0.loadAddress();
    let _balance = sc_0.loadCoins();
    return { $$type: 'PrizeReserveData' as const, pool_master: _pool_master, balance: _balance };
}

function loadTuplePrizeReserveData(source: TupleReader) {
    let _pool_master = source.readAddress();
    let _balance = source.readBigNumber();
    return { $$type: 'PrizeReserveData' as const, pool_master: _pool_master, balance: _balance };
}

function storeTuplePrizeReserveData(source: PrizeReserveData) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.pool_master);
    builder.writeNumber(source.balance);
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

 type PoolMaster_init_args = {
    $$type: 'PoolMaster_init_args';
    owner: Address;
}

function initPoolMaster_init_args(src: PoolMaster_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
    };
}

async function PoolMaster_init(owner: Address) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initPoolMaster_init_args({ $$type: 'PoolMaster_init_args', owner })(builder);
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
    8459: { message: `Invalid twab timestamp` },
    8888: { message: `Only from draw` },
    10349: { message: `Start time >= timestamp` },
    11439: { message: `Zero average balance` },
    13788: { message: `Invalid pick size` },
    16022: { message: `Insufficient picks` },
    16960: { message: `Invalid claim amount` },
    17110: { message: `Draw already initialized` },
    19074: { message: `Empty twab store` },
    19102: { message: `Account locked` },
    19317: { message: `Invalid timestamp` },
    23432: { message: `timestamp >= End time` },
    24632: { message: `Only from pool master` },
    30919: { message: `Ticket is active` },
    31206: { message: `Start time >= End time` },
    41207: { message: `invalid sender` },
    46439: { message: `Invalid withdraw amount` },
    47849: { message: `Draw is over` },
    49516: { message: `Ticket is inactive` },
    51181: { message: `No prize` },
    54615: { message: `Insufficient balance` },
    54665: { message: `Draw is inactive` },
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
    {"name":"DepositInternal","header":2706550035,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"user","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"WithdrawInternal","header":4279924659,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"user","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Borrow","header":1154673471,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"Withdraw","header":195467089,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"DepositFinish","header":3488820906,"fields":[{"name":"timestamp","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"WithdrawFinish","header":339761243,"fields":[{"name":"timestamp","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"PrepareInitTicket","header":4247418329,"fields":[{"name":"period","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"start","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"end","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"avg_balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"InitDraw","header":3109422989,"fields":[{"name":"twab_timestamp","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"twab_amount","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"refund_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"OpenDraw","header":3499440231,"fields":[{"name":"twab_timestamp","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"twab_amount","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"prize_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"refund_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"InitTicket","header":2494876497,"fields":[{"name":"pool_account","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ClaimPrizeInternal","header":2865825699,"fields":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"pool_account","type":{"kind":"simple","type":"address","optional":false}},{"name":"pick_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"InitTicketInternal","header":2970604814,"fields":[{"name":"draw_avg_balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"user_avg_balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"PayPrizeDebtInternal","header":1506985886,"fields":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"ClaimPrize","header":3150229583,"fields":[{"name":"index_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"ClaimPrizeDebt","header":1998527298,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"reserve","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ClaimPrizeDebtInternal","header":1036077356,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"draw","type":{"kind":"simple","type":"address","optional":false}},{"name":"period","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"PoolMasterData","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"prize_reserve","type":{"kind":"simple","type":"address","optional":false}},{"name":"twab","type":{"kind":"simple","type":"Twab","optional":false}},{"name":"share_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"borrow_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"prize_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"next_period","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"PoolAccountData","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"master","type":{"kind":"simple","type":"address","optional":false}},{"name":"prize_reserve","type":{"kind":"simple","type":"address","optional":false}},{"name":"share_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"DrawData","header":null,"fields":[{"name":"active","type":{"kind":"simple","type":"bool","optional":false}},{"name":"pool_master","type":{"kind":"simple","type":"address","optional":false}},{"name":"prize_reserve","type":{"kind":"simple","type":"address","optional":false}},{"name":"period","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"start","type":{"kind":"simple","type":"Twab","optional":true}},{"name":"end","type":{"kind":"simple","type":"Twab","optional":true}},{"name":"prize_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"avail_prize_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"winning_number","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"deadline","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"prize_percentage_0","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"prize_percentage_1","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"prize_percentage_2","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"prize_percentage_3","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"prize_percentage_4","type":{"kind":"simple","type":"uint","optional":false,"format":16}}]},
    {"name":"TicketData","header":null,"fields":[{"name":"active","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"pool_account","type":{"kind":"simple","type":"address","optional":false}},{"name":"draw","type":{"kind":"simple","type":"address","optional":false}},{"name":"period","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"picks","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"debt_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"PrizeReserveData","header":null,"fields":[{"name":"pool_master","type":{"kind":"simple","type":"address","optional":false}},{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
]

const PoolMaster_getters: ABIGetter[] = [
    {"name":"get_core_data","arguments":[],"returnType":{"kind":"simple","type":"PoolMasterData","optional":false}},
    {"name":"get_account_address","arguments":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"get_draw_address","arguments":[{"name":"period","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const PoolMaster_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"text","text":"init draw"}},
    {"receiver":"internal","message":{"kind":"text","text":"open draw"}},
    {"receiver":"internal","message":{"kind":"typed","type":"DepositInternal"}},
    {"receiver":"internal","message":{"kind":"typed","type":"WithdrawInternal"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Borrow"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeOwner"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class PoolMaster implements Contract {
    
    static async init(owner: Address) {
        return await PoolMaster_init(owner);
    }
    
    static async fromInit(owner: Address) {
        const init = await PoolMaster_init(owner);
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | 'init draw' | 'open draw' | DepositInternal | WithdrawInternal | Borrow | ChangeOwner | Deploy) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message === 'init draw') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'open draw') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DepositInternal') {
            body = beginCell().store(storeDepositInternal(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawInternal') {
            body = beginCell().store(storeWithdrawInternal(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Borrow') {
            body = beginCell().store(storeBorrow(message)).endCell();
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