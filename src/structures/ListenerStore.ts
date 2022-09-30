import { EventEmitter } from 'events'
import { Listener } from './Listener'
import { Store } from './Store'

export class ListenerStore extends Store<Listener> {
  emitter: EventEmitter
  constructor(emitter: EventEmitter) {
    super(Listener)
    this.emitter ??= emitter
  }

  override construct(
    Ctor: new (options: Listener.Options) => Listener,
    data: ListenerStore.ModuleData
  ) {
    return super.construct(Ctor, {
      emitter: this.emitter,
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
