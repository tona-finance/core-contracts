import { toNano } from "@ton/core";
import { Draw } from "../../output/contract_Draw";
import { PoolAccount } from "../../output/contract_PoolAccount";
import { Deployments, Client, getKeyPair, getWallet } from "../utils";

import * as dotenv from "dotenv";
dotenv.config();

async function main() {
    // Parameters
    const keypair = await getKeyPair();
    const wallet = await getWallet(keypair);
    const sender = Client.open(wallet).sender(keypair.secretKey);

    const period = 0n;
    const pool_account = await PoolAccount.fromInit(wallet.address, Deployments.PoolMaster, Deployments.PrizeReserve);
    const draw = await Draw.fromInit(Deployments.PoolMaster, Deployments.PrizeReserve, period);    // Create initial data for our contract
    await Client.open(draw).send(
        sender,
        { value: toNano("0.5") },
        {
            $$type: "InitTicket",
            pool_account: pool_account.address,
        }
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});