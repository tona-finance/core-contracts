
inline extends fun storeTimestamp(self: Builder, timestamp: Int): Builder {
    return self.storeUint(timestamp, 48);
}

inline extends fun preloadTimestamp(self: Slice): Int {
    return self.preloadUint(48);
}

inline extends mutates fun loadTimestamp(self: Slice): Int {
    return self.loadUint(48);
}
