import { toNano } from "@ton/core";
import { PoolMaster } from "../../output/contract_PoolMaster";
import { Deployments, Client, getKeyPair, getWallet } from "../utils";

async function main() {
    // Parameters
    const keypair = await getKeyPair();
    const wallet = await getWallet(keypair);
    const sender = Client.open(wallet).sender(keypair.secretKey);

    const pool = PoolMaster.fromAddress(Deployments.PoolMaster);    // Create initial data for our contract
    const prize_amount = toNano("2.0");
    await Client.open(pool).send(
        sender,
        { value: prize_amount + toNano("0.1") },
        {
            $$type: "Repay",
            amount: prize_amount,
        }
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});