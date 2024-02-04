import { toNano } from "@ton/core";
import { PoolMaster } from "../../output/contract_PoolMaster";
import { Deployments, Client, getKeyPair, getWallet } from "../utils";

async function main() {
    // Parameters
    const keypair = await getKeyPair();
    const wallet = await getWallet(keypair);
    const sender = Client.open(wallet).sender(keypair.secretKey);

    const pool = PoolMaster.fromAddress(Deployments.PoolMaster);    // Create initial data for our contract
    await Client.open(pool).send(
        sender,
        { value: toNano("0.41") },
        "open draw"
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});