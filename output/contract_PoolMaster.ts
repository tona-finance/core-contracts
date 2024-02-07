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

export type ClaimPrizeInternal = {
    $$type: 'ClaimPrizeInternal';
    amount: bigint;
    period: bigint;
    user: Address;
}

export function storeClaimPrizeInternal(src: ClaimPrizeInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2692664058, 32);
        b_0.storeCoins(src.amount);
        b_0.storeUint(src.period, 32);
        b_0.storeAddress(src.user);
    };
}

export function loadClaimPrizeInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2692664058) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _period = sc_0.loadUintBig(32);
    let _user = sc_0.loadAddress();
    return { $$type: 'ClaimPrizeInternal' as const, amount: _amount, period: _period, user: _user };
}

function loadTupleClaimPrizeInternal(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _period = source.readBigNumber();
    let _user = source.readAddress();
    return { $$type: 'ClaimPrizeInternal' as const, amount: _amount, period: _period, user: _user };
}

function storeTupleClaimPrizeInternal(source: ClaimPrizeInternal) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeNumber(source.period);
    builder.writeAddress(source.user);
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
    winning_number: bigint;
    prize_amount: bigint;
    jetton_amount: bigint;
    avg_balance: bigint;
    ticket_code: Cell;
    ticket_data: Cell;
}

export function storePrepareInitTicket(src: PrepareInitTicket) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2292165562, 32);
        b_0.storeUint(src.period, 32);
        b_0.storeUint(src.start, 64);
        b_0.storeUint(src.end, 64);
        b_0.storeUint(src.winning_number, 16);
        b_0.storeCoins(src.prize_amount);
        b_0.storeCoins(src.jetton_amount);
        b_0.storeCoins(src.avg_balance);
        b_0.storeRef(src.ticket_code);
        b_0.storeRef(src.ticket_data);
    };
}

export function loadPrepareInitTicket(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2292165562) { throw Error('Invalid prefix'); }
    let _period = sc_0.loadUintBig(32);
    let _start = sc_0.loadUintBig(64);
    let _end = sc_0.loadUintBig(64);
    let _winning_number = sc_0.loadUintBig(16);
    let _prize_amount = sc_0.loadCoins();
    let _jetton_amount = sc_0.loadCoins();
    let _avg_balance = sc_0.loadCoins();
    let _ticket_code = sc_0.loadRef();
    let _ticket_data = sc_0.loadRef();
    return { $$type: 'PrepareInitTicket' as const, period: _period, start: _start, end: _end, winning_number: _winning_number, prize_amount: _prize_amount, jetton_amount: _jetton_amount, avg_balance: _avg_balance, ticket_code: _ticket_code, ticket_data: _ticket_data };
}

function loadTuplePrepareInitTicket(source: TupleReader) {
    let _period = source.readBigNumber();
    let _start = source.readBigNumber();
    let _end = source.readBigNumber();
    let _winning_number = source.readBigNumber();
    let _prize_amount = source.readBigNumber();
    let _jetton_amount = source.readBigNumber();
    let _avg_balance = source.readBigNumber();
    let _ticket_code = source.readCell();
    let _ticket_data = source.readCell();
    return { $$type: 'PrepareInitTicket' as const, period: _period, start: _start, end: _end, winning_number: _winning_number, prize_amount: _prize_amount, jetton_amount: _jetton_amount, avg_balance: _avg_balance, ticket_code: _ticket_code, ticket_data: _ticket_data };
}

function storeTuplePrepareInitTicket(source: PrepareInitTicket) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.period);
    builder.writeNumber(source.start);
    builder.writeNumber(source.end);
    builder.writeNumber(source.winning_number);
    builder.writeNumber(source.prize_amount);
    builder.writeNumber(source.jetton_amount);
    builder.writeNumber(source.avg_balance);
    builder.writeCell(source.ticket_code);
    builder.writeCell(source.ticket_data);
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

