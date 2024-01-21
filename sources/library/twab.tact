
// === Twab ===
struct Twab {
    timestamp: Int as uint64;
    amount: Int as uint128;
}

inline fun new_twab(): Twab {
    return Twab {
        timestamp: now(),
        amount: 0
    };
}

inline fun average_balance(start: Twab, end: Twab): Int {
    require(start.timestamp < end.timestamp, "Start time >= End time");
    return (end.amount - start.amount) / (end.timestamp - start.timestamp);
}

inline extends fun next_twab(self: Twab, balance: Int, timestamp: Int): Twab {
    require(timestamp >= self.timestamp, "Invalid timestamp");
    return Twab {
        timestamp: timestamp,
        amount: self.amount + (timestamp - self.timestamp) * balance
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

extends fun binary_search_twab(self: TwabStore, timestamp: Int): Twab {
    let low: Int = 0;
    let high: Int = self.size - 1;
    while(low <= high) {
        let mid: Int = (low + high) / 2;
        let twab: Twab = self.store.get(mid)!!;
        if (twab.timestamp == timestamp) {
            return twab;
        } else if (twab.timestamp < timestamp) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return self.store.get(high)!!;
}

inline extends fun first_twab(self: TwabStore): Twab {
    require(self.size > 0, "Empty twab store");
    return self.store.get(0)!!;
}

inline extends fun last_twab(self: TwabStore): Twab {
    require(self.size > 0, "Empty twab store");
    return self.store.get(self.size - 1)!!;
}

extends mutates fun insert(self: TwabStore, balance: Int, timestamp: Int) {
    if (self.size == 0) {
        self.store.set(self.size, Twab {
            timestamp: timestamp,
            amount: 0
        });
    } else {
        let last_twab: Twab = self.store.get(self.size - 1)!!;
        let new_twab: Twab = last_twab.next_twab(balance, timestamp);
        self.store.set(self.size, new_twab);
    }
    self.size = self.size + 1;
}
