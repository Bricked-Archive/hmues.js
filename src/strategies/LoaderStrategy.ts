import { Piece } from '../structures/Piece'
import { Store } from '../structures/Store'
import { stat, readdir } from 'fs/promises'
import { basename, join } from 'path'

/** Can parse a path for {@link Piece}s. */
export class LoaderStrategy<T extends Piece> {
  /** The {@link RegExp} to test filenames for */
  filter: RegExp = /^.+(.js|(?<!\.d)\.ts)$/

  /**
   * Loads all {@link Piece}s from a file.
   * @param store The {@link Store} that loads the {@link Piece}s.
   * @param path The file that contains the modules.
   */
  async *load(store: Store<T>, path: string): AsyncIterableIterator<new (...args: any[]) => T> {
    const module = await import(path)

    for (const i in module) {
      if (module[i].prototype instanceof store.Constructor)
        yield module[i] as new (...args: any[]) => T
    }
  }

  /**
   * Finds all files inside a directory.
   * @param path The file or directory to be scanned.
   */
  async *walk(path: string): AsyncIterableIterator<string> {
    if ((await stat(path)).isDirectory())
      for (const item of await readdir(path)) yield* this.walk(join(path, item))
    else if (this.filter.test(basename(path))) yield path
  }

  /**
   * Resolves a path
   * @param path The path to be resolved
   * @returns The resolved absolute path
   */
  resolve(path: string) {
    return join(require.main?.path ?? '', path)
  }
}

export interface LoaderStrategyOptions<T extends Piece> {
  store: Store<T>
}

export namespace LoaderStrategy {
  export type Options<T extends Piece> = LoaderStrategyOptions<T>
}
