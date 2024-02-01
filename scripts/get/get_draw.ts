import { Draw } from "../../output/contract_Draw";
import { Client, Deployments } from "../utils";

async function main() {
    const period = 0n;
    const draw = await Draw.fromInit(Deployments.PoolMaster, Deployments.PrizeReserve, period);
    const draw_contract = Client.open(draw);
    // get core data
    const data = await draw_contract.getGetCoreData();
    console.log("Draw data:", data);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});