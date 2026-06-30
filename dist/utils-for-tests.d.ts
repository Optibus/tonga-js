import { AnalyticsFn, DebounceArgs } from './constructor-types';
import EventEmitter from 'events';
export interface AnalyticsEmitter {
    debounceArgs: DebounceArgs[];
    invocationCounter: number;
}
export declare const createAnalytics: (emitter: EventEmitter) => AnalyticsFn;
//# sourceMappingURL=utils-for-tests.d.ts.map