export type PayPrizeDebtInternal = {
    $$type: 'PayPrizeDebtInternal';
    amount: bigint;
    user: Address;
}

export function storePayPrizeDebtInternal(src: PayPrizeDebtInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1233654330, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.user);
    };
}

export function loadPayPrizeDebtInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1233654330) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _user = sc_0.loadAddress();
    return { $$type: 'PayPrizeDebtInternal' as const, amount: _amount, user: _user };
}

function loadTuplePayPrizeDebtInternal(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _user = source.readAddress();
    return { $$type: 'PayPrizeDebtInternal' as const, amount: _amount, user: _user };
}

function storeTuplePayPrizeDebtInternal(source: PayPrizeDebtInternal) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.user);
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

export type ClaimPrizeDebt = {
    $$type: 'ClaimPrizeDebt';
    amount: bigint;
    prize_reserve: Address;
}

export function storeClaimPrizeDebt(src: ClaimPrizeDebt) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(738691372, 32);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.prize_reserve);
    };
}

export function loadClaimPrizeDebt(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 738691372) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _prize_reserve = sc_0.loadAddress();
    return { $$type: 'ClaimPrizeDebt' as const, amount: _amount, prize_reserve: _prize_reserve };
}

function loadTupleClaimPrizeDebt(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _prize_reserve = source.readAddress();
    return { $$type: 'ClaimPrizeDebt' as const, amount: _amount, prize_reserve: _prize_reserve };
}

function storeTupleClaimPrizeDebt(source: ClaimPrizeDebt) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeAddress(source.prize_reserve);
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

export type OpenDraw = {
    $$type: 'OpenDraw';
    twab_timestamp: bigint;
    twab_amount: bigint;
    prize_amount: bigint;
    jetton_amount: bigint;
    refund_address: Address;
}

export function storeOpenDraw(src: OpenDraw) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2194139508, 32);
        b_0.storeUint(src.twab_timestamp, 64);
        b_0.storeUint(src.twab_amount, 128);
        b_0.storeCoins(src.prize_amount);
        b_0.storeCoins(src.jetton_amount);
        b_0.storeAddress(src.refund_address);
    };
}

export function loadOpenDraw(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2194139508) { throw Error('Invalid prefix'); }
    let _twab_timestamp = sc_0.loadUintBig(64);
    let _twab_amount = sc_0.loadUintBig(128);
    let _prize_amount = sc_0.loadCoins();
    let _jetton_amount = sc_0.loadCoins();
    let _refund_address = sc_0.loadAddress();
    return { $$type: 'OpenDraw' as const, twab_timestamp: _twab_timestamp, twab_amount: _twab_amount, prize_amount: _prize_amount, jetton_amount: _jetton_amount, refund_address: _refund_address };
}

function loadTupleOpenDraw(source: TupleReader) {
    let _twab_timestamp = source.readBigNumber();
    let _twab_amount = source.readBigNumber();
    let _prize_amount = source.readBigNumber();
    let _jetton_amount = source.readBigNumber();
    let _refund_address = source.readAddress();
    return { $$type: 'OpenDraw' as const, twab_timestamp: _twab_timestamp, twab_amount: _twab_amount, prize_amount: _prize_amount, jetton_amount: _jetton_amount, refund_address: _refund_address };
}

function storeTupleOpenDraw(source: OpenDraw) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.twab_timestamp);
    builder.writeNumber(source.twab_amount);
    builder.writeNumber(source.prize_amount);
    builder.writeNumber(source.jetton_amount);
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
    code: Cell;
    data: Cell;
}

export function storeInitTicket(src: InitTicket) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(518518837, 32);
        b_0.storeAddress(src.pool_account);
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadInitTicket(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 518518837) { throw Error('Invalid prefix'); }
    let _pool_account = sc_0.loadAddress();
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'InitTicket' as const, pool_account: _pool_account, code: _code, data: _data };
}

