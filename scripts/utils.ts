import { Address } from "@ton/core";
import { TonClient4, WalletContractV4, Sender } from "@ton/ton";
import { KeyPair, mnemonicToWalletKey } from "@ton/crypto";

import * as dotenv from "dotenv";
dotenv.config();

export const Client = new TonClient4({
    endpoint: "https://sandbox-v4.tonhubapi.com",
    timeout: 30000,
});

export const Deployments = {
    PoolMaster: Address.parse("kQCplbDx0lNOrSL0KTIRBUNTUqT5QpuQiOqdEuYluTbJfSYg"),
    PrizeReserve: Address.parse("kQAPopoiPXpC5xg3q_6lYqlpoZaOqJ0TwCeYmhb-ZQilJa6B"),
}

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
