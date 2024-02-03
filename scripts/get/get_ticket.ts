import { Draw } from "../../output/contract_Draw";
import { PoolAccount } from "../../output/contract_PoolAccount";
import { Ticket } from "../../output/contract_Ticket";
import { Client, Deployments, TestPeriod, getKeyPair, getWallet } from "../utils";
import { computeWinningPicks, computePrizeAmount } from "../ticket_utils";
import { fromNano } from "@ton/core";

async function main() {
    const keypair = await getKeyPair();
    const wallet = await getWallet(keypair);

    const pool_account = await PoolAccount.fromInit(wallet.address, Deployments.PoolMaster, Deployments.PrizeReserve);
    const draw = await Draw.fromInit(Deployments.PoolMaster, Deployments.PrizeReserve, TestPeriod);
    const draw_contract = Client.open(draw);
    const draw_data = await draw_contract.getGetCoreData();
    console.log("Draw data:", draw_data);

    const ticket = await Ticket.fromInit(wallet.address, pool_account.address, draw.address, TestPeriod);
    const ticket_contract = Client.open(ticket);
    // get core data
    const ticket_data = await ticket_contract.getGetCoreData();
    console.log("Ticket data:", ticket_data);

    // get winning picks
    let winning_picks = computeWinningPicks(
        ticket.address,
        ticket_data.picks,
        draw_data.winning_number,
    );
    winning_picks.sort((a, b) => a.tier - b.tier);
    console.log("Winning picks:", winning_picks.length);

    // get prize amount
    const prize_amount = computePrizeAmount(draw_data.prize_amount, winning_picks);
    console.log("Obtain prize amount:", fromNano(prize_amount));

    // console.log(await ticket_contract.getGetIndexStatus(winning_picks[1].index));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});