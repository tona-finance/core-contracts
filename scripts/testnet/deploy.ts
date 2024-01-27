import { TonClient4, WalletContractV4 } from "@ton/ton";
import { Cell, Address, toNano } from "@ton/core";
import { mnemonicToPrivateKey } from "@ton/crypto";
import { PoolMaster } from "../../output/contract_PoolMaster";
import { PrizeReserve } from "../../output/contract_PrizeReserve";

async function main() {
    // Parameters
    const testnet = true;
    const workchain = 0; //we are working in basechain.
    //create client for testnet sandboxv4 API - alternative endpoint
    const client = new TonClient4({
        endpoint: "https://sandbox-v4.tonhubapi.com",
    });
    const mnemonics = (process.env.MNEMONICS || "").toString();
    const keyPair = await mnemonicToPrivateKey(mnemonics.split(" "));
    const wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });
    const sender = client.open(wallet).sender(keyPair.secretKey);

    const owner = Address.parse("0QDEhu_wx6a-uvGY7uXmtqrCibuRHx_0VjxMIGJZ_338ce_n");
    const tonstakers = Address.parse("kQDSeyYF8VOJoMG8zLHwolVLoZzBMbzpaVC156wT3Cg4tjul");
    const jetton_master = Address.parse("kQD-XDmLg97MFLzsLIhnPEMFzacyKnOHEMD3ktBsNev-OmYS");
    const jetton_wallet_code = Cell.fromBase64("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");
    // Prepare deploy
    const pool = await PoolMaster.fromInit(owner, tonstakers, jetton_master, jetton_wallet_code);
    await client.open(pool).send(
        sender,
        { value: toNano("0.2") },
        {
            $$type: 'Deploy',
            queryId: BigInt(0),
        },
    );
    // Present a deployment link and contract address
    console.log('Pool Master address: ' + pool.address.toString({ testOnly: testnet }));

    const reserve = await PrizeReserve.fromInit(pool.address, tonstakers, jetton_master, jetton_wallet_code);;    // Create initial data for our contract 
    await client.open(reserve).send(
        sender,
        { value: toNano("0.2") },
        {
            $$type: 'Deploy',
            queryId: BigInt(0),
        },
    );
    // Present a deployment link and contract address
    console.log('Prize Reserve address: ' + reserve.address.toString({ testOnly: testnet }));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});