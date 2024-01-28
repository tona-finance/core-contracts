import { TonClient4, WalletContractV4 } from "@ton/ton";
import { toNano, contractAddress } from "@ton/core";
import { mnemonicToWalletKey } from "@ton/crypto";
import { StakingPool } from "../output/mock_StakingPool";
import { JettonMaster } from "../output/mock_JettonMaster";
import { buildOnchainMetadata } from "./jetton_helper";

import * as dotenv from "dotenv";
dotenv.config();

async function main() {
    // Parameters
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
    
    const jetton_params = {
        name: "Tontogether",
        description: "TonTogether Jetton on Testnet",
        symbol: "TNT",
    };
    const jetton_content = buildOnchainMetadata(jetton_params);
    const pool = await StakingPool.fromInit(jetton_content);
    await client.open(pool).send(
        sender,
        { value: toNano("0.2") },
        "init jetton master",
    );
    console.log("Staking Pool address:", pool.address.toString({ testOnly: true }));

    const jetton_master = await JettonMaster.init(pool.address, jetton_content);
    const jetton_master_address = contractAddress(0, jetton_master);
    console.log("Jetton Master address:", jetton_master_address.toString({ testOnly: true }));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});