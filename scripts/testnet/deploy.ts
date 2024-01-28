import * as fs from "fs";
import { TonClient4, WalletContractV4 } from "@ton/ton";
import { Cell, Address, toNano, contractAddress } from "@ton/core";
import { mnemonicToPrivateKey } from "@ton/crypto";
import { prepareTactDeployment } from "@tact-lang/deployer";
import { PoolMaster } from "../../output/contract_PoolMaster";
import { PrizeReserve } from "../../output/contract_PrizeReserve";

// async function main1() {
//     // Parameters
//     const testnet = true;
//     const workchain = 0; //we are working in basechain.
//     //create client for testnet sandboxv4 API - alternative endpoint
//     const client = new TonClient4({
//         endpoint: "https://sandbox-v4.tonhubapi.com",
//     });
//     const mnemonics = (process.env.MNEMONICS || "").toString();
//     const keyPair = await mnemonicToPrivateKey(mnemonics.split(" "));
//     const wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });
//     const sender = client.open(wallet).sender(keyPair.secretKey);

//     const owner = Address.parse("0QDEhu_wx6a-uvGY7uXmtqrCibuRHx_0VjxMIGJZ_338ce_n");
//     const tonstakers = Address.parse("kQDE1ySK_ZX-GPPTFh42Onl-4eLpSkGdFETdHznMisuCkpb4");
//     const jetton_master = Address.parse("kQAEfzRwbfnWIwPBYvrriWt_6vm4Fouz8eycIHd3kBXEt8NS");
//     const jetton_wallet_code = Cell.fromBase64("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");
//     // Prepare deploy
//     const pool = await PoolMaster.fromInit(owner, tonstakers, jetton_master, jetton_wallet_code);
//     await client.open(pool).send(
//         sender,
//         { value: toNano("1.0") },
//         { 
//             $$type: 'Deploy',
//             queryId: BigInt(0),
//         },
//     );
//     // Present a deployment link and contract address
//     console.log('Pool Master address: ' + pool.address.toString({ testOnly: testnet }));

//     const reserve = await PrizeReserve.fromInit(pool.address, tonstakers, jetton_master, jetton_wallet_code);;    // Create initial data for our contract 
//     // await client.open(reserve).send(
//     //     sender,
//     //     { value: toNano("0.3") },
//     //     {
//     //         $$type: 'Deploy',
//     //         queryId: BigInt(0),
//     //     },
//     // );
//     // Present a deployment link and contract address
//     console.log('Prize Reserve address: ' + reserve.address.toString({ testOnly: testnet }));
// }

async function main() {
        // Parameters
    const testnet = true;
    const owner = Address.parse("0QDEhu_wx6a-uvGY7uXmtqrCibuRHx_0VjxMIGJZ_338ce_n");
    const tonstakers = Address.parse("kQAK0L6OH0jwThWwlVwMDcop8nZML1gLe-YdpJUAoBmYj3yo");
    const jetton_master = Address.parse("kQD_pFdOiatJZEVyh9IJxLNGnedPvbi7eVo1a708siiFMsgk");
    const jetton_wallet_code = Cell.fromBase64("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");
    const jetton_system = Cell.fromBase64("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");
    const pool_sinit = await PoolMaster.init(owner, tonstakers, jetton_master, jetton_wallet_code, jetton_system);;    // Create initial data for our contract
    const pool_address = contractAddress(0, pool_sinit);     // Calculate contract address. MUST match with address in the verifier
    const pool_data = pool_sinit.data.toBoc();               // Create init data
    const pool_pkg = fs.readFileSync("output/contract_PoolMaster.pkg");
    const pool_link = await prepareTactDeployment({
        pkg: pool_pkg,
        data: pool_data,
        testnet: testnet,
    });
    // Present a deployment link and contract address
    console.log('Pool Master address: ' + pool_address.toString({ testOnly: testnet }));
    console.log('Pool Master Deploy link: ' + pool_link);

    const reserve_sinit = await PrizeReserve.init(pool_address, tonstakers, jetton_master, jetton_wallet_code, jetton_system);;    // Create initial data for our contract
    const reserve_address = contractAddress(0, reserve_sinit);     // Calculate contract address. MUST match with address in the verifier
    const reserve_data = reserve_sinit.data.toBoc();               // Create init data
    const reserve_pkg = fs.readFileSync("output/contract_PrizeReserve.pkg");
    const reserve_link = await prepareTactDeployment({
        pkg: reserve_pkg,
        data: reserve_data,
        testnet: testnet,
    });
    // Present a deployment link and contract address
    console.log('Prize Reserve address: ' + reserve_address.toString({ testOnly: testnet }));
    console.log('Prize Reserve Deploy link: ' + reserve_link);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});