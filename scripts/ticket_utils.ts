import { Address, beginCell, Cell } from "@ton/core";

export const CARDINALITY: number = 4;
export const PICK_BITS: number = 4 * 4;
export const TOTAL_PICKS: number = 1 << PICK_BITS;
export const CHOICES: number = 16;

const PRIZE_SCALE_0: number = 16 * 16 * 15 * 250;
const PRIZE_SCALE_1: number = 16 * 16 * 750;
const PRIZE_SCALE_2: number = 16 * 2250;
const PRIZE_SCALE_3: number = 1 * 6750;
const TOTAL_PRIZE_SCALE: number = 16 * 16 * 15 * 10000;


export type WinningPick = {
    index: bigint;
    tier: number;
}

export function computePrizeAmount(
    total_prize_amount: bigint,
    winning_picks: WinningPick[],
): bigint {
    let scale = 0;
    for (let pick of winning_picks) {
        switch (pick.tier) {
        case 0:
            scale += PRIZE_SCALE_0;
            break;
        case 1:
            scale += PRIZE_SCALE_1;
            break;
        case 2:
            scale += PRIZE_SCALE_2;
            break;
        case 3:
            scale += PRIZE_SCALE_3;
            break;
        }
    }
    return (total_prize_amount * BigInt(scale)) / BigInt(TOTAL_PRIZE_SCALE);
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

export function packWinningPicks(picks: WinningPick[]): Cell {
    let builder = beginCell();
    for (let i = 0; i < 2; i++) {
        let inner_builder = beginCell();
        for (let j = 0; j < 63; j++) {
            const pick = picks.pop();
            if (typeof pick === "undefined") {
                break;
            } else {
                inner_builder.storeUint(pick.index, PICK_BITS);
            }
        }
        builder.storeRef(inner_builder.endCell());
    }
    return builder.endCell();
}

export function computePickNumber(address: Address, index: bigint): bigint {
    let digest = beginCell()
        .storeAddress(address)
        .storeUint(index, PICK_BITS)
        .endCell()
        .hash();
    return BigInt(`0x${digest.toString("hex")}`) % BigInt(TOTAL_PICKS);
}

function computePrizeTier(pick_number: bigint, winning_number: bigint): number {
    let tier = CARDINALITY;
    let user_num = pick_number % BigInt(CHOICES);
    let win_num = winning_number % BigInt(CHOICES);
    while (user_num === win_num && tier > 0) {
        tier -= 1;
        pick_number = pick_number / BigInt(CHOICES);
        winning_number = winning_number / BigInt(CHOICES);
        user_num = pick_number % BigInt(CHOICES);
        win_num = winning_number % BigInt(CHOICES);
    }
    return tier;
}