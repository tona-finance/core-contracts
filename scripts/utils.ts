import { Address, Cell } from "@ton/core";
import { TonClient4, WalletContractV4 } from "@ton/ton";
import { KeyPair, mnemonicToWalletKey } from "@ton/crypto";
import walletHex from "./external/jetton-wallet.compiled.json";
import * as dotenv from "dotenv";

dotenv.config();

export const Client = new TonClient4({
    endpoint: "https://sandbox-v4.tonhubapi.com",
    timeout: 30000,
});

export const JettonData = {
    Master: Address.parse("kQCsqg_POVsThlKL9g4R9OY3Q10Ie2sqT5Oe0AzUPgTLKDlv"),
    WalletCode: Cell.fromBoc(Buffer.from(walletHex.hex, "hex"))[0],
}

export const Deployments = {
    PoolMaster: Address.parse("kQCDb3xYOT1gEJfRzOAGRSE31qjWIOEVXC4iTpy39I5wPkQJ"),
    PrizeReserve: Address.parse("kQAfbrwf3df37_QcVEBZ4bov1Vfrpf6a9hmtJnafNwahmAWd"),
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
