import { Piece } from './Piece';
import { EventEmitter } from 'events';
import { ListenerStore } from './ListenerStore';
import { Awaitable, ClientEvents } from 'discord.js';
/** Listens to events from {@link EventEmitter}s. */
export declare abstract class Listener<E extends keyof ClientEvents | null = null, O extends Listener.Options = Listener.Options> extends Piece<O> {
    readonly emitter: O['emitter'];
    readonly event: O['event'];
    readonly once: O['once'];
    constructor(options: E extends keyof ClientEvents ? O & {
        event: E;
    } : O);
    abstract run(...args: E extends keyof ClientEvents ? ClientEvents[E] : unknown[]): Awaitable<void>;
    _run(...args: E extends keyof ClientEvents ? ClientEvents[E] : unknown[]): Promise<void>;
    catch(reason: unknown): Awaitable<void>;
    register(): Awaitable<void>;
    deregister(): Awaitable<void>;
}
export declare namespace Listener {
    /** The options for the {@link Listener}. */
    interface Options extends Piece.Options {
        store: ListenerStore;
        emitter: EventEmitter;
        event: string | symbol;
        once: boolean;
    }
}
