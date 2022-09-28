import { Client } from 'discord.js'
import { Listener } from './Listener'
import { Store } from './Store'

export class ListenerStore extends Store<Listener> {
  client: Client
  constructor(client: Client) {
    super(Listener)
    this.client ??= client
  }

  construct(Ctor: new (options: Listener.Options) => Listener, data: ListenerStore.ModuleData) {
    return super.construct(Ctor, {
      emitter: this.client,
      event: 'ready',
      once: false,
      ...data
    })
  }
}

export namespace ListenerStore {
  /** The data provided to {@link Listener}s when being loaded. */
  export type ModuleData = Omit<Store.ModuleData<Listener>, 'emitter' | 'event' | 'once'>
}
