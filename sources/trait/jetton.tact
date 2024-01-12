import "@stdlib/ownable";

const ErrNotImplement: Int = 0x1234;

struct JettonData {
    total_supply: Int;
    mintable: Bool;
    owner: Address;
    content: Cell;
    wallet_code: Cell;
}

struct JettonWalletData {
    balance: Int;
    owner: Address;
    master: Address;
    wallet_code: Cell;
}

message(0xf8a7ea5) TokenTransfer {
    query_id: Int as uint64;
    amount: Int as coins;
    destination: Address;
    response_destination: Address;
    custom_payload: Cell?;
    forward_ton_amount: Int as coins;
    forward_payload: Slice as remaining; // Comment Text message when Transfer the jetton
}

message(0x178d4519) TokenTransferInternal {
    query_id: Int as uint64;
    amount: Int as coins;
    from: Address;
    response_destination: Address;
    forward_ton_amount: Int as coins;
    forward_payload: Slice as remaining; // Comment Text message when Transfer the jetton
}

message(0x7362d09c) TokenNotification {
    query_id: Int as uint64;
    amount: Int as coins;
    from: Address;
    forward_payload: Slice as remaining; // Comment Text message when Transfer the jetton 
}

message(0x595f07bc) TokenBurn {
    query_id: Int as uint64;
    amount: Int as coins;
    response_destination: Address;
    custom_payload: Cell?;
}

message(0x7bdd97de) TokenBurnNotification {
    query_id: Int as uint64;
    amount: Int as coins;
    response_destination: Address;
}

message(0xd53276db) TokenExcesses {
    query_id: Int as uint64;
}

message TokenUpdateContent {
    content: Cell;
}

// ==== TEP89: Jetton Wallet Discovery ====
message(0x2c76b973) ProvideWalletAddress {
    query_id: Int as uint64;
    owner_address: Address;
    include_address: Bool;
}

message(0xd1735400) TakeWalletAddress {
    query_id: Int as uint64;
    wallet_address: Address;
    owner_address: Address?;
}

// ============================================================================================================ //
@interface("org.ton.jetton.master")
trait JettonMaster with OwnableTransferable {

    owner: Address;

    total_supply: Int;
    content: Cell;
    
    receive(msg: TokenUpdateContent) {
        self.requireOwner();                // Allow changing content only by owner
        self.content = msg.content;         // Update content
    }

    receive(msg: TokenBurnNotification) {
        let winit: StateInit = self.getWalletInit(msg.response_destination);
        require(contractAddress(winit) == context().sender, "Invalid sender");

        self.total_supply = self.total_supply - msg.amount; // Update supply
        if (msg.response_destination != null) { // Cashback
            send(SendParameters {
                to: msg.response_destination, 
                value: 0,
                bounce: false,
                mode: SendRemainingValue + SendIgnoreErrors,
                body: TokenExcesses{ query_id: msg.query_id }.toCell()
            });
        }
    }

    // Private Methods // 
    // @to The Address receive the Jetton token after minting
    // @amount The amount of Jetton token being minted
    // @response_destination The previous owner address
    fun mint(to: Address, amount: Int, response_destination: Address) {
        self.total_supply = self.total_supply + amount; // Update total supply

        let winit: StateInit = self.getWalletInit(to); // Create message
        send(SendParameters {
            to: contractAddress(winit), 
            value: 0, 
            bounce: true,
            mode: SendRemainingValue,
            body: TokenTransferInternal{ 
                query_id: 0,
                amount: amount,
                from: myAddress(),
                response_destination: response_destination,
                forward_ton_amount: 0,
                forward_payload: emptySlice()
            }.toCell(),
            code: winit.code,
            data: winit.data
        });
    }

    virtual fun getWalletInit(address: Address): StateInit {}

    // ====== Get Methods ====== //
    get fun get_jetton_data(): JettonData {
        return JettonData{ 
            total_supply: self.total_supply, 
            mintable: true, 
            owner: self.owner, 
            content: self.content, 
            wallet_code: self.getWalletInit(myAddress()).code
        };
    }

    get fun get_wallet_address(owner: Address): Address {
        let winit: StateInit = self.getWalletInit(owner);
        return contractAddress(winit);
    }
}

// ============================================================ //
@interface("org.ton.jetton.wallet")
trait JettonWallet {
    const minTonsForStorage: Int = ton("0.01");
    const gasConsumption: Int = ton("0.01");

    owner: Address;
    master: Address;
    balance: Int;

    virtual fun getWalletInit(address: Address): StateInit {
        throw(ErrNotImplement);
    }

