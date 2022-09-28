import { Collection } from 'discord.js';
import { LoaderStrategy } from '../strategies/LoaderStrategy';
import { Piece } from './Piece';
/** Can store {@link Piece}s. */
export declare class Store<T extends Piece = Piece> extends Collection<string, T> {
    /** The constructor that holds the {@link Piece}. */
    Constructor: abstract new (options: T['options']) => T;
    /** The {@link Strategy} for loading modules. */
    strategy: LoaderStrategy<T>;
    constructor(Constructor: abstract new (options: T['options']) => T, options?: Store.Options<T>);
    /**
     * Loads all {@link Piece}s from a file or directory.
     * @param path The file or directory that contains the modules.
     */
    load(path: string): Promise<T[]>;
    /**
     * Registers a {@link Piece} in this {@link Collection}.
     * @param piece The {@link Piece} to be registered.
     */
    register(piece: T): T;
    /**
     * Deregisters a {@link Piece} from this {@link Collection}.
     * @param piece The {@link Piece} to be deregistered.
     */
    deregister(piece: T): T;
    /**
     * Creates an instance of the {@link Piece}.
     * @param Ctor Constructor for the {@link Piece}.
     * @param data The data provided to the {@link Piece}.
     */
    construct(Ctor: new (options: T['options']) => T, data: Store.ModuleData<T>): T;
}
export declare namespace Store {
    /** The options for the {@link Store}. */
    interface Options<T extends Piece> {
        strategy?: LoaderStrategy<T>;
    }
    /** The data provided to {@link Piece}s when being loaded. */
    type ModuleData<T extends Piece> = Omit<T['options'], 'enabled' | 'store'>;
}
