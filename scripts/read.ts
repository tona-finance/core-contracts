import * as fs from "fs";
import * as path from "path";
import { Address, contractAddress, Cell, TonClient4 } from "ton";
import { PoolMaster } from "../output/contract_PoolMaster";
import { prepareTactDeployment } from "@tact-lang/deployer";

(async () => {
    const client = new TonClient4({
        endpoint: "https://sandbox-v4.tonhubapi.com", // Test-net API endpoint
    });

    // Parameters
    let testnet = true;
    let owner = Address.parse("kQBM7QssP28PhrctDOyd47_zpFfDiQvv5V9iXizNopb1d2LB");
    let staker = Address.parse("");
    let jetton_master = Address.parse("");
    let jetton_wallet_code = Cell.fromBase64("");
    let sinit = await PoolMaster.init(owner, staker, jetton_master, jetton_wallet_code);
    let contract_address = contractAddress(0, sinit);

    // Prepareing
    console.log("Reading Contract Info...");
    console.log(contract_address);

    // Input the contract address
    let contract = await PoolMaster.fromAddress(contract_address);
    let contract_open = await client.open(contract);
    console.log("Counter Value: " + (await contract_open.getCounter()));
})();
