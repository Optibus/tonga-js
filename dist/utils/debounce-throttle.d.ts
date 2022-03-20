import { ContextAttributes } from '../constructor-types';
/**
 *  a debounce utility function create debounced function, when finally
 *  called will be called with an array of aggregated unique arguments
 *  debounced function will be called after ms time only when there are no
 *  more invokation to the function
 * @param fn the function to be debounced
 * @param ms how many ms after the last invocation to actually invoke fn
 * @param contextAttributes context
 */
export declare const debounce: (fn: Function, ms: number, contextAttributes?: ContextAttributes | undefined) => Function;
/**
 *  a throttle utility function create throttled function, when finally
 *  called will be called with an array of aggregated unique arguments.
 *  throttled function will be called after ms time regardless
 *  of invokation that happened during ms.
 * @param fn the function to be debounced
 * @param ms how many ms after the last invocation to actually invoke fn
 * @param contextAttributes context
 */
export declare const throttle: (fn: Function, ms: number, contextAttributes?: ContextAttributes | undefined) => Function;
export declare function debounceDeco(): (target: any, propertyKey: string, descriptor: any) => void;
//# sourceMappingURL=debounce-throttle.d.ts.map