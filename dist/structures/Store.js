"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
const discord_js_1 = require("discord.js");
const LoaderStrategy_1 = require("../strategies/LoaderStrategy");
const path_1 = require("path");
/** Can store {@link Piece}s. */
class Store extends discord_js_1.Collection {
    constructor(Constructor, options) {
        super();
        this.Constructor ?? (this.Constructor = Constructor);
        this.strategy ?? (this.strategy = options?.strategy ?? new LoaderStrategy_1.LoaderStrategy());
    }
    /**
     * Loads all {@link Piece}s from a file or directory.
     * @param path The file or directory that contains the modules.
     */
    async load(path) {
        const pieces = [];
        for await (const file of this.strategy.walk(this.strategy.resolve(path))) {
            // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
            const data = { name: (0, path_1.basename)(file), path: file };
            for await (const Ctor of this.strategy.load(this, file))
                pieces.push(this.register(this.construct(Ctor, data)));
        }
        return pieces;
    }
    /**
     * Registers a {@link Piece} in this {@link Collection}.
     * @param piece The {@link Piece} to be registered.
     */
    register(piece) {
        this.set(piece.name, piece);
        piece.register();
        if (!piece.enabled)
            this.deregister(piece);
        return piece;
    }
    /**
     * Deregisters a {@link Piece} from this {@link Collection}.
     * @param piece The {@link Piece} to be deregistered.
     */
    deregister(piece) {
        piece.enabled = false;
        piece.deregister();
        return piece;
    }
    /**
     * Creates an instance of the {@link Piece}.
     * @param Ctor Constructor for the {@link Piece}.
     * @param data The data provided to the {@link Piece}.
     */
    construct(Ctor, data) {
        return new Ctor({
            enabled: true,
            store: this,
            ...data
        });
    }
}
exports.Store = Store;
