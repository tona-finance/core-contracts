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

export type WinningSplit = {
    $$type: 'WinningSplit';
    n0: bigint;
    n1: bigint;
    n2: bigint;
    n3: bigint;
}

export function storeWinningSplit(src: WinningSplit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.n0, 8);
        b_0.storeUint(src.n1, 8);
        b_0.storeUint(src.n2, 8);
        b_0.storeUint(src.n3, 8);
    };
}

export function loadWinningSplit(slice: Slice) {
    let sc_0 = slice;
    let _n0 = sc_0.loadUintBig(8);
    let _n1 = sc_0.loadUintBig(8);
    let _n2 = sc_0.loadUintBig(8);
    let _n3 = sc_0.loadUintBig(8);
    return { $$type: 'WinningSplit' as const, n0: _n0, n1: _n1, n2: _n2, n3: _n3 };
}

function loadTupleWinningSplit(source: TupleReader) {
    let _n0 = source.readBigNumber();
    let _n1 = source.readBigNumber();
    let _n2 = source.readBigNumber();
    let _n3 = source.readBigNumber();
    return { $$type: 'WinningSplit' as const, n0: _n0, n1: _n1, n2: _n2, n3: _n3 };
}

function storeTupleWinningSplit(source: WinningSplit) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.n0);
    builder.writeNumber(source.n1);
    builder.writeNumber(source.n2);
    builder.writeNumber(source.n3);
    return builder.build();
}

function dictValueParserWinningSplit(): DictionaryValue<WinningSplit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeWinningSplit(src)).endCell());
        },
        parse: (src) => {
            return loadWinningSplit(src.loadRef().beginParse());
        }
    }
}

export type OpenDraw = {
    $$type: 'OpenDraw';
    prize_amount: bigint;
}

export function storeOpenDraw(src: OpenDraw) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3303631299, 32);
        b_0.storeCoins(src.prize_amount);
    };
}

export function loadOpenDraw(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3303631299) { throw Error('Invalid prefix'); }
    let _prize_amount = sc_0.loadCoins();
    return { $$type: 'OpenDraw' as const, prize_amount: _prize_amount };
}

function loadTupleOpenDraw(source: TupleReader) {
    let _prize_amount = source.readBigNumber();
    return { $$type: 'OpenDraw' as const, prize_amount: _prize_amount };
}

function storeTupleOpenDraw(source: OpenDraw) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.prize_amount);
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

export type Repay = {
    $$type: 'Repay';
    amount: bigint;
}

export function storeRepay(src: Repay) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3449863297, 32);
        b_0.storeCoins(src.amount);
    };
}

export function loadRepay(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3449863297) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    return { $$type: 'Repay' as const, amount: _amount };
}

function loadTupleRepay(source: TupleReader) {
    let _amount = source.readBigNumber();
    return { $$type: 'Repay' as const, amount: _amount };
}

function storeTupleRepay(source: Repay) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserRepay(): DictionaryValue<Repay> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeRepay(src)).endCell());
        },
        parse: (src) => {
            return loadRepay(src.loadRef().beginParse());
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
    winning_number: bigint;
    start: bigint;
    end: bigint;
    avg_balance: bigint;
}

export function storePrepareInitTicket(src: PrepareInitTicket) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1186592459, 32);
        b_0.storeUint(src.period, 32);
        b_0.storeUint(src.winning_number, 32);
        b_0.storeUint(src.start, 64);
        b_0.storeUint(src.end, 64);
        b_0.storeCoins(src.avg_balance);
    };
}

export function loadPrepareInitTicket(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1186592459) { throw Error('Invalid prefix'); }
    let _period = sc_0.loadUintBig(32);
    let _winning_number = sc_0.loadUintBig(32);
    let _start = sc_0.loadUintBig(64);
    let _end = sc_0.loadUintBig(64);
    let _avg_balance = sc_0.loadCoins();
    return { $$type: 'PrepareInitTicket' as const, period: _period, winning_number: _winning_number, start: _start, end: _end, avg_balance: _avg_balance };
}

function loadTuplePrepareInitTicket(source: TupleReader) {
    let _period = source.readBigNumber();
    let _winning_number = source.readBigNumber();
    let _start = source.readBigNumber();
    let _end = source.readBigNumber();
    let _avg_balance = source.readBigNumber();
    return { $$type: 'PrepareInitTicket' as const, period: _period, winning_number: _winning_number, start: _start, end: _end, avg_balance: _avg_balance };
}

