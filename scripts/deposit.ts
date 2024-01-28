import { TonClient4, WalletContractV4 } from "@ton/ton";
import { Address, toNano } from "@ton/core";
import { mnemonicToWalletKey } from "@ton/crypto";
import { PoolAccount } from "../output/contract_PoolAccount";

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

    const account_address = Address.parse("kQAhCf_7kwY-o25PtvmuJBW-SZJ4pMnpK3p9UUrFkA_hIA2P");
    const account = PoolAccount.fromAddress(account_address);    // Create initial data for our contract
    const account_client = client.open(account);
    await account_client.send(
        sender,
        { value: toNano("2.0") },
        {
            $$type: "Deposit",
            query_id: 0n,
        }
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});