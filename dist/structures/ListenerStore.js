"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListenerStore = void 0;
const Listener_1 = require("./Listener");
const Store_1 = require("./Store");
class ListenerStore extends Store_1.Store {
    constructor(emitter) {
        super(Listener_1.Listener);
        this.emitter ?? (this.emitter = emitter);
    }
    construct(Ctor, data) {
        return super.construct(Ctor, {
            emitter: this.emitter,
            event: 'ready',
            once: false,
            ...data
        });
    }
}
exports.ListenerStore = ListenerStore;
