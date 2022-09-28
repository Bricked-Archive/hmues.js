import { Piece } from '../structures/Piece';
import { Store } from '../structures/Store';
/** Can parse a path for {@link Piece}s. */
export declare class LoaderStrategy<T extends Piece> {
    /** The {@link RegExp} to test filenames for */
    filter: RegExp;
    /**
     * Loads all {@link Piece}s from a file.
     * @param store The {@link Store} that loads the {@link Piece}s.
     * @param path The file that contains the modules.
     */
    load(store: Store<T>, path: string): AsyncIterableIterator<new (...args: any[]) => T>;
    /**
     * Finds all files inside a directory.
     * @param path The file or directory to be scanned.
     */
    walk(path: string): AsyncIterableIterator<string>;
    /**
     * Resolves a path
     * @param path The path to be resolved
     * @returns The resolved absolute path
     */
    resolve(path: string): string;
}
export interface LoaderStrategyOptions<T extends Piece> {
    store: Store<T>;
}
export declare namespace LoaderStrategy {
    type Options<T extends Piece> = LoaderStrategyOptions<T>;
}
