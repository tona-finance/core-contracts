import { Address, beginCell, fromNano, toNano, Cell } from "@ton/core";
import { ContractSystem } from "@tact-lang/emulator";
import { TicketTester } from "../output/test_TicketTester";

const PICK_BITS: number = 4 * 5;
const TOTAL_PICKS: bigint = BigInt(1 << PICK_BITS);

function computePickNumber(address: Address, index: bigint): bigint {
    let digest = beginCell()
        .storeAddress(address)
        .storeUint(index, PICK_BITS)
        .endCell()
        .hash();
    return BigInt(`0x${digest.toString("hex")}`) % TOTAL_PICKS;
}

function packPickIndexes(indexes: bigint[]): Cell {
    let builder = beginCell();
    indexes.forEach((index) => {
        builder.storeUint(index, PICK_BITS);
    });
    return builder.endCell();
}

async function main() {
    // Create ContractSystem and deploy contract
    let system = await ContractSystem.create();
    let owner = system.treasure("owner", 0);
    let tester = await TicketTester.fromInit(owner.address, TOTAL_PICKS);
    let contract = system.open(tester);
    system.name(contract.address, "main");
    let track = system.track(contract);

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

    const index_payload = packPickIndexes(Array.from({ length: 51 }, (_, i) => BigInt(i)));
    await contract.send(
        owner,
        { value: toNano("1.0") },
        {
            $$type: "ComputePickPayload",
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