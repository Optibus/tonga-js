/* eslint-disable @typescript-eslint/ban-types */

import { ContextAttributes } from '../constructor-types';
import { ObjectSet } from './object-set';

class DebounceThrottleCreator {
  isDebounce: boolean;

  constructor(isDebounce: boolean) {
    this.isDebounce = isDebounce;
  }

  createFn() {
    const isDebounce = this.isDebounce;
    return function throttleOrDebounce(
      fn: Function,
      ms: number,
      contextAttributes?: ContextAttributes,
    ): Function {
      let timeoutId: ReturnType<typeof setTimeout> | undefined;
      const uniqueArgs = new ObjectSet();
      return function (...args: any[]) {
        uniqueArgs.addMany(args);
        if (timeoutId) {
          if (isDebounce) {
            clearTimeout(timeoutId);
          } else {
            return;
          }
        }
        timeoutId = setTimeout(() => {
          fn(uniqueArgs.getAll(), contextAttributes);
          uniqueArgs.clear();
          timeoutId = undefined;
        }, ms);
      };
    };
  }
}

/**
 *  a debounce utility function create debounced function, when finally
 *  called will be called with an array of aggregated arguments
 * @param fn the function to be debounced
 * @param ms how many ms after the last invocation to actually invoke fn
 * @param contextAttributes context
 */
const debounceInstance = new DebounceThrottleCreator(true);
export const debounce = debounceInstance.createFn();

/**
 *  a debounce utility function create debounced function, when finally
 *  called will be called with an array of aggregated arguments
 * @param fn the function to be debounced
 * @param ms how many ms after the last invocation to actually invoke fn
 * @param contextAttributes context
 */
const throttleInstance = new DebounceThrottleCreator(false);
export const throttle = throttleInstance.createFn();

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
