import { Address, beginCell, Cell } from "@ton/core";
import { assert } from "console";

export const PICK_BITS: number = 4 * 5;
export const TOTAL_PICKS: bigint = BigInt(1 << PICK_BITS);
export const CARDINALITY: number = 5;
export const CHOICES: bigint = BigInt(16);

export type WinningPick = {
    index: bigint;
    tier: number;
}

export type PrizePercentage = {
    percent0: bigint;
    percent1: bigint;
    percent2: bigint;
    percent3: bigint;
    percent4: bigint;
}

export function prizeAmountPerPick(
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

export function computeWinningPicks(
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

export function packWinningPicksIndex(batch_picks: WinningPick[][]): Cell {
    let builder = beginCell();
    batch_picks.forEach((picks) => {
        assert(picks.length <= 51, "Picks length > 51");
        let builder_internal = beginCell();
        picks.forEach((pick) => {
            builder_internal.storeUint(pick.index, PICK_BITS);
        });
        builder.storeRef(builder_internal.endCell());
    });
    return builder.endCell();
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