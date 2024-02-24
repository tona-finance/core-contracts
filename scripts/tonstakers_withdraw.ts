import { Address, beginCell, Cell, Contract, ContractProvider, Sender, SendMode } from '@ton/core';


export class TonstakersWallet implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new TonstakersWallet(address);
    }

    static burnMessage(
        jetton_amount: bigint,
        responseAddress:Address,
        customPayload: Cell | null,
    ) {
        return beginCell()
            .storeUint(0x595f07bc, 32)
            .storeUint(0, 64) // op, queryId
            .storeCoins(jetton_amount)
            .storeAddress(responseAddress)
            .storeMaybeRef(customPayload)
            .endCell();
    }

    async sendBurn(
        provider: ContractProvider,
        via: Sender,
        value: bigint,
        jetton_amount: bigint,
        responseAddress:Address,
        customPayload: Cell | null,
    ) {
        await provider.internal(via, {
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: TonstakersWallet.burnMessage(jetton_amount, responseAddress, customPayload),
            value:value
        });
    }

    async sendBurnWithParams(
        provider: ContractProvider, via: Sender, value: bigint,
        jetton_amount: bigint,
        responseAddress: Address,
        waitTillRoundEnd: boolean, // opposite of request_immediate_withdrawal
        fillOrKill: boolean,
    ) {
        let customPayload = beginCell()
            .storeUint(Number(waitTillRoundEnd), 1)
            .storeUint(Number(fillOrKill), 1)
            .endCell();
        return this.sendBurn(provider, via, value, jetton_amount, responseAddress, customPayload);
    }
}