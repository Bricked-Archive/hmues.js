import { Collection } from 'discord.js'
import { LoaderStrategy } from '../strategies/LoaderStrategy'
import { basename } from 'path'
import { Piece } from './Piece'

/** Can store {@link Piece}s. */
export class Store<T extends Piece = Piece> extends Collection<string, T> {
  /** The constructor that holds the {@link Piece}. */
  Constructor: abstract new (options: T['options']) => T
  /** The {@link Strategy} for loading modules. */
  strategy: LoaderStrategy<T>

  constructor(Constructor: abstract new (options: T['options']) => T, options?: Store.Options<T>) {
    super()
    this.Constructor ??= Constructor
    this.strategy ??= options?.strategy ?? new LoaderStrategy()
  }

  /**
   * Loads all {@link Piece}s from a file or directory.
   * @param path The file or directory that contains the modules.
   */
  async load(path: string): Promise<T[]> {
    const pieces: T[] = []

    for await (const file of this.strategy.walk(this.strategy.resolve(path))) {
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      const data = { name: basename(file), path: file } as Store.ModuleData<T>
      for await (const Ctor of this.strategy.load(this, file))
        pieces.push(this.register(this.construct(Ctor, data)))
    }

    return pieces
  }

  /**
   * Registers a {@link Piece} in this {@link Collection}.
   * @param piece The {@link Piece} to be registered.
   */
  register(piece: T) {
    this.set(piece.name, piece)
    piece.register()
    if (!piece.enabled) this.deregister(piece)
    return piece
  }

  /**
   * Deregisters a {@link Piece} from this {@link Collection}.
   * @param piece The {@link Piece} to be deregistered.
   */
  deregister(piece: T) {
    piece.enabled = false
    piece.deregister()
    return piece
  }

  /**
   * Creates an instance of the {@link Piece}.
   * @param Ctor Constructor for the {@link Piece}.
   * @param data The data provided to the {@link Piece}.
   */
  construct(Ctor: new (options: T['options']) => T, data: Store.ModuleData<T>) {
    return new Ctor({
      enabled: true,
      store: this,
      ...data
    })
  }
}

export namespace Store {
  /** The options for the {@link Store}. */
  export interface Options<T extends Piece> {
    strategy?: LoaderStrategy<T>
  }

  /** The data provided to {@link Piece}s when being loaded. */
  export type ModuleData<T extends Piece> = Omit<T['options'], 'enabled' | 'store'>
}
