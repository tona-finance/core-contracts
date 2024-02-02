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
        { value: toNano("2.0") },
        "deposit"
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});