function loadTupleInitTicket(source: TupleReader) {
    let _pool_account = source.readAddress();
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'InitTicket' as const, pool_account: _pool_account, code: _code, data: _data };
}

function storeTupleInitTicket(source: InitTicket) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.pool_account);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
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

export type ClaimJettonInternal = {
    $$type: 'ClaimJettonInternal';
    amount: bigint;
    period: bigint;
    user: Address;
}

export function storeClaimJettonInternal(src: ClaimJettonInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3910874751, 32);
        b_0.storeCoins(src.amount);
        b_0.storeUint(src.period, 32);
        b_0.storeAddress(src.user);
    };
}

export function loadClaimJettonInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3910874751) { throw Error('Invalid prefix'); }
    let _amount = sc_0.loadCoins();
    let _period = sc_0.loadUintBig(32);
    let _user = sc_0.loadAddress();
    return { $$type: 'ClaimJettonInternal' as const, amount: _amount, period: _period, user: _user };
}

function loadTupleClaimJettonInternal(source: TupleReader) {
    let _amount = source.readBigNumber();
    let _period = source.readBigNumber();
    let _user = source.readAddress();
    return { $$type: 'ClaimJettonInternal' as const, amount: _amount, period: _period, user: _user };
}

function storeTupleClaimJettonInternal(source: ClaimJettonInternal) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.amount);
    builder.writeNumber(source.period);
    builder.writeAddress(source.user);
    return builder.build();
}

function dictValueParserClaimJettonInternal(): DictionaryValue<ClaimJettonInternal> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeClaimJettonInternal(src)).endCell());
        },
        parse: (src) => {
            return loadClaimJettonInternal(src.loadRef().beginParse());
        }
    }
}

export type InitTicketInternal = {
    $$type: 'InitTicketInternal';
    winning_number: bigint;
    total_prize_amount: bigint;
    picks: bigint;
    jetton_amount: bigint;
}

export function storeInitTicketInternal(src: InitTicketInternal) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2551503563, 32);
        b_0.storeUint(src.winning_number, 16);
        b_0.storeCoins(src.total_prize_amount);
        b_0.storeUint(src.picks, 16);
        b_0.storeCoins(src.jetton_amount);
    };
}

export function loadInitTicketInternal(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2551503563) { throw Error('Invalid prefix'); }
    let _winning_number = sc_0.loadUintBig(16);
    let _total_prize_amount = sc_0.loadCoins();
    let _picks = sc_0.loadUintBig(16);
    let _jetton_amount = sc_0.loadCoins();
    return { $$type: 'InitTicketInternal' as const, winning_number: _winning_number, total_prize_amount: _total_prize_amount, picks: _picks, jetton_amount: _jetton_amount };
}

function loadTupleInitTicketInternal(source: TupleReader) {
    let _winning_number = source.readBigNumber();
    let _total_prize_amount = source.readBigNumber();
    let _picks = source.readBigNumber();
    let _jetton_amount = source.readBigNumber();
    return { $$type: 'InitTicketInternal' as const, winning_number: _winning_number, total_prize_amount: _total_prize_amount, picks: _picks, jetton_amount: _jetton_amount };
}

function storeTupleInitTicketInternal(source: InitTicketInternal) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.winning_number);
    builder.writeNumber(source.total_prize_amount);
    builder.writeNumber(source.picks);
    builder.writeNumber(source.jetton_amount);
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

export type ClaimPrize = {
    $$type: 'ClaimPrize';
    index_payload: Cell;
    pool_master: Address;
}

export function storeClaimPrize(src: ClaimPrize) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2348973855, 32);
        b_0.storeRef(src.index_payload);
        b_0.storeAddress(src.pool_master);
    };
}

export function loadClaimPrize(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2348973855) { throw Error('Invalid prefix'); }
    let _index_payload = sc_0.loadRef();
    let _pool_master = sc_0.loadAddress();
    return { $$type: 'ClaimPrize' as const, index_payload: _index_payload, pool_master: _pool_master };
}

