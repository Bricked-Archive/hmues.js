import { Client } from 'discord.js';
import { Listener } from './Listener';
import { Store } from './Store';
export declare class ListenerStore extends Store<Listener> {
    client: Client;
    constructor(client: Client);
    construct(Ctor: new (options: Listener.Options) => Listener, data: ListenerStore.ModuleData): Listener<null, Listener.Options>;
}
export declare namespace ListenerStore {
    /** The data provided to {@link Listener}s when being loaded. */
    type ModuleData = Omit<Store.ModuleData<Listener>, 'emitter' | 'event' | 'once'>;
}
