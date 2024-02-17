import { Address, beginCell, Cell, Contract, ContractProvider, Sender, SendMode } from '@ton/core';

export class TonstakersPool implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new TonstakersPool(address);
    }

    async sendDeposit(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell()
                .storeUint(0x47d54391, 32) // op = pool::deposit
                .storeUint(1, 64) // query id
                .endCell(),
        });
    }

    // Get methods

    // async getDepositMinter(provider: ContractProvider) {
    //     let res = await this.getFullData(provider);
    //     return PayoutCollection.createFromAddress(res.depositPayout!);
    // }

    // async getWithdrawalMinter(provider: ContractProvider) {
    //     let res = await this.getFullData(provider);
    //     return PayoutCollection.createFromAddress(res.withdrawalPayout!);
    // }

    // async getFinanceData(provider: ContractProvider) {
    //     return await this.getFullData(provider);
    // }

    // async getLoan(provider: ContractProvider, controllerId: number, validator: Address, previous=false, updateRound=true) {
    //     const args = new TupleBuilder();
    //     args.writeNumber(controllerId);
    //     args.writeAddress(validator);
    //     args.writeBoolean(previous);
    //     args.writeBoolean(updateRound);
    //     let { stack } = await provider.get('get_loan', args.build());
    //     return {
    //         borrowed: stack.readBigNumber(),
    //         interestAmount: stack.readBigNumber(),
    //     }
    // }

    // async getRoundId(provider: ContractProvider) {
    //     let res = await this.getFullData(provider);
    //     return res.currentRound.roundId;
    // }

    // async getControllerAddress(provider: ContractProvider, id:number, validator: Address) {
    //   const {stack} = await provider.get('get_controller_address', [
    //     {type: 'int', value: BigInt(id)},
    //     {type: 'slice', cell: beginCell().storeAddress(validator).endCell()}
    //   ]);

    //   return stack.readAddress();
    // }

    // async getFullData(provider: ContractProvider) {
    //     let { stack } = await provider.get('get_pool_full_data', []);
    //     let state = stack.readNumber() as State;
    //     let halted = stack.readBoolean();
    //     let totalBalance = stack.readBigNumber();
    //     let interestRate = stack.readNumber();
    //     let optimisticDepositWithdrawals = stack.readBoolean();
    //     let depositsOpen = stack.readBoolean();
    //     let savedValidatorSetHash = stack.readBigNumber();

    //     let prv = stack.readTuple();
    //     let prvBorrowers = prv.readCellOpt();
    //     let prvRoundId = prv.readNumber();
    //     let prvActiveBorrowers = prv.readBigNumber();
    //     let prvBorrowed = prv.readBigNumber();
    //     let prvExpected = prv.readBigNumber();
    //     let prvReturned = prv.readBigNumber();
    //     let prvProfit = prv.readBigNumber();
    //     let previousRound = {
    //       borrowers: prvBorrowers,
    //       roundId: prvRoundId,
    //       activeBorrowers: prvActiveBorrowers,
    //       borrowed: prvBorrowed,
    //       expected: prvExpected,
    //       returned: prvReturned,
    //       profit: prvProfit
    //     };

    //     let cur = stack.readTuple();
    //     let curBorrowers = cur.readCellOpt();
    //     let curRoundId = cur.readNumber();
    //     let curActiveBorrowers = cur.readBigNumber();
    //     let curBorrowed = cur.readBigNumber();
    //     let curExpected = cur.readBigNumber();
    //     let curReturned = cur.readBigNumber();
    //     let curProfit = cur.readBigNumber();
    //     let currentRound = {
    //       borrowers: curBorrowers,
    //       roundId: curRoundId,
    //       activeBorrowers: curActiveBorrowers,
    //       borrowed: curBorrowed,
    //       expected: curExpected,
    //       returned: curReturned,
    //       profit: curProfit
    //     };

    //     let minLoan = stack.readBigNumber();
    //     let maxLoan = stack.readBigNumber();
    //     let governanceFee = stack.readNumber();


    //     let poolJettonMinter = stack.readAddress();
    //     let poolJettonSupply = stack.readBigNumber();

    //     let depositPayout = stack.readAddressOpt();
    //     let requestedForDeposit = stack.readBigNumber();

    //     let withdrawalPayout = stack.readAddressOpt();
    //     let requestedForWithdrawal = stack.readBigNumber();

    //     let sudoer = stack.readAddress();
    //     let sudoerSetAt = stack.readNumber();

    //     let governor = stack.readAddress();
    //     let governorUpdateAfter = stack.readNumber();
    //     let interestManager = stack.readAddress();
    //     let halter = stack.readAddress();
    //     let approver = stack.readAddress();

    //     let controllerCode = stack.readCell();
    //     let jettonWalletCode = stack.readCell();
    //     let payoutMinterCode = stack.readCell();

    //     let projectedTotalBalance = stack.readBigNumber();
    //     let projectedPoolSupply = stack.readBigNumber();

    //     return {
    //         state, halted,
    //         totalBalance, interestRate,
    //         optimisticDepositWithdrawals, depositsOpen,
    //         savedValidatorSetHash,

    //         previousRound, currentRound,

    //         minLoan, maxLoan,
    //         governanceFee,

    //         poolJettonMinter, poolJettonSupply, supply:poolJettonSupply,
    //         depositPayout, requestedForDeposit,
    //         withdrawalPayout, requestedForWithdrawal,

    //         sudoer, sudoerSetAt,
    //         governor, governorUpdateAfter,
    //         interestManager,
    //         halter,
    //         approver,

    //         controllerCode,
    //         jettonWalletCode,
    //         payoutMinterCode,
    //         projectedTotalBalance,
    //         projectedPoolSupply,
    //     };
    // }

    // async getFullDataRaw(provider: ContractProvider) {
    //     let { stack } = await provider.get('get_pool_full_data_raw', []);
    //     let state = stack.readNumber() as State;
    //     let halted = stack.readBoolean();
    //     let totalBalance = stack.readBigNumber();
    //     let interestRate = stack.readNumber();
    //     let optimisticDepositWithdrawals = stack.readBoolean();
    //     let depositsOpen = stack.readBoolean();
    //     let savedValidatorSetHash = stack.readBigNumber();

    //     let prv = stack.readTuple();
    //     let prvBorrowers = prv.readCellOpt();
    //     let prvRoundId = prv.readNumber();
    //     let prvActiveBorrowers = prv.readBigNumber();
    //     let prvBorrowed = prv.readBigNumber();
    //     let prvExpected = prv.readBigNumber();
    //     let prvReturned = prv.readBigNumber();
    //     let prvProfit = prv.readBigNumber();
    //     let previousRound = {
    //       borrowers: prvBorrowers,
    //       roundId: prvRoundId,
    //       activeBorrowers: prvActiveBorrowers,
    //       borrowed: prvBorrowed,
    //       expected: prvExpected,
    //       returned: prvReturned,
    //       profit: prvProfit
    //     };

    //     let cur = stack.readTuple();
    //     let curBorrowers = cur.readCellOpt();
    //     let curRoundId = cur.readNumber();
    //     let curActiveBorrowers = cur.readBigNumber();
    //     let curBorrowed = cur.readBigNumber();
    //     let curExpected = cur.readBigNumber();
    //     let curReturned = cur.readBigNumber();
    //     let curProfit = cur.readBigNumber();
    //     let currentRound = {
    //       borrowers: curBorrowers,
    //       roundId: curRoundId,
    //       activeBorrowers: curActiveBorrowers,
    //       borrowed: curBorrowed,
    //       expected: curExpected,
    //       returned: curReturned,
    //       profit: curProfit
    //     };

    //     let minLoan = stack.readBigNumber();
    //     let maxLoan = stack.readBigNumber();
    //     let governanceFee = stack.readNumber();


    //     let poolJettonMinter = stack.readAddress();
    //     let poolJettonSupply = stack.readBigNumber();

    //     let depositPayout = stack.readAddressOpt();
    //     let requestedForDeposit = stack.readBigNumber();

    //     let withdrawalPayout = stack.readAddressOpt();
    //     let requestedForWithdrawal = stack.readBigNumber();

    //     let sudoer = stack.readAddress();
    //     let sudoerSetAt = stack.readNumber();

    //     let governor = stack.readAddress();
    //     let governorUpdateAfter = stack.readNumber();
    //     let interestManager = stack.readAddress();
    //     let halter = stack.readAddress();
    //     let approver = stack.readAddress();

    //     let controllerCode = stack.readCell();
    //     let jettonWalletCode = stack.readCell();
    //     let payoutMinterCode = stack.readCell();

    //     let projectedTotalBalance = stack.readBigNumber();
    //     let projectedPoolSupply = stack.readBigNumber();

    //     return {
    //         state, halted,
    //         totalBalance, interestRate,
    //         optimisticDepositWithdrawals, depositsOpen,
    //         savedValidatorSetHash,

    //         previousRound, currentRound,

    //         minLoan, maxLoan,
    //         governanceFee,

    //         poolJettonMinter, poolJettonSupply, supply:poolJettonSupply,
    //         depositPayout, requestedForDeposit,
    //         withdrawalPayout, requestedForWithdrawal,

    //         sudoer, sudoerSetAt,
    //         governor, governorUpdateAfter,
    //         interestManager,
    //         halter,
    //         approver,

    //         controllerCode,
    //         jettonWalletCode,
    //         payoutMinterCode,
    //         projectedTotalBalance,
    //         projectedPoolSupply,
    //     };
    // }
}