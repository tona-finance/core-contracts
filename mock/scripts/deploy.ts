import { toNano } from "@ton/core";
import { TonClient4, WalletContractV4 } from "@ton/ton";
import { mnemonicToPrivateKey } from "@ton/crypto";
import { StakingPool } from "../output/mock_StakingPool";
import { JettonMaster } from "../output/mock_JettonMaster";
import { buildOnchainMetadata } from "./jetton_helper";

async function main() {
    // Parameters
    const testnet = true;
    const workchain = 0; //we are working in basechain.
    //create client for testnet sandboxv4 API - alternative endpoint
    const client = new TonClient4({
        endpoint: "https://sandbox-v4.tonhubapi.com",
    });
    const mnemonics = (process.env.MNEMONICS || "").toString();
    const keyPair = await mnemonicToPrivateKey(mnemonics.split(" "));
    const wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });
    const sender = client.open(wallet).sender(keyPair.secretKey);

    // deploy
    const jetton_params = {
        name: "Tontogether",
        description: "TonTogether Jetton on Testnet",
        symbol: "TNT",
    };
    const jetton_content = buildOnchainMetadata(jetton_params);
    const pool = await StakingPool.fromInit(jetton_content);
    const pool_contract = client.open(pool);
    await pool_contract.send(
        sender,
        { value: toNano("0.2") },
        "init jetton master",
    );
    const jetton_master_address = await pool_contract.getJettonMaster();
    console.log('Staking Pool address: ', pool.address.toString({ testOnly: testnet }));
    console.log("Jetton master address: ", jetton_master_address.toString({ testOnly: testnet }));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});