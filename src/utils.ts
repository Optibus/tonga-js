/**
 *
 * @param obj Plain object to get data from within
 * @param path the path where value is example: "arr.1" or "obj.str"
 * @returns the value or null if it didnt find
 */
import { ContextAttributes } from './constructor-types';

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
 *  a throttle utility function create throttled function, when finally
 *  called will be called with an array of aggregated arguments
 * @param fn the function to be throttled
 * @param ms how many ms after the last invocation to actually invoke fn
 * @param contextAttributes context
 */

// eslint-disable-next-line @typescript-eslint/ban-types
export function throttle(fn: Function, ms: number, contextAttributes: ContextAttributes): Function {
  let allArgs: any[] = [];
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (...args: any[]) {
    allArgs = allArgs.concat(args);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(allArgs, contextAttributes);
    }, ms);
  };
}

export function throttleDeco() {
  return function (target: any, propertyKey: string, descriptor: any) {
    const originalFn = descriptor.value;
    descriptor.value = function (...args: any) {
      const returnValue = originalFn.call(this, ...args);
      if (this.throttledAnal) {
        const callThrottled = (v: any) => {
          this.throttledAnal.call(this, {
            flagKey: args[0],
            flagValue: v,
          });
        };
        if (returnValue?.constructor?.name === 'Promise') {
          returnValue.then(callThrottled);
        } else {
          callThrottled(returnValue);
        }
      }
      return returnValue;
    };
  };
}
