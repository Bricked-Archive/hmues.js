"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Listener = void 0;
const Piece_1 = require("./Piece");
/** Listens to events from {@link EventEmitter}s. */
class Listener extends Piece_1.Piece {
    constructor(options) {
        super(options);
        this.emitter ?? (this.emitter = options.emitter);
        this.event ?? (this.event = options.event);
        this.once ?? (this.once = options.once);
    }
    async _run(...args) {
        try {
            await this.run(...args);
        }
        catch (error) {
            this.catch(error);
        }
    }
    catch(reason) {
        console.error(reason);
    }
    register() {
        this.emitter[this.once ? 'once' : 'on'](this.event, this._run.bind(this));
    }
    deregister() {
        this.emitter.removeListener(this.event, this._run.bind(this));
    }
}
exports.Listener = Listener;
