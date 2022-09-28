import { Store } from './Store'

/** Can be loaded {@link Store}s. */
export abstract class Piece<O extends Piece.Options = Piece.Options> {
  /** The name of the piece. */
  readonly name: O['name']
  /** Whether or not the piece is enabled. */
  enabled: O['enabled']
  /** The file this piece was loaded from. */
  readonly path: O['path']
  /** The store that holds the piece. */
  readonly store: O['store']
  /** The options passed to the piece. */
  readonly options: O

  constructor(options: O) {
    this.name ??= options.name
    this.enabled ??= options.enabled
    this.path ??= options?.path
    this.store ??= options.store
    this.options = options
  }

  /** Gets called when the {@link Piece} is being loaded */
  async onLoad() {}

  /** Gets called when the {@link Piece} is being unloaded */
  async onUnload() {}
}

export namespace Piece {
  /** The options for the {@link Piece}. */
  export interface Options {
    readonly name: string
    readonly enabled: boolean
    readonly path: string
    readonly store: Store<any>
  }
}
