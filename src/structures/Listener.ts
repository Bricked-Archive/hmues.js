import { Piece } from './Piece'
import { EventEmitter } from 'events'
import { ListenerStore } from './ListenerStore'
import { Awaitable, Client, ClientEvents } from 'discord.js'

/** Listens to events from {@link EventEmitter}s. */
export abstract class Listener<
  E extends keyof ClientEvents | null = null,
  O extends Listener.Options = Listener.Options
> extends Piece<O> {
  readonly emitter: O['emitter']
  readonly event: O['event']
  readonly once: O['once']

  constructor(options: E extends keyof ClientEvents ? O & { event: E } : O) {
    super(options)
    this.emitter ??= options.emitter
    this.event ??= options.event
    this.once ??= options.once
  }

  abstract run(...args: E extends keyof ClientEvents ? ClientEvents[E] : unknown[]): Awaitable<void>

  async _run(...args: E extends keyof ClientEvents ? ClientEvents[E] : unknown[]) {
    try {
      await this.run(...args)
    } catch (error) {
      this.catch(error)
    }
  }

  catch(reason: unknown): Awaitable<void> {
    console.error(reason)
  }

  override register(): Awaitable<void> {
    this.emitter[this.once ? 'once' : 'on'](this.event, this._run.bind(this) as any)
  }

  override deregister(): Awaitable<void> {
    this.emitter.removeListener(this.event, this._run.bind(this) as any)
  }
}

export namespace Listener {
  /** The options for the {@link Listener}. */
  export interface Options extends Piece.Options {
    store: ListenerStore
    emitter: EventEmitter
    event: string | symbol
    once: boolean
  }
}
