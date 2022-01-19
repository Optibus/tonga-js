/**
 *
 * @param obj Plain object to get data from within
 * @param path the path where value is example: "arr.1" or "obj.str"
 * @returns the value or null if it didnt find
 */
import { ContextAttributes } from './constructor-types';
export declare function getter(obj: any, path: string): unknown;
/**
 *  a debounce utility function create debounced function, when finally
 *  called will be called with an array of aggregated arguments
 * @param fn the function to be debounced
 * @param ms how many ms after the last invocation to actually invoke fn
 * @param contextAttributes context
 */
export declare function debounce(fn: Function, ms: number, contextAttributes: ContextAttributes): Function;
export declare function debounceDeco(): (target: any, propertyKey: string, descriptor: any) => void;
//# sourceMappingURL=utils.d.ts.map