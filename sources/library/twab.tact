
// === Twab ===
struct Twab {
    timestamp: Int as uint64;
    amount: Int as uint128;
}

inline fun newTwab(): Twab {
    return Twab {
        timestamp: now(),
        amount: 0
    };
}

inline fun averageBalance(start: Twab, end: Twab): Int {
    require(start.timestamp < end.timestamp, "invalid timestamp");
    return (end.amount - start.amount) / (end.timestamp - start.timestamp);
}

inline extends fun nextTwab(self: Twab, balance: Int, timestamp: Int): Twab {
    require(timestamp >= self.timestamp, "invalid timestamp");
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

inline fun newTwabStore(): TwabStore {
    return TwabStore {
        store: emptyMap(),
        size: 0
    };
}

extends fun binarySearchTwab(self: TwabStore, timestamp: Int): Twab {
    let low: Int = 0;
    let high: Int = self.size - 1;
    while (low <= high) {
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

inline extends fun firstTwab(self: TwabStore): Twab {
    require(self.size > 0, "empty store");
    return self.store.get(0)!!;
}

inline extends fun lastTwab(self: TwabStore): Twab {
    require(self.size > 0, "empty store");
    return self.store.get(self.size - 1)!!;
}

extends mutates fun insert(self: TwabStore, balance: Int, timestamp: Int) {
    if (self.size == 0) {
        self.store.set(self.size, Twab {
            timestamp: timestamp,
            amount: 0
        });
    } else {
        let lastTwab: Twab = self.store.get(self.size - 1)!!;
        let newTwab: Twab = lastTwab.nextTwab(balance, timestamp);
        self.store.set(self.size, newTwab);
    }
    self.size = self.size + 1;
}
