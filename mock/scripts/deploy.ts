import * as fs from "fs";
import { contractAddress } from "@ton/core";
import { StakingPool } from "../output/mock_StakingPool";
import { JettonMaster } from "../output/mock_JettonMaster";
import { buildOnchainMetadata } from "./jetton_helper";
import { prepareTactDeployment } from "@tact-lang/deployer";


async function main() {
    // Parameters
    const testnet = true;
    const jetton_params = {
        name: "Tontogether",
        description: "TonTogether Jetton on Testnet",
        symbol: "TNT",
    };
    const jetton_content = buildOnchainMetadata(jetton_params);
    const pool_init = await StakingPool.init(jetton_content);
    const pool_address = contractAddress(0, pool_init);
    const pool_data = pool_init.data.toBoc();
    const pool_pkg = fs.readFileSync("mock/output/mock_StakingPool.pkg");
    const pool_link = await prepareTactDeployment({
        pkg: pool_pkg,
        data: pool_data,
        testnet: testnet,
    });
    // Present a deployment link and contract address
    console.log("Staking Pool address: " + pool_address.toString({ testOnly: testnet }));
    console.log("Staking Pool Deploy link: " + pool_link);

    const jetton_master_init = await JettonMaster.init(pool_address, jetton_content);
    const jetton_master_address = contractAddress(0, jetton_master_init);
    console.log("Jetton master address: ", jetton_master_address.toString({ testOnly: testnet }));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});