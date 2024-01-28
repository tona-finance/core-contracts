import { toNano } from "@ton/core";
import { Address, TonClient4, WalletContractV4 } from "@ton/ton";
import { mnemonicToPrivateKey } from "@ton/crypto";
import { PoolMaster } from "../../output/contract_PoolMaster";

async function main() {
    // Parameters
    const workchain = 0; //we are working in basechain.
    //create client for testnet sandboxv4 API - alternative endpoint
    const client = new TonClient4({
        endpoint: "https://sandbox-v4.tonhubapi.com",
    });
    const mnemonics = (process.env.MNEMONICS || "").toString();
    const keyPair = await mnemonicToPrivateKey(mnemonics.split(" "));
    const wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });
    const sender = client.open(wallet).sender(keyPair.secretKey);
    const pool_address = Address.parse("kQCNpyW35LMg7smwokx8J83HsWHoHfLJnidaufZJgDocm2HP");
    const pool = PoolMaster.fromAddress(pool_address);
    await client.open(pool).send(
        sender,
        { value: toNano("0.1") },
        "init jetton wallet",
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});