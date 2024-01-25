import { Address, toNano, TonClient4, WalletContractV4 } from "@ton/ton";
import { mnemonicToPrivateKey } from "@ton/crypto";
import { PoolMaster } from "../../output/contract_PoolMaster";

import * as dotenv from "dotenv";
dotenv.config();

async function main() {
    //create client for testnet sandboxv4 API - alternative endpoint
    const client = new TonClient4({
        endpoint: "https://sandbox-v4.tonhubapi.com",
        // endpoint: "https://mainnet-v4.tonhubapi.com",
    });
    const pool_master_addr = Address.parse("EQBXepQVtavYp-PqgIhez_ZzsVxOrQTQVAJiyWG0zWIUPBTj");

    const mnemonics = (process.env.MNEMONICS || "").toString();
    const keyPair = await mnemonicToPrivateKey(mnemonics.split(" "));
    const workchain = 0; //we are working in basechain.
    const wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });
    const sender = client.open(wallet).sender(keyPair.secretKey);

    const pool_master = PoolMaster.fromAddress(pool_master_addr);
    await client.open(pool_master).send(
        sender,
        { value: toNano("0.5") },
        "init account",
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});