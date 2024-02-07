import { toNano } from "@ton/core";
import { Ticket } from "../../output/contract_Ticket";
import { Deployments, TestPeriod, Client, getKeyPair, getWallet } from "../utils";

async function main() {
    // Parameters
    const keypair = await getKeyPair();
    const wallet = await getWallet(keypair);
    const sender = Client.open(wallet).sender(keypair.secretKey);

    const ticket = await Ticket.fromInit(wallet.address, Deployments.PoolMaster, TestPeriod);
    const ticket_client = Client.open(ticket);
    ticket_client.send(
        sender,
        { value: toNano("0.1") },
        {
            $$type: "ClaimJetton",
            pool_master: Deployments.PoolMaster,
        }
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});