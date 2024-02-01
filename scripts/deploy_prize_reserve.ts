import { toNano } from "@ton/core";
import { PoolMaster } from "../output/contract_PoolMaster";
import { PrizeReserve } from "../output/contract_PrizeReserve";
import { Client, getKeyPair, getWallet } from "./utils";

async function main() {
    // Parameters
    const keypair = await getKeyPair();
    const wallet = await getWallet(keypair);
    const sender = Client.open(wallet).sender(keypair.secretKey);

    const pool_master = await PoolMaster.fromInit(wallet.address);
    const prize_reserve = await PrizeReserve.fromInit(pool_master.address);
    await Client.open(prize_reserve).send(
        sender,
        { value: toNano("0.1") },
        {
            $$type: "Deploy",
            queryId: 0n,
        },
    );
    console.log("Prize Reserve address", prize_reserve.address.toString({ testOnly: true }));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});