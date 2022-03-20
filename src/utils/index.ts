/**
 *
 * @param obj Plain object to get data from within
 * @param path the path where value is example: "arr.1" or "obj.str"
 * @returns the value or null if it didnt find
 */

export function getter(obj: any, path: string): unknown {
  const arr = path.split('.');
  let value = obj;
  let counter = 0;
  while (counter < arr.length && value) {
    const key = arr[counter];
    value = value[key];
    if (!value) {
      return null;
    }
    counter++;
  }
  return value;
}

export * from './debounce-throttle';
export * from './object-set';
