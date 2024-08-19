import { GraveYard } from '../constructor-types';
/**
 *
 * @param obj Plain object to get data from within
 * @param path the path where value is example: "arr.1" or "obj.str"
 * @returns the value or null if it didn't find
 */
export declare function _getter(obj: any, path: string): unknown;
export declare function getter(key: GraveYard['key'] | undefined, log: GraveYard['log'] | undefined): (obj: any, path: string) => unknown;
export * from './debounce-throttle';
export * from './object-set';
//# sourceMappingURL=index.d.ts.map