function storeTuplePrepareInitTicket(source: PrepareInitTicket) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.period);
    builder.writeNumber(source.winning_number);
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

export type OpenDrawInternal = {
    $$type: 'OpenDrawInternal';
    twab_timestamp: bigint;
    twab_amount: bigint;
    refund_address: Address;
}

export function storeOpenDrawInternal(src: OpenDrawInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2354478105, 32);
        b_0.storeUint(src.twab_timestamp, 64);
        b_0.storeUint(src.twab_amount, 128);
        b_0.storeAddress(src.refund_address);
    };
}

export function loadOpenDrawInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2354478105) { throw Error('Invalid prefix'); }
    let _twab_timestamp = sc_0.loadUintBig(64);
    let _twab_amount = sc_0.loadUintBig(128);
    let _refund_address = sc_0.loadAddress();
    return { $$type: 'OpenDrawInternal' as const, twab_timestamp: _twab_timestamp, twab_amount: _twab_amount, refund_address: _refund_address };
}

function loadTupleOpenDrawInternal(source: TupleReader) {
    let _twab_timestamp = source.readBigNumber();
    let _twab_amount = source.readBigNumber();
    let _refund_address = source.readAddress();
    return { $$type: 'OpenDrawInternal' as const, twab_timestamp: _twab_timestamp, twab_amount: _twab_amount, refund_address: _refund_address };
}

function storeTupleOpenDrawInternal(source: OpenDrawInternal) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.twab_timestamp);
    builder.writeNumber(source.twab_amount);
    builder.writeAddress(source.refund_address);
    return builder.build();
}

function dictValueParserOpenDrawInternal(): DictionaryValue<OpenDrawInternal> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeOpenDrawInternal(src)).endCell());
        },
        parse: (src) => {
            return loadOpenDrawInternal(src.loadRef().beginParse());
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
    prize_scale: bigint;
}

export function storeClaimPrizeInternal(src: ClaimPrizeInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2386274623, 32);
        b_0.storeAddress(src.user);
        b_0.storeAddress(src.pool_account);
        b_0.storeUint(src.prize_scale, 32);
    };
}

export function loadClaimPrizeInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2386274623) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _pool_account = sc_0.loadAddress();
    let _prize_scale = sc_0.loadUintBig(32);
    return { $$type: 'ClaimPrizeInternal' as const, user: _user, pool_account: _pool_account, prize_scale: _prize_scale };
}

function loadTupleClaimPrizeInternal(source: TupleReader) {
    let _user = source.readAddress();
    let _pool_account = source.readAddress();
    let _prize_scale = source.readBigNumber();
    return { $$type: 'ClaimPrizeInternal' as const, user: _user, pool_account: _pool_account, prize_scale: _prize_scale };
}

function storeTupleClaimPrizeInternal(source: ClaimPrizeInternal) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeAddress(source.pool_account);
    builder.writeNumber(source.prize_scale);
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
    winning_number: bigint;
    draw_avg_balance: bigint;
    user_avg_balance: bigint;
}

export function storeInitTicketInternal(src: InitTicketInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1186322253, 32);
        b_0.storeUint(src.winning_number, 32);
        b_0.storeCoins(src.draw_avg_balance);
        b_0.storeCoins(src.user_avg_balance);
    };
}

export function loadInitTicketInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1186322253) { throw Error('Invalid prefix'); }
    let _winning_number = sc_0.loadUintBig(32);
    let _draw_avg_balance = sc_0.loadCoins();
    let _user_avg_balance = sc_0.loadCoins();
    return { $$type: 'InitTicketInternal' as const, winning_number: _winning_number, draw_avg_balance: _draw_avg_balance, user_avg_balance: _user_avg_balance };
}

function loadTupleInitTicketInternal(source: TupleReader) {
    let _winning_number = source.readBigNumber();
    let _draw_avg_balance = source.readBigNumber();
    let _user_avg_balance = source.readBigNumber();
    return { $$type: 'InitTicketInternal' as const, winning_number: _winning_number, draw_avg_balance: _draw_avg_balance, user_avg_balance: _user_avg_balance };
}

function storeTupleInitTicketInternal(source: InitTicketInternal) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.winning_number);
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
    period: bigint;
}

export function storePayPrizeDebtInternal(src: PayPrizeDebtInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1422626960, 32);
        b_0.storeAddress(src.user);
        b_0.storeCoins(src.amount);
        b_0.storeUint(src.period, 32);
    };
}

