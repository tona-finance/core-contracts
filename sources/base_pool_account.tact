import "@stdlib/ownable";
import "./library/timestamp";
import "./library/twab";
import "./library/helper";
import "./messages";


trait BasePoolAccount with Ownable, MsgValueHelper {

    owner: Address; // from Ownable

    master: Address;
    twab_store: TwabStore;
    share_amount: Int;
    lock: Bool;

    // === user messages ===

    receive("deposit") {
        self.require_unlocked();
        self.requireOwner();

        // fee 0.2
        let deposit_amount: Int = self.msg_value(context(), ton("0.2"));
        require(deposit_amount > 0, "Invalid deposit amount");
        self.lock = true;

        // deposit in the master
        send(SendParameters {
            bounce: true,
            to: self.master,
            value: 0,
            mode: SendRemainingValue,
            body: DepositInternal {
                amount: deposit_amount,
                user: self.owner
            }.toCell()
        });
    }

    receive(msg: DepositFinish) {
        self.require_master();

        self.twab_store.insert(self.share_amount, msg.timestamp);
        self.share_amount = self.share_amount + msg.amount;
        self.lock = false;

        // refund gas
        self.forward(self.owner, null, false, null);
    }

    receive(msg: Withdraw) {
        self.require_unlocked();
        self.requireOwner();
        require(msg.amount > 0 && msg.amount <= self.share_amount, "Invalid withdraw amount");

        // fee 0.2
        let rest_value: Int = self.msg_value(context(), ton("0.2"));
        require(rest_value >= 0, "Insufficient value");
        self.lock = true;

        // withdraw from the master
        send(SendParameters {
            bounce: false,
            to: self.master,
            value: 0,
            mode: SendRemainingValue,
            body: WithdrawInternal {
                amount: msg.amount,
                user: self.owner
            }.toCell()
        });
    }

    receive(msg: WithdrawFinish) {
        self.require_master();

        self.twab_store.insert(self.share_amount, msg.timestamp);
        self.share_amount = self.share_amount - msg.amount;
        self.lock = false;

        // refund gas
        self.forward(self.owner, null, false, null);
    }

    bounced(src: bounced<DepositInternal>) {
        self.lock = false;
    }

    bounced(src: bounced<WithdrawInternal>) {
        self.lock = false;
    }

    inline fun require_unlocked() {
        require(!self.lock, "Account locked");
    }

    inline fun require_master() {
        // require(sender() == self.master, "Only pool master");
        require(sender() == self.master, "Invalid sender");
    }
}
