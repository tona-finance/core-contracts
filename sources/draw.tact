import "@stdlib/deploy.tact";
import "@stdlib/ownable.tact";
import "./library/twab.tact";

struct TwabState {
    start: Twab?;
    end: Twab?;
}

message Register {
    
}

message Claim {

}

contract DrawBeacon with Deployable, OwnableTransferable {

    owner: Address;

    pool_master: Address;
    twab: TwabState;

    init(pool_master: Address) {
        self.pool_master = pool_master;
        self.twab = TwabState {
            start: null,
            end: null
        };
    }

    receive("start") {
        
    }

    receive("end") {
        
    }

    receive("open") {
        require(self.twab.start != null, "no start twab");
        require(self.twab.end != null, "no end twab");
        

    }

    receive(msg: Register) {

    }
}