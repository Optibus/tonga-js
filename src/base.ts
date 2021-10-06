import EventEmitter from 'events';
import { getter } from './utils';
import { Cache } from './constructor-types';

/**
 * base class that has get function and the cache
 */

export class Base extends EventEmitter {
  cache: Cache;

  constructor() {
    super();
    this.cache = {};
  }

  get(path: string): Cache {
    return getter(this.cache, path);
  }
}
