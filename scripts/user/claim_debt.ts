import { toNano } from "@ton/core";
import { PoolAccount } from "../../output/contract_PoolAccount";
import { Deployments, Client, getKeyPair, getWallet } from "../utils";

async function main() {
    // Parameters
    const keypair = await getKeyPair();
    const wallet = await getWallet(keypair);
    const sender = Client.open(wallet).sender(keypair.secretKey);

    const pool_account = await PoolAccount.fromInit(wallet.address, Deployments.PoolMaster);
    const pool_account_client = Client.open(pool_account);
    const pool_account_data = await pool_account_client.getGetCoreData();
    console.log("Pool account debt:", pool_account_data.debt_amount);

    pool_account_client.send(
        sender,
        { value: toNano("0.1") },
        {
            $$type: "ClaimPrizeDebt",
            amount: pool_account_data.debt_amount,
        }
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});