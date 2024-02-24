import { toNano } from "@ton/core";
import { Draw } from "../../output/contract_Draw";
import { PoolAccount } from "../../output/contract_PoolAccount";
import { Ticket } from "../../output/contract_Ticket";
import { Deployments, TestPeriod, Client, getKeyPair, getWallet } from "../utils";

import * as dotenv from "dotenv";
dotenv.config();

async function main() {
    // Parameters
    const keypair = await getKeyPair();
    const wallet = await getWallet(keypair);
    const sender = Client.open(wallet).sender(keypair.secretKey);

    const pool_account = await PoolAccount.fromInit(wallet.address, Deployments.PoolMaster);
    const draw = await Draw.fromInit(Deployments.PoolMaster, TestPeriod);    // Create initial data for our contract
    const ticket = await Ticket.init(wallet.address, Deployments.PoolMaster, TestPeriod);    // Create initial data for our contract
    await Client.open(draw).send(
        sender,
        { value: toNano("0.4") },
        {
            $$type: "InitTicket",
            pool_account: pool_account.address,
            code: ticket.code,
            data: ticket.data,
        }
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});