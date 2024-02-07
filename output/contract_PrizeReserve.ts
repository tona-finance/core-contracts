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

 type PrizeReserve_init_args = {
    $$type: 'PrizeReserve_init_args';
    pool_master: Address;
}

function initPrizeReserve_init_args(src: PrizeReserve_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.pool_master);
    };
}

async function PrizeReserve_init(pool_master: Address) {
    const __code = Cell.fromBase64('te6ccgECFQEABSsAART/APSkE/S88sgLAQIBYgIDAs7QAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxZ2zzy4ILI+EMBzH8BygABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8Wye1UFAQCAVgODwLUAZIwf+BwIddJwh+VMCDXCx/eIMAAItdJwSGwklt/4CCCEDQs11W6jrUw0x8BghA0LNdVuvLggfoA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBJsEts8f+CCEJRqmLa64wIwcAUGArRRIgGCAJy/AvhDURLbPHBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCI+ELHBRLy9PhBbyQHCAKY0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBtbW0ibrOZWyBu8tCAbyIBkTLi+EFvJBNfA/gnbxABoYIImJaAueMPfwsMAYgC0PQEMG0hgVu5AYAQ9A9vofLghwGBW7kiAoAQ9BcCgSRuAYAQ9A9vofLghxKBJG4BAoAQ9BfIAcj0AMkBzHABygBAAwkBomwx+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDD6ADFx1yH6ADH6ADCnA6sAggiYloCg+CdvEIIImJaAoQGhIqFw+wJwWoEAgm1tbQoAflkg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyQHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wANAe6CCJiWgHD7AhAkcAMEgQCCUCPIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7AA0B3BAkcAMEgEJQI8hxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsADQCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzACVu70YJwXOw9XSyuex6E7DnWSoUbZoJwndY1LStkfLMi068t/fFiOYJwIFXAG4BnY5TOWDquRyWyw4JwnZdOWrNOy3M6DpZtlGbopIAgFIEBEAEbCvu1E0NIAAYAIBIBITASWuGG2efBO3iEEETEtAUKkINglAFAB1rN3Ghq0uDM5nReXqLatOSWrMLMoMJqpOTmtNLs8nBmaMSUpnKg0PTK4Mi01rTEpmKU8mjkkJZqpGsEAAsu1E0NQB+GPSAAGOIPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4Igx4Pgo1wsKgwm68uCJ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHR');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initPrizeReserve_init_args({ $$type: 'PrizeReserve_init_args', pool_master })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const PrizeReserve_errors: { [key: number]: { message: string } } = {
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

const PrizeReserve_types: ABIType[] = [
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

const PrizeReserve_getters: ABIGetter[] = [
    {"name":"get_core_data","arguments":[],"returnType":{"kind":"simple","type":"PrizeReserveData","optional":false}},
]

const PrizeReserve_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"typed","type":"ClaimPrizeDebtInternal"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class PrizeReserve implements Contract {
    
    static async init(pool_master: Address) {
        return await PrizeReserve_init(pool_master);
    }
    
    static async fromInit(pool_master: Address) {
        const init = await PrizeReserve_init(pool_master);
        const address = contractAddress(0, init);
        return new PrizeReserve(address, init);
    }
    
    static fromAddress(address: Address) {
        return new PrizeReserve(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  PrizeReserve_types,
        getters: PrizeReserve_getters,
        receivers: PrizeReserve_receivers,
        errors: PrizeReserve_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | ClaimPrizeDebtInternal | Deploy) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'ClaimPrizeDebtInternal') {
            body = beginCell().store(storeClaimPrizeDebtInternal(message)).endCell();
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
        const result = loadTuplePrizeReserveData(source);
        return result;
    }
    
}