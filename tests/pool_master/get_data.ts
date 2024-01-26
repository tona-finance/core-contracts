import { Address, TonClient4 } from "@ton/ton";
import { PoolMaster } from "../../output/contract_PoolMaster";
import { PoolAccount } from "../../output/contract_PoolAccount";
import { Ticket } from "../../output/contract_Ticket";

import * as dotenv from "dotenv";
dotenv.config();

async function main() {
    //create client for testnet sandboxv4 API - alternative endpoint
    const client = new TonClient4({
        endpoint: "https://sandbox-v4.tonhubapi.com",
        // endpoint: "https://mainnet-v4.tonhubapi.com",
    });
    const pool_master_addr = Address.parse("EQBXepQVtavYp-PqgIhez_ZzsVxOrQTQVAJiyWG0zWIUPBTj");

    const pool_master = PoolMaster.fromAddress(pool_master_addr);
    const pool_master_contract = client.open(pool_master);
    // get core data
    const data = await pool_master_contract.getGetCoreData();
    console.log("Pool core data: ", data);

    const user = Address.parse("0QC67azZnhLSuEt_--CbmhD0lnA-Wl8KJbQsxcQ8Ys7buI24");
    // get pool account address
    const pool_account = await pool_master_contract.getGetAccountAddress(user);
    console.log("Pool account: ", pool_account);

    const pool_account_contract = client.open(PoolAccount.fromAddress(pool_account));
    // get pool account data
    const pool_account_data = await pool_account_contract.getGetCoreData();

    // get draw address
    // draw period
    const period = BigInt(0);
    const draw_address = pool_master_contract.getGetDrawAddress(period);
    // const draw_address = pool_account_contract.getGetDrawAddress(period);
    // get draw data
    const draw_data = await pool_account_contract.getGetCoreData();

    // get ticket address
    const ticket_address = await pool_account_contract.getGetTicketAddress(period);
    const ticket_contract = client.open(Ticket.fromAddress(ticket_address));
    const ticket_data = await ticket_contract.getGetCoreData();

    // get ticket data
    
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});