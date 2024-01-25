import * as fs from "fs";
import { Cell, Address, contractAddress } from "@ton/core";
import { prepareTactDeployment } from "@tact-lang/deployer";
import { PoolMaster } from "../output/contract_PoolMaster";
import { PrizeReserve } from "../output/contract_PrizeReserve";

async function main() {
    // Parameters
    const testnet = true;                                 // Flag for testnet or mainnet
    const owner = Address.parse("UQC67azZnhLSuEt_--CbmhD0lnA-Wl8KJbQsxcQ8Ys7buDYy");    // Our sample contract has an owner
    const tonstakers = Address.parse("EQCkWxfyhAkim3g2DjKQQg8T5P4g-Q1-K_jErGcDJZ4i-vqR");
    const jetton_master = Address.parse("EQC98_qAmNEptUtPc7W6xdHh_ZHrBUFpw5Ft_IzNU20QAJav");
    const jetton_wallet_code = Cell.fromBase64("te6cckEBDAEA7AABAwDAAQIBIAoCAgEgBQMBQr+ugP0vHgNIDiKCNjWW7nUte7J/UHdrlQhqAnkYlnWSPgQABAA5AgEgCAYBQb9u1PlCp4SM4ssGa3ehEoxqH/jEP0OKLc4kYSup/6uLAwcADAB0c1RPTgFBv0VGpv/ht5z92GutPbh0MT3N4vsF5qdKp/NVLZYXx50TCQAeAFRvbnN0YWtlcnMgVE9OAUO/+HLr21FNnJfCg7fwrlF5Ap4rYRnDlGJxnk9G7Y90E+ZACwBQAGh0dHBzOi8vdG9uc3Rha2Vycy5jb20vamV0dG9uL21ldGEuanNvbto46fw=");
    
    // Prepare deploy
    const pool_sinit = await PoolMaster.init(owner, tonstakers, jetton_master, jetton_wallet_code);;    // Create initial data for our contract
    let pool_address = contractAddress(0, pool_sinit);     // Calculate contract address. MUST match with address in the verifier
    let pool_data = pool_sinit.data.toBoc();               // Create init data
    let pool_pkg = fs.readFileSync("output/contract_PoolMaster.pkg");
    let pool_link = await prepareTactDeployment({
        pkg: pool_pkg,
        data: pool_data,
        testnet: testnet,
    });
    // Present a deployment link and contract address
    console.log('Pool Master address: ' + pool_address.toString({ testOnly: testnet }));
    console.log('Pool Master Deploy link: ' + pool_link);

    const reserve_sinit = await PrizeReserve.init(pool_address, tonstakers, jetton_master, jetton_wallet_code);;    // Create initial data for our contract 
    let reserve_address = contractAddress(0, reserve_sinit);     // Calculate contract address. MUST match with address in the verifier
    let reserve_data = reserve_sinit.data.toBoc();               // Create init data
    let reserve_pkg = fs.readFileSync("output/contract_PrizeReserve.pkg");
    let reserve_link = await prepareTactDeployment({
        pkg: reserve_pkg,
        data: reserve_data,
        testnet: testnet,
    });
    // Present a deployment link and contract address
    console.log('Prize Reserve address: ' + reserve_address.toString({ testOnly: testnet }));
    console.log('Prize Reserve Deploy link: ' + reserve_link);
}

// async function main() {
//     const workchain = 0; // basechain
//     const client = new TonClient4({
//         endpoint: "https://sandbox-v4.tonhubapi.com", // Test-net API endpoint
//     });

//     const mnemonics = (process.env.MNEMONICS || "").toString();
//     const keypair = await mnemonicToPrivateKey(mnemonics.split(" "));
//     const deployer = WalletContractV4.create({
//         workchain: workchain,
//         publicKey: keypair.publicKey,
//     });
//     console.log("Deployer Address: " + deployer.address);
//     let deployer_contract = client.open(deployer);
//     console.log("Deployer Balance: " + fromNano(await deployer_contract.getBalance()));

//     // Parameters
//     const tonstakers = Address.parse("EQCkWxfyhAkim3g2DjKQQg8T5P4g-Q1-K_jErGcDJZ4i-vqR");
//     const jetton_master = Address.parse("EQC98_qAmNEptUtPc7W6xdHh_ZHrBUFpw5Ft_IzNU20QAJav");
//     const jetton_wallet_code = Cell.fromBase64("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");

//     // Deploying
//     let sinit = await PoolMaster.init(deployer_contract.address, tonstakers, jetton_master, jetton_wallet_code);
//     let pool_master_contract = contractAddress(workchain, sinit);
//     console.log("Pool Master Address: " + pool_master_contract);
//     let deploy_amount = toNano("0.5");
//     let seqno = await deployer_contract.getSeqno();
//     await deployer_contract.sendTransfer({
//         seqno: seqno,
//         secretKey: keypair.secretKey,
//         messages: [
//             internal({
//                 to: pool_master_contract,
//                 value: deploy_amount,
//                 init: sinit,
//             })
//         ],
//     });
//     console.log("Deployer Balance: " + fromNano(await deployer_contract.getBalance()));
// }

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});