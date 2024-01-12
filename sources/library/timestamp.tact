
inline extends fun storeTimestamp(self: Builder, timestamp: Int): Builder {
    return self.storeUint(timestamp, 48);
}

inline extends fun loadTimestamp(self: Slice): Int {
    return self.loadUint(48);
}
