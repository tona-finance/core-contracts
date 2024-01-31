import { WalletContractV4, TonClient4 } from "@ton/ton";
import { mnemonicToWalletKey } from "@ton/crypto";
import { PoolMaster } from "../output/contract_PoolMaster";
import { PoolAccount } from "../output/contract_PoolAccount";
import { Deployments } from "./deployments";

import * as dotenv from "dotenv";
dotenv.config();

async function main() {
    //create client for testnet sandboxv4 API - alternative endpoint
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

    const pool_master = PoolMaster.fromAddress(Deployments.PoolMaster);
    const pool_master_contract = client.open(pool_master);
    // get core data
    const data = await pool_master_contract.getGetCoreData();
    console.log("Pool core data: ", data);

    // get pool account address
    const pool_account = await pool_master_contract.getGetAccountAddress(wallet.address);

    const pool_account_contract = client.open(PoolAccount.fromAddress(pool_account));
    // get pool account data
    const pool_account_data = await pool_account_contract.getGetCoreData();
    console.log("Pool account data: ", pool_account_data);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});