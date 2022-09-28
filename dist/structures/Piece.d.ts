import { Awaitable } from 'discord.js';
import { Store } from './Store';
/** Can be loaded {@link Store}s. */
export declare abstract class Piece<O extends Piece.Options = Piece.Options> {
    /** The name of the piece. */
    readonly name: O['name'];
    /** Whether or not the piece is enabled. */
    enabled: O['enabled'];
    /** The file this piece was loaded from. */
    readonly path: O['path'];
    /** The store that holds the piece. */
    readonly store: O['store'];
    /** The options passed to the piece. */
    readonly options: O;
    constructor(options: O);
    /** Gets called when the {@link Piece} is being registered */
    register(): Awaitable<void>;
    /** Gets called when the {@link Piece} is being deregistered */
    deregister(): Awaitable<void>;
}
export declare namespace Piece {
    /** The options for the {@link Piece}. */
    interface Options {
        readonly name: string;
        readonly enabled: boolean;
        readonly path: string;
        readonly store: Store<any>;
    }
}
