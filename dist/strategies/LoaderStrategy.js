"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoaderStrategy = void 0;
const promises_1 = require("fs/promises");
const path_1 = require("path");
/** Can parse a path for {@link Piece}s. */
class LoaderStrategy {
    constructor() {
        /** The {@link RegExp} to test filenames for */
        this.filter = /^.+(.js|(?<!\.d)\.ts)$/;
    }
    /**
     * Loads all {@link Piece}s from a file.
     * @param store The {@link Store} that loads the {@link Piece}s.
     * @param path The file that contains the modules.
     */
    async *load(store, path) {
        const module = await Promise.resolve().then(() => require(path));
        for (const i in module) {
            if (module[i].prototype instanceof store.Constructor)
                yield module[i];
        }
    }
    /**
     * Finds all files inside a directory.
     * @param path The file or directory to be scanned.
     */
    async *walk(path) {
        if ((await (0, promises_1.stat)(path)).isDirectory())
            for (const item of await (0, promises_1.readdir)(path))
                yield* this.walk((0, path_1.join)(path, item));
        else if (this.filter.test((0, path_1.basename)(path)))
            yield path;
    }
    /**
     * Resolves a path
     * @param path The path to be resolved
     * @returns The resolved absolute path
     */
    resolve(path) {
        return (0, path_1.resolve)(require.main?.path ?? '', path);
    }
}
exports.LoaderStrategy = LoaderStrategy;
