/**
 *
 * @param obj Plain object to get data from within
 * @param path the path where value is example: "arr.1" or "obj.str"
 * @returns the value or null if it didnt find
 */
import { ContextAttributes } from './constructor-types';

function chceksum(obj: any): string {
  const str = JSON.stringify(obj);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash.toString(16);
}

/**
 * a class that hold an array of objects that each object would be unique
 *
 */
class ObjectSet {
  dataArray: any[] = [];
  dataDict: any = {};

  addMany(objects: any[]) {
    objects.forEach((obj) => this.add(obj));
  }

  clear() {
    this.dataArray = [];
    this.dataDict = {};
  }

  add(obj: any) {
    const key = chceksum(obj);
    if (!this.dataDict[key]) {
      this.dataDict[key] = obj;
      this.dataArray.push(obj);
    }
    return this;
  }

  size(): number {
    return this.dataArray.length;
  }

  getAll() {
    return this.dataArray;
  }
}

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

/**
 *  a debounce utility function create debounced function, when finally
 *  called will be called with an array of aggregated arguments
 * @param fn the function to be debounced
 * @param ms how many ms after the last invocation to actually invoke fn
 * @param contextAttributes context
 */

// eslint-disable-next-line @typescript-eslint/ban-types
export function debounce(fn: Function, ms: number, contextAttributes: ContextAttributes): Function {
  let timeoutId: ReturnType<typeof setTimeout>;
  const uniqueArgs = new ObjectSet();
  return function (...args: any[]) {
    uniqueArgs.addMany(args);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(uniqueArgs.getAll(), contextAttributes);
      uniqueArgs.clear();
    }, ms);
  };
}

export function debounceDeco() {
  return function (target: any, propertyKey: string, descriptor: any) {
    const originalFn = descriptor.value;
    descriptor.value = function (...args: any) {
      const returnValue = originalFn.call(this, ...args);
      if (this.debouncedAnal) {
        const callDebounced = (v: any) => {
          const typeOfValue = typeof v;
          if (v === null || ['string', 'number', 'boolean'].includes(typeOfValue)) {
            this.debouncedAnal.call(this, {
              flagKey: args[0],
              flagValue: v,
            });
          }
        };
        if (returnValue?.constructor?.name === 'Promise') {
          returnValue.then(callDebounced);
        } else {
          callDebounced(returnValue);
        }
      }
      return returnValue;
    };
  };
}
