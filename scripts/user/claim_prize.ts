import { toNano } from "@ton/core";
import { PoolAccount } from "../../output/contract_PoolAccount";
import { Draw } from "../../output/contract_Draw";
import { Ticket } from "../../output/contract_Ticket";
import { Deployments, TestPeriod, Client, getKeyPair, getWallet } from "../utils";
import { computeWinningPicks, packWinningPicks } from "../ticket_utils";

async function main() {
    // Parameters
    const keypair = await getKeyPair();
    const wallet = await getWallet(keypair);
    const sender = Client.open(wallet).sender(keypair.secretKey);

    const account = await PoolAccount.fromInit(wallet.address, Deployments.PoolMaster, Deployments.PrizeReserve);
    const draw = await Draw.fromInit(Deployments.PoolMaster, Deployments.PrizeReserve, TestPeriod);
    const draw_data = await Client.open(draw).getGetCoreData();
    const ticket = await Ticket.fromInit(wallet.address, account.address, draw.address, TestPeriod);
    const ticket_client = Client.open(ticket);
    const ticket_data = await ticket_client.getGetCoreData();

    let winning_picks = computeWinningPicks(
        ticket.address,
        ticket_data.picks,
        draw_data.winning_number,
    );
    winning_picks.sort((a, b) => a.tier - b.tier);
    // console.log(winning_picks);
    // packWinningPicks(winning_picks);
    // packWinningPicks(winning_picks);
    // packWinningPicks(winning_picks);
    const payload = packWinningPicks(winning_picks);
    ticket_client.send(
        sender,
        { value: toNano("1.0") },
        {
            $$type: "ClaimPrize",
            index_payload: payload
        }
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});