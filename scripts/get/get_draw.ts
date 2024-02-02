import { Draw } from "../../output/contract_Draw";
import { Client, TestPeriod, Deployments } from "../utils";

async function main() {
    const draw = await Draw.fromInit(Deployments.PoolMaster, Deployments.PrizeReserve, TestPeriod);
    const draw_contract = Client.open(draw);
    // get core data
    const data = await draw_contract.getGetCoreData();
    console.log("Draw data:", data);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});