function loadTupleClaimPrize(source: TupleReader) {
    let _index_payload = source.readCell();
    let _pool_master = source.readAddress();
    return { $$type: 'ClaimPrize' as const, index_payload: _index_payload, pool_master: _pool_master };
}

function storeTupleClaimPrize(source: ClaimPrize) {
    let builder = new TupleBuilder();
    builder.writeCell(source.index_payload);
    builder.writeAddress(source.pool_master);
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

export type ClaimJetton = {
    $$type: 'ClaimJetton';
    pool_master: Address;
}

export function storeClaimJetton(src: ClaimJetton) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(866039975, 32);
        b_0.storeAddress(src.pool_master);
    };
}

export function loadClaimJetton(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 866039975) { throw Error('Invalid prefix'); }
    let _pool_master = sc_0.loadAddress();
    return { $$type: 'ClaimJetton' as const, pool_master: _pool_master };
}

function loadTupleClaimJetton(source: TupleReader) {
    let _pool_master = source.readAddress();
    return { $$type: 'ClaimJetton' as const, pool_master: _pool_master };
}

function storeTupleClaimJetton(source: ClaimJetton) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.pool_master);
    return builder.build();
}

function dictValueParserClaimJetton(): DictionaryValue<ClaimJetton> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeClaimJetton(src)).endCell());
        },
        parse: (src) => {
            return loadClaimJetton(src.loadRef().beginParse());
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

export type JettonNotification = {
    $$type: 'JettonNotification';
    query_id: bigint;
    amount: bigint;
    from: Address;
    forward_payload: Cell;
}

export function storeJettonNotification(src: JettonNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadJettonNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'JettonNotification' as const, query_id: _query_id, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function loadTupleJettonNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _forward_payload = source.readCell();
    return { $$type: 'JettonNotification' as const, query_id: _query_id, amount: _amount, from: _from, forward_payload: _forward_payload };
}

function storeTupleJettonNotification(source: JettonNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeSlice(source.forward_payload);
    return builder.build();
}

function dictValueParserJettonNotification(): DictionaryValue<JettonNotification> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeJettonNotification(src)).endCell());
        },
        parse: (src) => {
            return loadJettonNotification(src.loadRef().beginParse());
        }
    }
}

export type JettonTransfer = {
    $$type: 'JettonTransfer';
    query_id: bigint;
    amount: bigint;
    destination: Address;
    response_destination: Address;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    forward_payload: Cell;
}

export function storeJettonTransfer(src: JettonTransfer) {
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

export function loadJettonTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260734629) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _destination = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0.asCell();
    return { $$type: 'JettonTransfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleJettonTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell();
    return { $$type: 'JettonTransfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleJettonTransfer(source: JettonTransfer) {
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

function dictValueParserJettonTransfer(): DictionaryValue<JettonTransfer> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeJettonTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadJettonTransfer(src.loadRef().beginParse());
        }
    }
}

export type PoolMasterData = {
    $$type: 'PoolMasterData';
    owner: Address;
    jetton_master: Address;
    jetton_wallet_code: Cell;
    twab: Twab;
    next_period: bigint;
    share_amount: bigint;
    borrow_amount: bigint;
    prize_amount: bigint;
    avail_prize_amount: bigint;
    jetton_amount: bigint;
}

