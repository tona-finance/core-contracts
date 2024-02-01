import { Address, beginCell } from "@ton/core";
import { getKeyPair, getWallet } from "../utils";

const PICK_BITS: number = 4 * 5;
const TOTAL_PICKS: number = 1 << PICK_BITS;

function computeWinningNumber(address: Address, index: number) {
    let digest = beginCell()
        .storeAddress(address)
        .storeUint(index, PICK_BITS)
        .endCell()
        .hash();

    console.log("pick 1:", digest.readUint32BE(0) % TOTAL_PICKS);
    console.log("pick 2:", digest.readUint32BE(32 - PICK_BITS) % TOTAL_PICKS);
    console.log("pick 3:", digest.readUint32LE(0) % TOTAL_PICKS);
    console.log("pick 4:", digest.readUint32LE(32 - PICK_BITS) % TOTAL_PICKS);

    // return digest.readUint32BE(0) % TOTAL_PICKS;
}

async function main() {
    // Parameters
    const keypair = await getKeyPair();
    const wallet = await getWallet(keypair);

    computeWinningNumber(wallet.address, 0);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});