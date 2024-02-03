import { Address } from "@ton/core";
import { TonClient4, WalletContractV4 } from "@ton/ton";
import { KeyPair, mnemonicToWalletKey } from "@ton/crypto";

import * as dotenv from "dotenv";
dotenv.config();

export const Client = new TonClient4({
    endpoint: "https://sandbox-v4.tonhubapi.com",
    timeout: 30000,
});

export const Deployments = {
    PoolMaster: Address.parse("kQC5-pl45WSCcHHQu8GqiJH-LysQDXNVqsJtor-eAkcfwRhz"),
    PrizeReserve: Address.parse("kQDoFWTI81TBrjXDKuu_7iCUqZTZrhBXPtDtL2_DQ4EIBZjJ"),
}

export const TestPeriod = 0n;

export async function getKeyPair(): Promise<KeyPair> {
    const mnemonics = (process.env.MNEMONICS || "").toString();
    return await mnemonicToWalletKey(mnemonics.split(" "));
}

export async function getWallet(keyPair: KeyPair): Promise<WalletContractV4> {
    return WalletContractV4.create({
        workchain: 0,
        publicKey: keyPair.publicKey,
    });
}
