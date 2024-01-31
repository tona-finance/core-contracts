import { TonClient4, WalletContractV4 } from "@ton/ton";
import { toNano } from "@ton/core";
import { mnemonicToWalletKey } from "@ton/crypto";
import { PoolMaster } from "../output/contract_PoolMaster";
import { PrizeReserve } from "../output/contract_PrizeReserve";

import * as dotenv from "dotenv";
dotenv.config();

async function main() {
    // Parameters
    const workchain = 0; //we are working in basechain.
    const client = new TonClient4({
        endpoint: "https://sandbox-v4.tonhubapi.com",
    });
    const mnemonics = (process.env.MNEMONICS || "").toString();
    const keyPair = await mnemonicToWalletKey(mnemonics.split(" "));
    const wallet = WalletContractV4.create({
        workchain,
        publicKey: keyPair.publicKey,
    });
    const sender = client.open(wallet).sender(keyPair.secretKey);

    const pool_master = await PoolMaster.fromInit(wallet.address);
    await client.open(pool_master).send(
        sender,
        { value: toNano("0.2") },
        {
            $$type: "Deploy",
            queryId: 0n,
        },
    );
    console.log("Pool Master address", pool_master.address.toString({ testOnly: true }));

    const prize_reserve = await PrizeReserve.fromInit(pool_master.address);
    await client.open(prize_reserve).send(
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