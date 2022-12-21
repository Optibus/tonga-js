import { GraveYard } from '../constructor-types';

/**
 *
 * @param obj Plain object to get data from within
 * @param path the path where value is example: "arr.1" or "obj.str"
 * @returns the value or null if it didn't find
 */

export function _getter(obj: any, path: string): unknown {
  const arr = path.split('.');
  let value = obj;
  let counter = 0;
  while (counter < arr.length && value) {
    const key = arr[counter];
    value = value[key];
    if (value === null || value === undefined) {
      return null;
    }
    counter++;
  }
  return value;
}

export function getter(key: GraveYard['key'] | undefined, log: GraveYard['log'] | undefined) {
  return (obj: any, path: string) => {
    const result = _getter(obj, path);
    if (!key || result != null) {
      return result;
    }
    const newPath = `${key}.${path}`;
    log?.();
    return _getter(obj, newPath);
  };
}

export * from './debounce-throttle';
export * from './object-set';
