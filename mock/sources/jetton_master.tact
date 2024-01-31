import "@stdlib/deploy";
import "./messages";
import "./jetton_wallet";


struct JettonData {
    total_supply: Int as coins; // the total number of issues jettons
    mintable: Bool;             // flag which indicates whether number of jettons can increase admin_address
    admin_address: Address;     // address of smart-contrac which control Jetton
    jetton_content: Cell;       // data in accordance to Token Data Standard #64
    jetton_wallet_code: Cell;   // code of wallet for that jetton
}

contract JettonMaster with FactoryDeployable {
    total_supply: Int as coins = 0;      // the total number of issued jettons
    owner: Address;         // owner of this jetton
    jetton_content: Cell;   // data in accordance to Token Data Standard #64

    init(owner: Address, jetton_content: Cell) {
        self.owner = owner;
        self.jetton_content = jetton_content;
    }

    //********************************************//
    //                  Messages                  //
    //********************************************//

    // @dev  JettonBurnNotification is sent from Jetton wallet after burning jettons
    receive(msg: JettonBurnNotification) {
        let ctx: Context = context();
        self._burn_notification_validate(ctx, msg);
        self._burn_notification(ctx, msg);
    }

    // @dev  JettonMint is sent from user to mint jettons
    receive(msg: JettonMint) {
        let ctx: Context = context();
        self._mint_validate(ctx, msg);
        self._mint(ctx, msg);
    }

    //********************************************//
    //             Internal functions             //
    //********************************************//

    // @dev  calculate_jetton_wallet_init retrieve init code of a jetton wallet
    inline fun calculate_jetton_wallet_init(owner_address: Address): StateInit {
        return initOf JettonWallet(owner_address, myAddress());
    }

    // @dev  _mint_validate conduct some custom validating before mint
    inline fun _mint_validate(ctx: Context, msg: JettonMint) {
        require(ctx.sender == self.owner, "JettonMaster: Sender is not a Jetton owner");
    }

    // @dev  _mint mint jettons
    inline fun _mint(ctx: Context, msg: JettonMint) {
        let initCode: StateInit = self.calculate_jetton_wallet_init(msg.receiver);
        let mint_amount: Int = self._compute_mint_amount(msg);
        self.total_supply = self.total_supply + mint_amount;
        send(SendParameters {
            to: contractAddress(initCode),
            value: 0,
            bounce: true,
            mode: SendRemainingValue,
            body: JettonInternalTransfer {
                query_id: msg.query_id,
                amount: mint_amount,
                response_address: msg.receiver,
                from: newAddress(0, 0),
                forward_ton_amount: ton("0.5"),
                forward_payload: emptySlice()
            }.toCell(),
            code: initCode.code,
            data: initCode.data
        });
    }

    // @dev  _burn_notification_validate perform some custom validation after receiving JettonBurnNotification sent from Jetton wallet
    inline fun _burn_notification_validate(ctx: Context, msg: JettonBurnNotification) {
        let initCode: StateInit = self.calculate_jetton_wallet_init(msg.sender);
        require(ctx.sender == contractAddress(initCode), "Sender is not a Jetton wallet");
    }

    inline fun _compute_mint_amount(msg: JettonMint): Int {
        if (self.total_supply == 0 || msg.total_balance == 0) {
            return msg.deposit_amount;
        } else {
            return self.total_supply * msg.deposit_amount / msg.total_balance;
        }
    }

    // @dev  _burn_notification dwindles total_supply and send notification to wallet after receiving JettonBurnNotification
    inline fun _burn_notification(ctx: Context, msg: JettonBurnNotification) {
        let total_supply: Int = self.total_supply;
        self.total_supply = total_supply - msg.amount;
        // pool withdraw
        send(SendParameters {
            to: self.owner,
            value: 0,
            bounce: false,
            mode: SendRemainingValue,
            body: PoolWithdraw {
                query_id: msg.query_id,
                total_supply: total_supply,
                jetton_amount: msg.amount,
                from_address: msg.sender,
                response_address: msg.response_destination
            }.toCell()
        });
    }

    //*********************************//
    //             Getters             //
    //*********************************//

    // @dev get_jetton_data retrieve information of this jetton
    get fun get_jetton_data(): JettonData {
        return JettonData {
            total_supply: self.total_supply,
            mintable: true,
            admin_address: self.owner,
            jetton_content: self.jetton_content,
            jetton_wallet_code: self.calculate_jetton_wallet_init(myAddress()).code
        };
    }

    // @dev get_wallet_address call calculate_jetton_wallet_init and return address of wallet
    get fun get_wallet_address(owner_address: Address): Address {
        let initCode: StateInit = self.calculate_jetton_wallet_init(owner_address);
        return contractAddress(initCode);
    }
}