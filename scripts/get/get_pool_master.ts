import { PoolMaster } from "../../output/contract_PoolMaster";
import { Client, Deployments } from "../utils";

async function main() {
    const pool_master = PoolMaster.fromAddress(Deployments.PoolMaster);
    const pool_master_contract = Client.open(pool_master);
    // get core data
    console.log("Pool core data:", await pool_master_contract.getGetCoreData());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});