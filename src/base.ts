import EventEmitter from 'events';
import { getter, debounce } from './utils';
import { AnalyticsFn, Cache, ContextAttributes, GraveYard } from './constructor-types';

/**
 * base class that has get function and the cache and creates the debounced
 * analytics function
 */

export class Base extends EventEmitter {
  cache: Cache = {};
  contextAttributes: ContextAttributes;
  protected debounceMs = 1000;
  private debouncedAnal: AnalyticsFn | undefined;
  protected graveYard: GraveYard | undefined;
  private accessedFlags: Record<string, unknown> = {};

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

  get<T = Cache>(path: string): T | Promise<T> {
    const value = getter(this.graveYard?.key, this.graveYard?.log)<T>(this.cache, path);
    // Recorded here rather than in the subclasses, as this is the only place an actual flag read happens:
    // in pre-fetch mode the cache holds every flag regardless of what the consumer asked for, so the cache
    // cannot tell which flags took part in an operation
    this.accessedFlags[path] = value;
    return value;
  }

  /**
   * The flags that were fetched from this instance through get, mapped to the value they were resolved to.
   * Only explicit get calls are recorded, flags that were merely populated into the cache are not considered
   * accessed. Each flag appears once, holding the value of its last access, in the order it was first accessed
   * @returns a copy of the accessed flags record, so that mutating it does not affect the record
   */
  getAccessedFlags(): Record<string, unknown> {
    return { ...this.accessedFlags };
  }
}
