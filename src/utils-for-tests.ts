import { AnalyiticsFnType, ThrottleArgs } from './constructor-types';
import EventEmitter from 'events';

export interface AnalyticsEmitter {
  throttleArgs: ThrottleArgs[];
  invocationCounter: number;
}

export const createAnalytics = (emitter: EventEmitter): AnalyiticsFnType => {
  let invocationCounter = 0;
  return (throttleArgs) => {
    invocationCounter++;
    emitter.emit('invoked', { throttleArgs, invocationCounter });
    return new Promise((resolve) => {
      resolve();
    });
  };
};
