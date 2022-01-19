import { Cache, ContextAttributes, Options, ServerApiFunctionsPrefetch } from './constructor-types';
import { Base } from './base';
/**
 * Prefetch means the getter will be a sync function,
 * All the data must be fetched before it is ready
 */
export declare class Prefetch extends Base {
    private isReady;
    constructor(serverApiFunction: ServerApiFunctionsPrefetch, context_attributes: ContextAttributes, options?: Options);
    /**
     * Synchronos function
     * @param path the path to flag.
     */
    get(path: string): Cache;
}
//# sourceMappingURL=prefetch.d.ts.map