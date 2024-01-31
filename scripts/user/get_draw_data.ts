import { Address, TonClient4 } from "@ton/ton";
import { PoolMaster } from "../../output/contract_PoolMaster";
import { Draw } from "../../output/contract_Draw";
import { Deployments } from "../deployments";

import * as dotenv from "dotenv";
dotenv.config();

async function main() {
    //create client for testnet sandboxv4 API - alternative endpoint
    const client = new TonClient4({
        endpoint: "https://sandbox-v4.tonhubapi.com",
    });

    const period = 0n;
    const draw = await Draw.fromInit(Deployments.PoolMaster, Deployments.PrizeReserve, period);
    const draw_contract = client.open(draw);
    // get core data
    const data = await draw_contract.getGetCoreData();
    console.log("Draw data: ", data);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});