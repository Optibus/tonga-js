import EventEmitter from 'events';
import { getter, debounce } from './utils';
import { AnalyticsFn, Cache, ContextAttributes } from './constructor-types';

/**
 * base class that has get function and the cache and creates the debounced
 * analytics function
 */

export class Base extends EventEmitter {
  cache: Cache = {};
  contextAttributes: ContextAttributes;
  protected debounceMs = 1000;
  private debouncedAnal: AnalyticsFn | undefined;

  constructor(serverApiFunction: any, context_attributes: ContextAttributes) {
    super();
    this.contextAttributes = context_attributes;
    if (serverApiFunction.analytics) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.debouncedAnal = debounce(
        serverApiFunction.analytics,
        this.debounceMs,
        context_attributes,
      );
    }
  }

  get(path: string): Cache {
    return getter(this.cache, path);
  }
}