export function storePoolMasterData(src: PoolMasterData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.jetton_master);
        b_0.storeRef(src.jetton_wallet_code);
        b_0.store(storeTwab(src.twab));
        b_0.storeUint(src.next_period, 32);
        b_0.storeCoins(src.share_amount);
        b_0.storeCoins(src.borrow_amount);
        let b_1 = new Builder();
        b_1.storeCoins(src.prize_amount);
        b_1.storeCoins(src.avail_prize_amount);
        b_1.storeCoins(src.jetton_amount);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadPoolMasterData(slice: Slice) {
    let sc_0 = slice;
    let _owner = sc_0.loadAddress();
    let _jetton_master = sc_0.loadAddress();
    let _jetton_wallet_code = sc_0.loadRef();
    let _twab = loadTwab(sc_0);
    let _next_period = sc_0.loadUintBig(32);
    let _share_amount = sc_0.loadCoins();
    let _borrow_amount = sc_0.loadCoins();
    let sc_1 = sc_0.loadRef().beginParse();
    let _prize_amount = sc_1.loadCoins();
    let _avail_prize_amount = sc_1.loadCoins();
    let _jetton_amount = sc_1.loadCoins();
    return { $$type: 'PoolMasterData' as const, owner: _owner, jetton_master: _jetton_master, jetton_wallet_code: _jetton_wallet_code, twab: _twab, next_period: _next_period, share_amount: _share_amount, borrow_amount: _borrow_amount, prize_amount: _prize_amount, avail_prize_amount: _avail_prize_amount, jetton_amount: _jetton_amount };
}

function loadTuplePoolMasterData(source: TupleReader) {
    let _owner = source.readAddress();
    let _jetton_master = source.readAddress();
    let _jetton_wallet_code = source.readCell();
    const _twab = loadTupleTwab(source.readTuple());
    let _next_period = source.readBigNumber();
    let _share_amount = source.readBigNumber();
    let _borrow_amount = source.readBigNumber();
    let _prize_amount = source.readBigNumber();
    let _avail_prize_amount = source.readBigNumber();
    let _jetton_amount = source.readBigNumber();
    return { $$type: 'PoolMasterData' as const, owner: _owner, jetton_master: _jetton_master, jetton_wallet_code: _jetton_wallet_code, twab: _twab, next_period: _next_period, share_amount: _share_amount, borrow_amount: _borrow_amount, prize_amount: _prize_amount, avail_prize_amount: _avail_prize_amount, jetton_amount: _jetton_amount };
}

function storeTuplePoolMasterData(source: PoolMasterData) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.jetton_master);
    builder.writeCell(source.jetton_wallet_code);
    builder.writeTuple(storeTupleTwab(source.twab));
    builder.writeNumber(source.next_period);
    builder.writeNumber(source.share_amount);
    builder.writeNumber(source.borrow_amount);
    builder.writeNumber(source.prize_amount);
    builder.writeNumber(source.avail_prize_amount);
    builder.writeNumber(source.jetton_amount);
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
    share_amount: bigint;
    debt_amount: bigint;
}

export function storePoolAccountData(src: PoolAccountData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.master);
        b_0.storeCoins(src.share_amount);
        b_0.storeCoins(src.debt_amount);
    };
}

export function loadPoolAccountData(slice: Slice) {
    let sc_0 = slice;
    let _owner = sc_0.loadAddress();
    let _master = sc_0.loadAddress();
    let _share_amount = sc_0.loadCoins();
    let _debt_amount = sc_0.loadCoins();
    return { $$type: 'PoolAccountData' as const, owner: _owner, master: _master, share_amount: _share_amount, debt_amount: _debt_amount };
}

function loadTuplePoolAccountData(source: TupleReader) {
    let _owner = source.readAddress();
    let _master = source.readAddress();
    let _share_amount = source.readBigNumber();
    let _debt_amount = source.readBigNumber();
    return { $$type: 'PoolAccountData' as const, owner: _owner, master: _master, share_amount: _share_amount, debt_amount: _debt_amount };
}

function storeTuplePoolAccountData(source: PoolAccountData) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeAddress(source.master);
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
    period: bigint;
    start: Twab | null;
    end: Twab | null;
    prize_amount: bigint;
    jetton_amount: bigint;
    winning_number: bigint;
}