    receive(msg: TokenTransfer) { // 0xf8a7ea5
        let ctx: Context = context(); // Check sender
        require(ctx.sender == self.owner, "Invalid sender");

        // Gas checks
        let fwd_fee: Int = ctx.readForwardFee() + ctx.readForwardFee();  
        let final: Int =  2 * self.gasConsumption + self.minTonsForStorage + fwd_fee;
        require(ctx.value > min(final, ton("0.01")), "Invalid value!!"); 

        // Update balance
        self.balance = self.balance - msg.amount; 
        require(self.balance >= 0, "Invalid balance");

        let sinit: StateInit = self.getWalletInit(msg.destination);
        let wallet_address: Address = contractAddress(sinit);
        send(SendParameters {
            to: wallet_address, 
            value: 0,
            mode: SendRemainingValue, 
            bounce: true,
            body: TokenTransferInternal{
                query_id: msg.query_id,
                amount: msg.amount,
                from: self.owner,
                response_destination: msg.response_destination,
                forward_ton_amount: msg.forward_ton_amount,
                forward_payload: msg.forward_payload
            }.toCell(),
            code: sinit.code,
            data: sinit.data
        });
    }

    receive(msg: TokenTransferInternal) { // 0x178d4519
        let ctx: Context = context();

        if (ctx.sender != self.master) {
            let sinit: StateInit = self.getWalletInit(msg.from);
            require(contractAddress(sinit) == ctx.sender, "Invalid sender!");
        }

        // Update balance
        self.balance = self.balance + msg.amount;
        require(self.balance >= 0, "Invalid balance"); 
        
        // Get value for gas
        let msg_value: Int = self.msg_value(ctx.value);  
        let fwd_fee: Int = ctx.readForwardFee();
        msg_value = msg_value - msg.forward_ton_amount - fwd_fee;
        
         // 0x7362d09c - notify the new owner of JettonToken that the transfer is complete
        if (msg.forward_ton_amount > 0) { 
            send(SendParameters{
                to: self.owner,
                value: msg.forward_ton_amount,
                mode: SendPayGasSeparately + SendIgnoreErrors,
                bounce: false,
                body: TokenNotification {
                    query_id: msg.query_id,
                    amount: msg.amount,
                    from: msg.from,
                    forward_payload: msg.forward_payload
                }.toCell()
            });
        }

        // 0xd53276db -- Cashback to the original Sender
        if (msg.response_destination != null) { 
            send(SendParameters {
                to: msg.response_destination, 
                value: msg_value,  
                bounce: false,
                body: TokenExcesses { 
                    query_id: msg.query_id
                }.toCell(),
                mode: SendIgnoreErrors
            });
        }
    }

    // receive(msg: TokenBurn) {
    //     let ctx: Context = context();
    //     require(ctx.sender == self.owner, "Invalid sender");  // Check sender

    //     self.balance = self.balance - msg.amount; // Update balance
    //     require(self.balance >= 0, "Invalid balance");

    //     let fwd_fee: Int = ctx.readForwardFee(); // Gas checks
    //     require(ctx.value > fwd_fee + 2 * self.gasConsumption + self.minTonsForStorage, "Invalid value - Burn");

    //     // Burn tokens
    //     send(SendParameters {
    //         to: self.master,
    //         value: 0,
    //         mode: SendRemainingValue,
    //         bounce: true,
    //         body: TokenBurnNotification{
    //             query_id: msg.query_id,
    //             amount: msg.amount,
    //             response_destination: self.owner
    //         }.toCell()
    //     });
    // }

    receive(msg: ProvideWalletAddress) {
        require(context().value >= ton("0.0061"), "Insufficient gas");
        let sinit: StateInit = self.getWalletInit(msg.owner_address);
        let wallet_address: Address = contractAddress(sinit);

        let response_body: TakeWalletAddress = TakeWalletAddress{
            query_id: msg.query_id,
            wallet_address: wallet_address,
            owner_address: null
        };
        if (msg.include_address) {
            response_body.owner_address = msg.owner_address;
        }
        send(SendParameters{
            to: sender(),
            value: 0,
            mode: SendRemainingValue,
            bounce: true,
            body: response_body.toCell()
        });
    }

    fun msg_value(value: Int): Int {
        let msg_value: Int = value;
        let ton_balance_before_msg: Int = myBalance() - msg_value;
        let storage_fee: Int = self.minTonsForStorage - min(ton_balance_before_msg, self.minTonsForStorage);
        msg_value = msg_value - (storage_fee + self.gasConsumption);
        return msg_value;
    }

    bounced(src: bounced<TokenTransferInternal>) {
        self.balance = self.balance + src.amount;
    }

    bounced(src: bounced<TokenBurnNotification>) {
        self.balance = self.balance + src.amount;
    }

    get fun get_wallet_data(): JettonWalletData {
        return JettonWalletData{
            balance: self.balance,
            owner: self.owner,
            master: self.master,
            wallet_code: self.getWalletInit(self.owner).code
        };
    }
    
    // bounced(msg: Slice) {
    //     // Parse bounced message
    //     msg.skipBits(32); // 0xFFFFFFFF 
    //     let op: Int = msg.loadUint(32);
    //     let query_id: Int = msg.loadUint(64);
    //     let jettonAmount: Int = msg.loadCoins();
    //     require(op == 0x178d4519 || op == 0x7bdd97de, "Invalid bounced message");
    //     self.balance = self.balance + jettonAmount; // Update balance
    // }
}
