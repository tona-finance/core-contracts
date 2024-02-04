import { toNano } from "@ton/core";
import { PoolAccount } from "../../output/contract_PoolAccount";
import { Deployments, Client, getKeyPair, getWallet } from "../utils";

async function main() {
    // Parameters
    const keypair = await getKeyPair();
    const wallet = await getWallet(keypair);
    const sender = Client.open(wallet).sender(keypair.secretKey);

    const account = await PoolAccount.fromInit(wallet.address, Deployments.PoolMaster, Deployments.PrizeReserve);
    const account_client = Client.open(account);
    await account_client.send(
        sender,
        { value: toNano("0.2") },
        {
            $$type: "Deploy",
            queryId: 0n,
        }
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});