import { toNano } from "@ton/core";
import { Address, TonClient4, WalletContractV4 } from "@ton/ton";
import { mnemonicToPrivateKey } from "@ton/crypto";
import { StakingPool } from "../output/mock_StakingPool";

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
    const pool_address = Address.parse("kQDNdqTH1gw-IOj1ngwWZwvssejx_WiER1BXNyr8lq_4-dM3");
    const pool = StakingPool.fromAddress(pool_address);
    await client.open(pool).send(
        sender,
        { value: toNano("0.5") },
        "init jetton master",
    );
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});