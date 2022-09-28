"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Piece = void 0;
/** Can be loaded {@link Store}s. */
class Piece {
    constructor(options) {
        this.name ?? (this.name = options.name);
        this.enabled ?? (this.enabled = options.enabled);
        this.path ?? (this.path = options?.path);
        this.store ?? (this.store = options.store);
        this.options = options;
    }
    /** Gets called when the {@link Piece} is being registered */
    register() { }
    /** Gets called when the {@link Piece} is being deregistered */
    deregister() { }
}
exports.Piece = Piece;
