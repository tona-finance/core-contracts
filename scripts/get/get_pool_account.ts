import { PoolMaster } from "../../output/contract_PoolMaster";
import { PoolAccount } from "../../output/contract_PoolAccount";
import { Client, Deployments, getKeyPair, getWallet } from "../utils";

async function main() {
    const keypair = await getKeyPair();
    const wallet = await getWallet(keypair);

    const pool_master = PoolMaster.fromAddress(Deployments.PoolMaster);
    const pool_master_contract = Client.open(pool_master);
    // get pool account address
    const pool_account = await pool_master_contract.getGetAccountAddress(wallet.address);
    const pool_account_contract = Client.open(PoolAccount.fromAddress(pool_account));
    // get pool account data
    console.log("Pool account data:", await pool_account_contract.getGetCoreData());
    console.log("Pool account twab size:", await pool_account_contract.getGetTwabSize());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});