export function storeDrawData(src: DrawData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.active);
        b_0.storeAddress(src.pool_master);
        b_0.storeUint(src.period, 32);
        if (src.start !== null && src.start !== undefined) { b_0.storeBit(true); b_0.store(storeTwab(src.start)); } else { b_0.storeBit(false); }
        if (src.end !== null && src.end !== undefined) { b_0.storeBit(true); b_0.store(storeTwab(src.end)); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.prize_amount);
        b_0.storeCoins(src.jetton_amount);
        b_0.storeUint(src.winning_number, 16);
    };
}

export function loadDrawData(slice: Slice) {
    let sc_0 = slice;
    let _active = sc_0.loadBit();
    let _pool_master = sc_0.loadAddress();
    let _period = sc_0.loadUintBig(32);
    let _start = sc_0.loadBit() ? loadTwab(sc_0) : null;
    let _end = sc_0.loadBit() ? loadTwab(sc_0) : null;
    let _prize_amount = sc_0.loadCoins();
    let _jetton_amount = sc_0.loadCoins();
    let _winning_number = sc_0.loadUintBig(16);
    return { $$type: 'DrawData' as const, active: _active, pool_master: _pool_master, period: _period, start: _start, end: _end, prize_amount: _prize_amount, jetton_amount: _jetton_amount, winning_number: _winning_number };
}

function loadTupleDrawData(source: TupleReader) {
    let _active = source.readBoolean();
    let _pool_master = source.readAddress();
    let _period = source.readBigNumber();
    const _start_p = source.readTupleOpt();
    const _start = _start_p ? loadTupleTwab(_start_p) : null;
    const _end_p = source.readTupleOpt();
    const _end = _end_p ? loadTupleTwab(_end_p) : null;
    let _prize_amount = source.readBigNumber();
    let _jetton_amount = source.readBigNumber();
    let _winning_number = source.readBigNumber();
    return { $$type: 'DrawData' as const, active: _active, pool_master: _pool_master, period: _period, start: _start, end: _end, prize_amount: _prize_amount, jetton_amount: _jetton_amount, winning_number: _winning_number };
}

function storeTupleDrawData(source: DrawData) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.active);
    builder.writeAddress(source.pool_master);
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
    builder.writeNumber(source.jetton_amount);
    builder.writeNumber(source.winning_number);
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
    pool_master: Address;
    period: bigint;
    picks: bigint;
    jetton_amount: bigint;
}

export function storeTicketData(src: TicketData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.active);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.pool_master);
        b_0.storeUint(src.period, 32);
        b_0.storeUint(src.picks, 16);
        b_0.storeCoins(src.jetton_amount);
    };
}

export function loadTicketData(slice: Slice) {
    let sc_0 = slice;
    let _active = sc_0.loadBit();
    let _owner = sc_0.loadAddress();
    let _pool_master = sc_0.loadAddress();
    let _period = sc_0.loadUintBig(32);
    let _picks = sc_0.loadUintBig(16);
    let _jetton_amount = sc_0.loadCoins();
    return { $$type: 'TicketData' as const, active: _active, owner: _owner, pool_master: _pool_master, period: _period, picks: _picks, jetton_amount: _jetton_amount };
}

function loadTupleTicketData(source: TupleReader) {
    let _active = source.readBoolean();
    let _owner = source.readAddress();
    let _pool_master = source.readAddress();
    let _period = source.readBigNumber();
    let _picks = source.readBigNumber();
    let _jetton_amount = source.readBigNumber();
    return { $$type: 'TicketData' as const, active: _active, owner: _owner, pool_master: _pool_master, period: _period, picks: _picks, jetton_amount: _jetton_amount };
}

function storeTupleTicketData(source: TicketData) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.active);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.pool_master);
    builder.writeNumber(source.period);
    builder.writeNumber(source.picks);
    builder.writeNumber(source.jetton_amount);
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

export type WinningSplit = {
    $$type: 'WinningSplit';
    n0: bigint;
    n1: bigint;
    n2: bigint;
}

export function storeWinningSplit(src: WinningSplit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.n0, 8);
        b_0.storeUint(src.n1, 8);
        b_0.storeUint(src.n2, 8);
    };
}

