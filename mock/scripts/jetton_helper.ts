import { sha256_sync as sha256 } from "@ton/crypto";
import { Cell, Dictionary, beginCell } from "@ton/core";

const ONCHAIN_CONTENT_PREFIX = 0x00;
const SNAKE_PREFIX = 0x00;
const CELL_MAX_SIZE_BYTES = Math.floor((1023 - 8) / 8);

function bufferToChunks(buff: Buffer, chunkSize: number) {
    let chunks: Buffer[] = [];
    while (buff.byteLength > 0) {
        chunks.push(buff.subarray(0, chunkSize));
        buff = buff.subarray(chunkSize);
    }
    return chunks;
}

export function makeSnakeCell(data: Buffer) {
    // Create a cell that package the data
    let chunks = bufferToChunks(data, CELL_MAX_SIZE_BYTES);

    const b = chunks.reduceRight((curCell, chunk, index) => {
        if (index === 0) {
            curCell.storeInt(SNAKE_PREFIX, 8);
        }
        curCell.storeBuffer(chunk);
        if (index > 0) {
            const cell = curCell.endCell();
            return beginCell().storeRef(cell);
        } else {
            return curCell;
        }
    }, beginCell());
    return b.endCell();
}

export function buildOnchainMetadata(data: {
    name: string;
    description: string;
}): Cell {
    const toKey = (key: string) => {
        return BigInt(`0x${sha256(key).toString("hex")}`);
    };

    let dict = Dictionary.empty(
        Dictionary.Keys.BigUint(256),
        Dictionary.Values.Cell()
    );

    // Store the on-chain metadata in the dictionary
    Object.entries(data).forEach(([key, value]) => {
        dict.set(toKey(key), makeSnakeCell(Buffer.from(value, "utf8")));
    });

    return beginCell()
        .storeInt(ONCHAIN_CONTENT_PREFIX, 8)
        .storeDict(dict)
        .endCell();
}
