import "./timestamp";

// === Twab ===
struct Twab {
    timestamp: Int as uint64;
    amount: Int as uint128;
}

inline extends fun storeTwab(self: Builder, twab: Twab): Builder {
    return self.storeTimestamp(twab.timestamp)
        .storeUint(twab.amount, 128);
}

inline extends mutates fun loadTwab(self: Slice): Twab {
    let timestamp: Int = self.loadTimestamp();
    let amount: Int = self.loadUint(128);
    return Twab {
        timestamp: timestamp,
        amount: amount
    };
}

inline fun new_twab(): Twab {
    return Twab {
        timestamp: now(),
        amount: 0
    };
}

inline extends fun next_twab(self: Twab, balance: Int, timestamp: Int): Twab {
    require(timestamp >= self.timestamp, "Invalid timestamp");
    return Twab {
        timestamp: timestamp,
        amount: self.amount + (timestamp - self.timestamp) * balance
    };
}

inline fun average_balance(start: Twab, end: Twab): Int {
    require(start.timestamp < end.timestamp, "Start time >= End time");
    return (end.amount - start.amount) / (end.timestamp - start.timestamp);
}

inline fun interpolate_twab(start: Twab, end: Twab, timestamp: Int): Twab {
    require(start.timestamp <= timestamp, "Start time >= timestamp");
    require(timestamp <= end.timestamp, "timestamp >= End time");
    return Twab {
        timestamp: timestamp,
        amount: start.amount + (timestamp - start.timestamp) * average_balance(start, end)
    };
}

// === TwabStore ===
// TODO: replace with ring buffer
struct TwabStore {
    store: map<Int, Twab>;
    size: Int as uint64;
}

inline fun new_twab_store(): TwabStore {
    return TwabStore {
        store: emptyMap(),
        size: 0
    };
}

extends fun binary_search_twab(
    self: TwabStore,
    balance: Int, 
    timestamp: Int
): Twab {
    require(self.size > 0, "Empty twab store");

    let low: Int = 0;
    let high: Int = self.size - 1;
    while(low <= high) {
        let mid: Int = (low + high) / 2;
        let twab: Twab = self.store.get(mid)!!;
        if (twab.timestamp < timestamp) {
            low = mid + 1;
        } else if (twab.timestamp > timestamp) {
            high = mid - 1;
        } else {
            return twab;
        }
    }

    if (high < 0) {
        return Twab {
            timestamp: timestamp,
            amount: 0
        };
    } else {
        let left: Twab = self.store.get(high)!!;
        let right: Twab? = self.store.get(high + 1);
        if (right == null) {
            right = left.next_twab(balance, timestamp);
        }
        return interpolate_twab(left, right!!, timestamp);
    }
}

extends mutates fun insert(self: TwabStore, balance: Int, timestamp: Int) {
    if (self.size == 0) {
        let twab: Twab = Twab {
            timestamp: timestamp,
            amount: 0
        };
        self.store.set(self.size, twab);
    } else {
        let last_twab: Twab = self.store.get(self.size - 1)!!;
        let new_twab: Twab = last_twab.next_twab(balance, timestamp);
        self.store.set(self.size, new_twab);
    }
    self.size = self.size + 1;
}
