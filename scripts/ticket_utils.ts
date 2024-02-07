import { Address, beginCell, Cell } from "@ton/core";

export const CARDINALITY: number = 3;
export const PICK_BITS: number = CARDINALITY * 4;
export const TOTAL_PICKS: number = 1 << PICK_BITS;
export const CHOICES: number = 16;

const PRIZE_SCALE_0: number = 16 * 15 * 5;
const PRIZE_SCALE_1: number = 16 * 20;
const PRIZE_SCALE_2: number = 1 * 75;
const BASE_PRIZE_SCALE: number = 16 * 15 * 100;


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
        }
    }
    return (total_prize_amount * BigInt(scale)) / BigInt(BASE_PRIZE_SCALE);
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
    for (let i = 0; i < 85; i++) {
        const pick = picks.pop();
        if (typeof pick === "undefined") {
            break;
        } else {
            builder.storeUint(pick.index, PICK_BITS);
        }
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