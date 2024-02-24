import { Draw } from "../../output/contract_Draw";
import { PoolAccount } from "../../output/contract_PoolAccount";
import { Client, Deployments, TestPeriod, getKeyPair, getWallet } from "../utils";
import { TOTAL_PICKS } from "../ticket_utils";

async function main() {
    const keypair = await getKeyPair();
    const wallet = await getWallet(keypair);

    const pool_account = await PoolAccount.fromInit(wallet.address, Deployments.PoolMaster);
    const pool_account_contract = Client.open(pool_account);

    const draw = await Draw.fromInit(Deployments.PoolMaster, TestPeriod);
    const draw_contract = Client.open(draw);
    
    const draw_data = await draw_contract.getGetCoreData();
    const draw_start = draw_data.start!;
    const draw_end = draw_data.end!;
    const draw_avg_balance = (draw_end.amount - draw_start.amount) / (draw_end.timestamp - draw_start.timestamp);
    const user_start = await pool_account_contract.getBinarySearchTwab(draw_start.timestamp)
    const user_end = await pool_account_contract.getBinarySearchTwab(draw_end.timestamp)
    const user_avg_balance = (user_end.amount - user_start.amount) / (user_end.timestamp - user_start.timestamp);
    const picks = BigInt(TOTAL_PICKS) * user_avg_balance / draw_avg_balance;
    console.log("Compute picks:", picks);
    const jetton_amount = draw_data.jetton_amount * user_avg_balance / draw_avg_balance;
    console.log("Compute jetton amount:", jetton_amount);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});