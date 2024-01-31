import { TonClient4, WalletContractV4 } from "@ton/ton";
import { toNano } from "@ton/core";
import { mnemonicToWalletKey } from "@ton/crypto";
import { PoolMaster } from "../output/contract_PoolMaster";
import { Deployments } from "./deployments";

import * as dotenv from "dotenv";
dotenv.config();

async function main() {
    // Parameters
    const workchain = 0; //we are working in basechain.
    const client = new TonClient4({
        endpoint: "https://sandbox-v4.tonhubapi.com",
    });
    const mnemonics = (process.env.MNEMONICS || "").toString();
    const keyPair = await mnemonicToWalletKey(mnemonics.split(" "));
    const wallet = WalletContractV4.create({
        workchain,
        publicKey: keyPair.publicKey,
    });
    const sender = client.open(wallet).sender(keyPair.secretKey);

    const pool = PoolMaster.fromAddress(Deployments.PoolMaster);    // Create initial data for our contract
    const pool_client = client.open(pool);
    await pool_client.send(
        sender,
        { value: toNano("0.51") },
        "init draw"
    );
    // const pool_account_address = await pool_client.getGetAccountAddress(wallet.address);
    // console.log("Pool account address", pool_account_address.toString({ testOnly: true }));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});