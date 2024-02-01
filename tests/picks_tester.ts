import { Address, beginCell, fromNano, toNano, Cell } from "@ton/core";
import { ContractSystem } from "@tact-lang/emulator";
import { TicketTester } from "../output/test_TicketTester";
import { PrizeTester } from "../output/test_PrizeTester";

const PICK_BITS: number = 4 * 5;
const TOTAL_PICKS: bigint = BigInt(1 << PICK_BITS);
const CARDINALITY: number = 5;
const CHOICES: bigint = BigInt(16);

type WinningPick = {
    index: bigint;
    tier: number;
}

type PrizePercentage = {
    percent0: bigint;
    percent1: bigint;
    percent2: bigint;
    percent3: bigint;
    percent4: bigint;
}

function computePickNumber(address: Address, index: bigint): bigint {
    let digest = beginCell()
        .storeAddress(address)
        .storeUint(index, PICK_BITS)
        .endCell()
        .hash();
    return BigInt(`0x${digest.toString("hex")}`) % TOTAL_PICKS;
}

function computePrizeTier(pick_number: bigint, winning_number: bigint): number {
    let tier = CARDINALITY;
    let user_num = pick_number % CHOICES;
    let win_num = winning_number % CHOICES;
    while (user_num !== win_num && tier > 0) {
        tier -= 1;
        pick_number = pick_number / CHOICES;
        winning_number = winning_number / CHOICES;
        user_num = pick_number % CHOICES;
        win_num = winning_number % CHOICES;
    }
    return tier;
}

function prizeAmountPerPick(
    tier: number,
    total_prize_amount: bigint,
    percentage: PrizePercentage,
): bigint {
    switch (tier) {
    case 0:
        return (total_prize_amount * percentage.percent0) / 100n;
    case 1:
        return (total_prize_amount * percentage.percent1) / 1500n;
    case 2:
        return (total_prize_amount * percentage.percent2) / 24000n;
    case 3:
        return (total_prize_amount * percentage.percent3) / 384000n;
    case 4:
        return (total_prize_amount * percentage.percent4) / 6144000n;
    default:
        return 0n;
    }
}

function computeWinningPicks(
    address: Address,
    picks: bigint,
    winning_number: bigint,
): WinningPick[] {
    let winning_picks = new Array<WinningPick>();
    for (let index = 0n; index < picks; index++) {
        let pick_number = computePickNumber(address, index);
        let tier = computePrizeTier(pick_number, winning_number);
        if (tier < CARDINALITY) {
            winning_picks.push({ index, tier });
        }
    }
    return winning_picks;
}

function packPickIndexes(indexes: bigint[]): Cell {
    let builder = beginCell();
    indexes.forEach((index) => {
        builder.storeUint(index, PICK_BITS);
    });
    return builder.endCell();
}

function packCells(cell: Cell[]): Cell {
    let builder = beginCell();
    cell.forEach((cell) => {
        builder.storeRef(cell);
    });
    return builder.endCell();
}

async function main() {
    // Create ContractSystem and deploy contract
    let system = await ContractSystem.create();
    let owner = system.treasure("owner", 0);
    let ticket_tester = await TicketTester.fromInit(owner.address, TOTAL_PICKS);
    let prize_tester = await PrizeTester.fromInit(toNano("1000"));
    let ticket_contract = system.open(ticket_tester);
    let prize_contract = system.open(prize_tester);
    system.name(ticket_contract.address, "ticket");
    system.name(prize_contract.address, "prize");
    // let track = system.track(contract);

    // const index = 0n;
    // const expected_number = BigInt(computePickNumber(contract.address, index));
    // await contract.send(
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

    await ticket_contract.send(
        owner,
        { value: toNano("0.5") },
        {
            $$type: "Deploy",
            queryId: 0n,
        },
    )
    await prize_contract.send(
        owner,
        { value: toNano("0.5") },
        {
            $$type: "Deploy",
            queryId: 0n,
        },
    )

    const index_payload_1 = packPickIndexes(Array.from({ length: 51 }, (_, i) => BigInt(i)));
    const index_payload_2 = packPickIndexes(Array.from({ length: 51 }, (_, i) => BigInt(i + 51)));
    const index_payload_3 = packPickIndexes(Array.from({ length: 51 }, (_, i) => BigInt(i + 102)));
    const index_payload = packCells([index_payload_1, index_payload_2, index_payload_3]);
    await ticket_contract.send(
        owner,
        { value: toNano("2.0") },
        {
            $$type: "ComputePickPayload",
            prize_tester: prize_contract.address,
            index_payload,
        },
    )
    let txs = await system.run();
    txs.forEach((tx) => {
        console.log("Fees:", fromNano(tx.totalFees.coins));
        if (tx.description.type === "generic") {
            console.log("aborted:", tx.description.aborted);
        }
    })
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});