import { Address, toNano, TonClient4, WalletContractV4 } from "@ton/ton";
import { mnemonicToPrivateKey } from "@ton/crypto";
import { PoolMaster } from "../../output/contract_PoolMaster";
import { PoolAccount } from "../../output/contract_PoolAccount";
import { Ticket } from "../../output/contract_Ticket";
import { Draw } from "../../output/contract_Draw";

import * as dotenv from "dotenv";
import { randomInt } from "crypto";
dotenv.config();

async function main() {
    //create client for testnet sandboxv4 API - alternative endpoint
    const client = new TonClient4({
        endpoint: "https://sandbox-v4.tonhubapi.com",
        // endpoint: "https://mainnet-v4.tonhubapi.com",
    });
    const pool_master_addr = Address.parse("EQBXepQVtavYp-PqgIhez_ZzsVxOrQTQVAJiyWG0zWIUPBTj");

    const mnemonics = (process.env.MNEMONICS || "").toString();
    const keyPair = await mnemonicToPrivateKey(mnemonics.split(" "));
    const workchain = 0; //we are working in basechain.
    const wallet = WalletContractV4.create({ workchain, publicKey: keyPair.publicKey });
    const sender = client.open(wallet).sender(keyPair.secretKey);

    const pool_master = PoolMaster.fromAddress(pool_master_addr);
    // Pool account initialize
    await client.open(pool_master).send(
        sender,
        { value: toNano("0.5") },
        "init account",
    );

    // Deposit
    const pool_account_address = Address.parse("");
    const pool_wallet = PoolAccount.fromAddress(pool_account_address);
    // Pool account deposit
    await client.open(pool_wallet).send(
        sender,
        { value: toNano("1.1") }, // > 1 ton
        {
            $$type: 'Deposit',
            query_id: BigInt(100),
        },
    );

    // Pool account withdraw
    await client.open(pool_wallet).send(
        sender,
        { value: toNano("0.1") }, // > 1 ton
        {
            $$type: 'Withdraw',
            query_id: BigInt(0),
            amount: toNano("1.01"), // tston amount
        },
    );

    // Draw initialize ticket
    const draw_address = Address.parse("");
    const draw = Draw.fromAddress(draw_address);
    await client.open(draw).send(
        sender,
        { value: toNano("0.1") }, // > 1 ton
        {
            $$type: 'InitTicket',
            pool_account: pool_account_address,
        },
    );

    // // Claim Prize
    // const ticket_address = Address.parse("");
    // const ticket = Ticket.fromAddress(ticket_address);
    // // size (8 bit) + 

    // await client.open(ticket).send(
    //     sender,
    //     { value: toNano("0.1") }, // > 1 ton
    //     {
    //         $$type: 'ClaimPrize',
    //         query_id: BigInt(0),
    //         index_payload:
    //     },
    // );

    // Claim Prize Debt
    // // TODO
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});