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
    constructor(serverApiFunction: any, context_attributes: ContextAttributes);
    get(path: string): Cache;
}
//# sourceMappingURL=base.d.ts.map