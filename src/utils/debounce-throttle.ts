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

const debounceInstance = new DebounceThrottleCreator(true);
/**
 *  a debounce utility function create debounced function, when finally
 *  called will be called with an array of aggregated unique arguments
 *  debounced function will be called after ms time only when there are no
 *  more invokation to the function
 * @param fn the function to be debounced
 * @param ms how many ms after the last invocation to actually invoke fn
 * @param contextAttributes context
 */
export const debounce = debounceInstance.createFn();

const throttleInstance = new DebounceThrottleCreator(false);
/**
 *  a throttle utility function create throttled function, when finally
 *  called will be called with an array of aggregated unique arguments.
 *  throttled function will be called after ms time regardless
 *  of invokation that happened during ms.
 * @param fn the function to be debounced
 * @param ms how many ms after the last invocation to actually invoke fn
 * @param contextAttributes context
 */
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
