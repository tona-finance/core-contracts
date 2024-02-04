import { PoolAccount } from "../../output/contract_PoolAccount";
import { Client, Deployments, getKeyPair, getWallet } from "../utils";

async function main() {
    const keypair = await getKeyPair();
    const wallet = await getWallet(keypair);

    // get pool account address
    const pool_account = await PoolAccount.fromInit(wallet.address, Deployments.PoolMaster, Deployments.PrizeReserve);
    const pool_account_contract = Client.open(pool_account);
    // get pool account data
    console.log("Pool account data:", await pool_account_contract.getGetCoreData());
    // console.log("Pool account twab size:", await pool_account_contract.getGetTwabSize());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});