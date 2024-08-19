/**
 * Can be any context attributes that would like ot best to the server
 * when using 'getConfData' or 'getFlag'
 */
export declare type ContextAttributes = {
    user?: string;
    customer?: string;
};
export declare type Cache = any;
export interface DebounceArgs {
    flagKey: string;
    flagValue: unknown;
}
export declare type AnalyticsFn = (debounceArgs: DebounceArgs[], context: ContextAttributes) => Promise<void>;
interface ServerApiFunctions {
    /**
     *  An optional function can be added to call analyitics - analytics.
     *  As an optimization it will be debounced. So in order to prevent calling it too many times during one second,
     *  it will aggregate all calls and will make one call after a full second that it hasnt been called
     */
    analytics?: AnalyticsFn;
}
export interface ServerApiFunctionsPrefetch extends ServerApiFunctions {
    /**
     * this will be called at the constructor
     * @returns a promise that resolves to the entire config Object
     */
    getConfData: (context: ContextAttributes) => Promise<Cache> | Cache;
}
export interface ServerApiFunctionsOndemand extends ServerApiFunctions {
    /**
     * this will be called Any time a flag is being 'get'
     * @returns a promise that resolves to the specific value of the flag
     */
    getFlag: (path: string, context: ContextAttributes) => Promise<Cache>;
}
export interface GraveYard {
    key: string;
    log?: () => void;
}
export interface Options {
    isAsync?: boolean;
    graveYard?: GraveYard;
}
export declare type Cond = ServerApiFunctionsPrefetch extends ServerApiFunctionsOndemand ? ServerApiFunctionsPrefetch : ServerApiFunctionsOndemand;
export {};
//# sourceMappingURL=constructor-types.d.ts.map