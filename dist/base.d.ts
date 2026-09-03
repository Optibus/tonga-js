/// <reference types="node" />
import EventEmitter from 'events';
import { Cache, ContextAttributes, GraveYard } from './constructor-types';
/**
 * base class that has get function and the cache and creates the debounced
 * analytics function
 */
export declare class Base extends EventEmitter {
    cache: Cache;
    contextAttributes: ContextAttributes;
    protected debounceMs: number;
    private debouncedAnal;
    protected graveYard: GraveYard | undefined;
    private accessedFlags;
    constructor(serverApiFunction: any, context_attributes: ContextAttributes);
    get<T = Cache>(path: string): T | Promise<T>;
    /**
     * The flags that were fetched from this instance through get, mapped to the value they were resolved to.
     * Only explicit get calls are recorded, flags that were merely populated into the cache are not considered
     * accessed. Each flag appears once, holding the value of its last access, in the order it was first accessed
     * @returns a copy of the accessed flags record, so that mutating it does not affect the record
     */
    getAccessedFlags(): Record<string, unknown>;
}
//# sourceMappingURL=base.d.ts.map