export function loadPayPrizeDebtInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1422626960) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _amount = sc_0.loadCoins();
    let _period = sc_0.loadUintBig(32);
    return { $$type: 'PayPrizeDebtInternal' as const, user: _user, amount: _amount, period: _period };
}

function loadTuplePayPrizeDebtInternal(source: TupleReader) {
    let _user = source.readAddress();
    let _amount = source.readBigNumber();
    let _period = source.readBigNumber();
    return { $$type: 'PayPrizeDebtInternal' as const, user: _user, amount: _amount, period: _period };
}

function storeTuplePayPrizeDebtInternal(source: PayPrizeDebtInternal) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.amount);
    builder.writeNumber(source.period);
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

export type ClaimPrizeDebtInternal = {
    $$type: 'ClaimPrizeDebtInternal';
    amount: bigint;
    user: Address;
}

export function storeClaimPrizeDebtInternal(src: ClaimPrizeDebtInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(875353941, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.user);
    };
}

export function loadClaimPrizeDebtInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 875353941) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _user = sc_0.loadAddress();
    return { $$type: 'ClaimPrizeDebtInternal' as const, amount: _amount, user: _user };
}

function loadTupleClaimPrizeDebtInternal(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _user = source.readAddress();
    return { $$type: 'ClaimPrizeDebtInternal' as const, amount: _amount, user: _user };
}

function storeTupleClaimPrizeDebtInternal(source: ClaimPrizeDebtInternal) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.user);
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
    debt_amount: bigint;
}

export function storePoolAccountData(src: PoolAccountData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.master);
        b_0.storeAddress(src.prize_reserve);
        b_0.storeCoins(src.share_amount);
        let b_1 = new Builder();
        b_1.storeCoins(src.debt_amount);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPoolAccountData(slice: Slice) {
    let sc_0 = slice;
    let _owner = sc_0.loadAddress();
    let _master = sc_0.loadAddress();
    let _prize_reserve = sc_0.loadAddress();
    let _share_amount = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _debt_amount = sc_1.loadCoins();
    return { $$type: 'PoolAccountData' as const, owner: _owner, master: _master, prize_reserve: _prize_reserve, share_amount: _share_amount, debt_amount: _debt_amount };
}

function loadTuplePoolAccountData(source: TupleReader) {
    let _owner = source.readAddress();
    let _master = source.readAddress();
    let _prize_reserve = source.readAddress();
    let _share_amount = source.readBigNumber();
    let _debt_amount = source.readBigNumber();
    return { $$type: 'PoolAccountData' as const, owner: _owner, master: _master, prize_reserve: _prize_reserve, share_amount: _share_amount, debt_amount: _debt_amount };
}

function storeTuplePoolAccountData(source: PoolAccountData) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.master);
    builder.writeAddress(source.prize_reserve);
    builder.writeNumber(source.share_amount);
    builder.writeNumber(source.debt_amount);
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
    return { $$type: 'DrawData' as const, active: _active, pool_master: _pool_master, prize_reserve: _prize_reserve, period: _period, start: _start, end: _end, prize_amount: _prize_amount, avail_prize_amount: _avail_prize_amount, winning_number: _winning_number, deadline: _deadline };
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
    return { $$type: 'DrawData' as const, active: _active, pool_master: _pool_master, prize_reserve: _prize_reserve, period: _period, start: _start, end: _end, prize_amount: _prize_amount, avail_prize_amount: _avail_prize_amount, winning_number: _winning_number, deadline: _deadline };
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
    return { $$type: 'TicketData' as const, active: _active, owner: _owner, pool_account: _pool_account, draw: _draw, period: _period, picks: _picks };
}

function loadTupleTicketData(source: TupleReader) {
    let _active = source.readBoolean();
    let _owner = source.readAddress();
    let _pool_account = source.readAddress();
    let _draw = source.readAddress();
    let _period = source.readBigNumber();
    let _picks = source.readBigNumber();
    return { $$type: 'TicketData' as const, active: _active, owner: _owner, pool_account: _pool_account, draw: _draw, period: _period, picks: _picks };
}

