import * as texts from '../texts/config';

export type ChunkLoader<T extends Record<string, string>> = (key: keyof T) => T[typeof key] | string;
export type ChunkKeys = keyof typeof texts;

export function textLoader<T extends ChunkKeys>(chunkName: T): ChunkLoader<typeof texts[T]> {
    const chunk = texts[chunkName];

    return (key: keyof typeof chunk) => chunk[key];
}