export function loadWinningSplit(slice: Slice) {
    let sc_0 = slice;
    let _n0 = sc_0.loadUintBig(8);
    let _n1 = sc_0.loadUintBig(8);
    let _n2 = sc_0.loadUintBig(8);
    return { $$type: 'WinningSplit' as const, n0: _n0, n1: _n1, n2: _n2 };
}

function loadTupleWinningSplit(source: TupleReader) {
    let _n0 = source.readBigNumber();
    let _n1 = source.readBigNumber();
    let _n2 = source.readBigNumber();
    return { $$type: 'WinningSplit' as const, n0: _n0, n1: _n1, n2: _n2 };
}

function storeTupleWinningSplit(source: WinningSplit) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.n0);
    builder.writeNumber(source.n1);
    builder.writeNumber(source.n2);
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

 type PoolMaster_init_args = {
    $$type: 'PoolMaster_init_args';
    owner: Address;
    jetton_master: Address;
    jetton_wallet_code: Cell;
}

function initPoolMaster_init_args(src: PoolMaster_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.jetton_master);
        b_0.storeRef(src.jetton_wallet_code);
    };
}

async function PoolMaster_init(owner: Address, jetton_master: Address, jetton_wallet_code: Cell) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initPoolMaster_init_args({ $$type: 'PoolMaster_init_args', owner, jetton_master, jetton_wallet_code })(builder);
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
    5910: { message: `Only ticket` },
    5913: { message: `Only draw` },
    8459: { message: `Invalid twab timestamp` },
    10349: { message: `Start time >= timestamp` },
    11439: { message: `Zero average balance` },
    16022: { message: `Insufficient picks` },
    16874: { message: `Zero jetton amount` },
    16960: { message: `Invalid claim amount` },
    17110: { message: `Draw already initialized` },
    19074: { message: `Empty twab store` },
    19102: { message: `Account locked` },
    19317: { message: `Invalid timestamp` },
    23432: { message: `timestamp >= End time` },
    27755: { message: `Insufficient prize amount` },
    30347: { message: `Invalid repay amount` },
    30919: { message: `Ticket is active` },
    31206: { message: `Start time >= End time` },
    40127: { message: `Only pool account` },
    43086: { message: `Only pool master` },
    45150: { message: `Only jetton wallet` },
    46002: { message: `Pick used` },
    46439: { message: `Invalid withdraw amount` },
    47447: { message: `Invalid borrow amount` },
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
    {"name":"Borrow","header":1154673471,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"Repay","header":3449863297,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"DepositInternal","header":2706550035,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"user","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"WithdrawInternal","header":4279924659,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"user","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ClaimPrizeInternal","header":2692664058,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"period","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"user","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Withdraw","header":195467089,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"DepositFinish","header":3488820906,"fields":[{"name":"timestamp","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"WithdrawFinish","header":339761243,"fields":[{"name":"timestamp","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"PrepareInitTicket","header":2292165562,"fields":[{"name":"period","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"start","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"end","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"winning_number","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"prize_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"jetton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"avg_balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"ticket_code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"ticket_data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"PayPrizeDebtInternal","header":1233654330,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"user","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ClaimPrizeDebt","header":738691372,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"prize_reserve","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"InitDraw","header":3109422989,"fields":[{"name":"twab_timestamp","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"twab_amount","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"refund_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"OpenDraw","header":2194139508,"fields":[{"name":"twab_timestamp","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"twab_amount","type":{"kind":"simple","type":"uint","optional":false,"format":128}},{"name":"prize_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"jetton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"refund_address","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"InitTicket","header":518518837,"fields":[{"name":"pool_account","type":{"kind":"simple","type":"address","optional":false}},{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"ClaimJettonInternal","header":3910874751,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"period","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"user","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"InitTicketInternal","header":2551503563,"fields":[{"name":"winning_number","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"total_prize_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"picks","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"jetton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"ClaimPrize","header":2348973855,"fields":[{"name":"index_payload","type":{"kind":"simple","type":"cell","optional":false}},{"name":"pool_master","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ClaimJetton","header":866039975,"fields":[{"name":"pool_master","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ClaimPrizeDebtInternal","header":875353941,"fields":[{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"user","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"JettonNotification","header":1935855772,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"JettonTransfer","header":260734629,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"PoolMasterData","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"jetton_master","type":{"kind":"simple","type":"address","optional":false}},{"name":"jetton_wallet_code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"twab","type":{"kind":"simple","type":"Twab","optional":false}},{"name":"next_period","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"share_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"borrow_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"prize_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"avail_prize_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"jetton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"PoolAccountData","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"master","type":{"kind":"simple","type":"address","optional":false}},{"name":"share_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"debt_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"DrawData","header":null,"fields":[{"name":"active","type":{"kind":"simple","type":"bool","optional":false}},{"name":"pool_master","type":{"kind":"simple","type":"address","optional":false}},{"name":"period","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"start","type":{"kind":"simple","type":"Twab","optional":true}},{"name":"end","type":{"kind":"simple","type":"Twab","optional":true}},{"name":"prize_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"jetton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"winning_number","type":{"kind":"simple","type":"uint","optional":false,"format":16}}]},
    {"name":"TicketData","header":null,"fields":[{"name":"active","type":{"kind":"simple","type":"bool","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"pool_master","type":{"kind":"simple","type":"address","optional":false}},{"name":"period","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"picks","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"jetton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"PrizeReserveData","header":null,"fields":[{"name":"pool_master","type":{"kind":"simple","type":"address","optional":false}},{"name":"balance","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"WinningSplit","header":null,"fields":[{"name":"n0","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"n1","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"n2","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
]

const PoolMaster_getters: ABIGetter[] = [
    {"name":"get_core_data","arguments":[],"returnType":{"kind":"simple","type":"PoolMasterData","optional":false}},
    {"name":"get_account_address","arguments":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"get_draw_address","arguments":[{"name":"period","type":{"kind":"simple","type":"int","optional":false,"format":257}}],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
]

const PoolMaster_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"text","text":"init draw"}},
    {"receiver":"internal","message":{"kind":"text","text":"open draw"}},
    {"receiver":"internal","message":{"kind":"typed","type":"JettonNotification"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Repay"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Borrow"}},
    {"receiver":"internal","message":{"kind":"typed","type":"DepositInternal"}},
    {"receiver":"internal","message":{"kind":"typed","type":"WithdrawInternal"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ClaimPrizeInternal"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ClaimJettonInternal"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ChangeOwner"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class PoolMaster implements Contract {
    
    static async init(owner: Address, jetton_master: Address, jetton_wallet_code: Cell) {
        return await PoolMaster_init(owner, jetton_master, jetton_wallet_code);
    }
    
    static async fromInit(owner: Address, jetton_master: Address, jetton_wallet_code: Cell) {
        const init = await PoolMaster_init(owner, jetton_master, jetton_wallet_code);
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: 'init draw' | 'open draw' | JettonNotification | Repay | Borrow | DepositInternal | WithdrawInternal | ClaimPrizeInternal | ClaimJettonInternal | ChangeOwner | Deploy) {
        
        let body: Cell | null = null;
        if (message === 'init draw') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'open draw') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'JettonNotification') {
            body = beginCell().store(storeJettonNotification(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Repay') {
            body = beginCell().store(storeRepay(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Borrow') {
            body = beginCell().store(storeBorrow(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'DepositInternal') {
            body = beginCell().store(storeDepositInternal(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'WithdrawInternal') {
            body = beginCell().store(storeWithdrawInternal(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ClaimPrizeInternal') {
            body = beginCell().store(storeClaimPrizeInternal(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ClaimJettonInternal') {
            body = beginCell().store(storeClaimJettonInternal(message)).endCell();
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