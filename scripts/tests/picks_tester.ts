import { fromNano, toNano } from "@ton/core";
import { ContractSystem } from "@tact-lang/emulator";
import { TicketTester } from "../../output/test_TicketTester";
import { computeWinningPicks, packWinningPicks, computePrizeAmount } from "../ticket_utils";
import { assert } from "console";


async function main() {
    // Create ContractSystem and deploy contract
    const system = await ContractSystem.create();
    const owner = system.treasure("owner", 0);

    const picks = 900n;
    const winning_number = 0n;
    const prize_amount = toNano("1000");
    const ticket_tester = await TicketTester.fromInit(owner.address, picks, prize_amount, winning_number);
    const ticket_contract = system.open(ticket_tester);
    system.name(ticket_contract.address, "ticket");
    // let track = system.track(contract);

    
    await ticket_contract.send(
        owner,
        { value: toNano("1.0") },
        {
            $$type: "Deploy",
            queryId: 0n,
        },
    );


    // const index = 0n;
    // const expected_number = BigInt(computePickNumber(ticket_contract.address, index));
    // await ticket_contract.send(
    //     owner,
    //     { value: toNano("1.0") },
    //     {
    //         $$type: "ComputePickNumber",
    //         index,
    //         expected_number,
    //     },
    // )
    // let txs = await system.run();
    // txs.forEach((tx) => {
    //     if (tx.description.type === "generic") {
    //         console.log("aborted:", tx.description.aborted);
    //     }
    // })



    let winning_picks = computeWinningPicks(
        ticket_contract.address,
        picks,
        winning_number,
    );
    assert(winning_picks.length > 0 && winning_picks.length <= 63, "Unexpected winning picks");
    winning_picks.sort((a, b) => a.tier - b.tier);
    // get prize amount
    let expected_amount = computePrizeAmount(prize_amount, winning_picks);
    await ticket_contract.send(
        owner,
        { value: toNano("2.0") },
        {
            $$type: "ComputePrizeAmount",
            expected_amount,
            index_payload: packWinningPicks(winning_picks),
        },
    )
    let txs = await system.run();
    txs.forEach((tx) => {
        console.log("Fees:", fromNano(tx.totalFees.coins));
        if (tx.description.type === "generic") {
            if (tx.description.aborted) {
                console.log("aborted:", tx.description);
            }
        }
    })
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});