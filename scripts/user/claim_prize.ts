import { toNano } from "@ton/core";
import { Draw } from "../../output/contract_Draw";
import { Ticket } from "../../output/contract_Ticket";
import { Deployments, TestPeriod, Client, getKeyPair, getWallet } from "../utils";
import { computeWinningPicks, packWinningPicks } from "../ticket_utils";

async function main() {
    // Parameters
    const keypair = await getKeyPair();
    const wallet = await getWallet(keypair);
    const sender = Client.open(wallet).sender(keypair.secretKey);

    const draw = await Draw.fromInit(Deployments.PoolMaster, TestPeriod);
    const draw_data = await Client.open(draw).getGetCoreData();
    const ticket = await Ticket.fromInit(wallet.address, Deployments.PoolMaster, TestPeriod);
    const ticket_client = Client.open(ticket);
    const ticket_data = await ticket_client.getGetCoreData();

    let winning_picks = computeWinningPicks(
        ticket.address,
        ticket_data.picks,
        draw_data.winning_number,
    );
    winning_picks.sort((a, b) => a.tier - b.tier);
    const payload = packWinningPicks(winning_picks);
    ticket_client.send(
        sender,
        { value: toNano("0.51") },
        {
            $$type: "ClaimPrize",
            index_payload: payload,
            pool_master: Deployments.PoolMaster,
        }
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});