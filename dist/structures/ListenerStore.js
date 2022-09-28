"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListenerStore = void 0;
const Listener_1 = require("./Listener");
const Store_1 = require("./Store");
class ListenerStore extends Store_1.Store {
    constructor(client) {
        super(Listener_1.Listener);
        this.client ?? (this.client = client);
    }
    construct(Ctor, data) {
        return super.construct(Ctor, {
            emitter: this.client,
            event: 'ready',
            once: false,
            ...data
        });
    }
}
exports.ListenerStore = ListenerStore;
