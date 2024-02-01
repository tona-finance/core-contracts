import { toNano } from "@ton/core";
import { PoolAccount } from "../../output/contract_PoolAccount";
import { Deployments, Client, getKeyPair, getWallet } from "../utils";

import * as dotenv from "dotenv";
dotenv.config();

async function main() {
    // Parameters
    const keypair = await getKeyPair();
    const wallet = await getWallet(keypair);
    const sender = Client.open(wallet).sender(keypair.secretKey);

    const account = await PoolAccount.fromInit(wallet.address, Deployments.PoolMaster, Deployments.PrizeReserve);
    await Client.open(account).send(
        sender,
        { value: toNano("0.11") },
        {
            $$type: "Withdraw",
            amount: toNano("0.2")
        }
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});