import { AnalyticsFn, DebounceArgs } from './constructor-types';
import EventEmitter from 'events';

export interface AnalyticsEmitter {
  debounceArgs: DebounceArgs[];
  invocationCounter: number;
}

export const createAnalytics = (emitter: EventEmitter): AnalyticsFn => {
  let invocationCounter = 0;
  return (debounceArgs) => {
    invocationCounter++;
    emitter.emit('invoked', { debounceArgs, invocationCounter });
    return new Promise((resolve) => {
      resolve();
    });
  };
};
