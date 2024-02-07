import { toNano } from "@ton/core";
import { PoolMaster } from "../output/contract_PoolMaster";
import { Client, JettonData, getKeyPair, getWallet } from "./utils";

async function main() {
    // Parameters
    const keypair = await getKeyPair();
    const wallet = await getWallet(keypair);
    const sender = Client.open(wallet).sender(keypair.secretKey);

    const pool_master = await PoolMaster.fromInit(wallet.address, JettonData.Master, JettonData.WalletCode);
    await Client.open(pool_master).send(
        sender,
        { value: toNano("0.2") },
        {
            $$type: "Deploy",
            queryId: 0n,
        },
    );
    console.log("Pool Master address", pool_master.address.toString({ testOnly: true }));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});