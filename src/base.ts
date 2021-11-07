import EventEmitter from 'events';
import { getter, throttle } from './utils';
import { AnalyiticsFnType, Cache, ContextAttributes } from './constructor-types';

/**
 * base class that has get function and the cache
 */

export class Base extends EventEmitter {
  cache: Cache = {};
  contextAttributes: ContextAttributes;
  protected throttleMs = 1000;
  private throttledAnal: AnalyiticsFnType | undefined;

  constructor(serverApiFunction: any, context_attributes: ContextAttributes) {
    super();
    this.contextAttributes = context_attributes;
    if (serverApiFunction.analytics) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.throttledAnal = throttle(
        serverApiFunction.analytics,
        this.throttleMs,
        context_attributes,
      );
    }
  }

  get(path: string): Cache {
    return getter(this.cache, path);
  }
}
