import { Draw } from "../../output/contract_Draw";
import { PoolAccount } from "../../output/contract_PoolAccount";
import { Ticket } from "../../output/contract_Ticket";
import { Client, Deployments, getKeyPair, getWallet } from "../utils";

async function main() {
    const keypair = await getKeyPair();
    const wallet = await getWallet(keypair);

    const pool_account = await PoolAccount.fromInit(wallet.address, Deployments.PoolMaster, Deployments.PrizeReserve);
    const period = 0n;
    const draw = await Draw.fromInit(Deployments.PoolMaster, Deployments.PrizeReserve, period);
    const ticket = await Ticket.fromInit(wallet.address, pool_account.address, draw.address, period);
    const ticket_contract = Client.open(ticket);
    // get core data
    const data = await ticket_contract.getGetCoreData();
    console.log("Ticket data:", data);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});