function storeTupleTicketData(source: TicketData) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.active);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.pool_account);
    builder.writeAddress(source.draw);
    builder.writeNumber(source.period);
    builder.writeNumber(source.picks);
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
    16022: { message: `Insufficient picks` },
    16960: { message: `Invalid claim amount` },
    17110: { message: `Draw already initialized` },
    19074: { message: `Empty twab store` },
    19102: { message: `Account locked` },
    19317: { message: `Invalid timestamp` },
    23432: { message: `timestamp >= End time` },
    24632: { message: `Only from pool master` },
    28129: { message: `Invalid prize amount` },
    30347: { message: `Invalid repay amount` },
    30919: { message: `Ticket is active` },
    31206: { message: `Start time >= End time` },
    40127: { message: `Only pool account` },
    41207: { message: `invalid sender` },
    46002: { message: `Pick used` },
    46439: { message: `Invalid withdraw amount` },
    47447: { message: `Invalid borrow amount` },
    47849: { message: `Draw is over` },
    49516: { message: `Ticket is inactive` },
    54615: { message: `Insufficient balance` },
    54665: { message: `Draw is inactive` },
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
    {"name":"WinningSplit","header":null,"fields":[{"name":"n0","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"n1","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"n2","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"n3","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
    {"name":"OpenDraw","header":3303631299,"fields":[{"name":"prize_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"Borrow","header":1154673471,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"Repay","header":3449863297,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"DepositInternal","header":2706550035,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"user","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"WithdrawInternal","header":4279924659,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"user","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Withdraw","header":195467089,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"DepositFinish","header":3488820906,"fields":[{"name":"timestamp","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"WithdrawFinish","header":339761243,"fields":[{"name":"timestamp","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"PrepareInitTicket","header":1186592459,"fields":[{"name":"period","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"winning_number","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"start","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"end","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"avg_balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"ClaimPrizeDebt","header":1998527298,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"reserve","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"InitDraw","header":3109422989,"fields":[{"name":"twab_timestamp","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"twab_amount","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"refund_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"OpenDrawInternal","header":2354478105,"fields":[{"name":"twab_timestamp","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"twab_amount","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"refund_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"InitTicket","header":2494876497,"fields":[{"name":"pool_account","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ClaimPrizeInternal","header":2386274623,"fields":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"pool_account","type":{"kind":"simple","type":"address","optional":false}},{"name":"prize_scale","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"InitTicketInternal","header":1186322253,"fields":[{"name":"winning_number","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"draw_avg_balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"user_avg_balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"PayPrizeDebtInternal","header":1422626960,"fields":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"period","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"ClaimPrize","header":3150229583,"fields":[{"name":"index_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"ClaimPrizeDebtInternal","header":875353941,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"user","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"PoolMasterData","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"prize_reserve","type":{"kind":"simple","type":"address","optional":false}},{"name":"twab","type":{"kind":"simple","type":"Twab","optional":false}},{"name":"share_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"borrow_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"prize_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"next_period","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"PoolAccountData","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"master","type":{"kind":"simple","type":"address","optional":false}},{"name":"prize_reserve","type":{"kind":"simple","type":"address","optional":false}},{"name":"share_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"debt_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"DrawData","header":null,"fields":[{"name":"active","type":{"kind":"simple","type":"bool","optional":false}},{"name":"pool_master","type":{"kind":"simple","type":"address","optional":false}},{"name":"prize_reserve","type":{"kind":"simple","type":"address","optional":false}},{"name":"period","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"start","type":{"kind":"simple","type":"Twab","optional":true}},{"name":"end","type":{"kind":"simple","type":"Twab","optional":true}},{"name":"prize_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"avail_prize_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"winning_number","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"deadline","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"TicketData","header":null,"fields":[{"name":"active","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"pool_account","type":{"kind":"simple","type":"address","optional":false}},{"name":"draw","type":{"kind":"simple","type":"address","optional":false}},{"name":"period","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"picks","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
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
    {"receiver":"internal","message":{"kind":"text","text":"init draw"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Repay"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Borrow"}},
    {"receiver":"internal","message":{"kind":"typed","type":"OpenDraw"}},
    {"receiver":"internal","message":{"kind":"typed","type":"DepositInternal"}},
    {"receiver":"internal","message":{"kind":"typed","type":"WithdrawInternal"}},
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: 'init draw' | Repay | Borrow | OpenDraw | DepositInternal | WithdrawInternal | ChangeOwner | Deploy) {
        
        let body: Cell | null = null;
        if (message === 'init draw') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Repay') {
            body = beginCell().store(storeRepay(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Borrow') {
            body = beginCell().store(storeBorrow(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'OpenDraw') {
            body = beginCell().store(storeOpenDraw(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DepositInternal') {
            body = beginCell().store(storeDepositInternal(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawInternal') {
            body = beginCell().store(storeWithdrawInternal(message)).endCell();
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