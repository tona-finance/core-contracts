import { Address, Cell } from "@ton/core";
import { TonClient4, WalletContractV4 } from "@ton/ton";
import { KeyPair, mnemonicToWalletKey } from "@ton/crypto";
import walletHex from "./external/jetton-wallet.compiled.json";
import * as dotenv from "dotenv";

dotenv.config();

export const Client = new TonClient4({
    endpoint: "https://mainnet-v4.tonhubapi.com",
    timeout: 30000,
});

export const JettonData = {
    Master: Address.parse("EQAcjv-v76upZgRoRNUM6tCmd6d9Q09sWVTFqCdfLeuP4P3b"),
    WalletCode: Cell.fromBoc(Buffer.from(walletHex.hex, "hex"))[0],
}

export const Deployments = {
    PoolMaster: Address.parse("EQDO03QyvVmM2mooZgg4o27ptFW3IIfzSd46vNcxdBfSZ5FP"),
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
