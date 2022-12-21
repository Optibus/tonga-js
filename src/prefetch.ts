import { Cache, ContextAttributes, Options, ServerApiFunctionsPrefetch } from './constructor-types';
import { Base } from './base';
import { debounceDeco } from './utils';

/**
 * Prefetch means the getter will be a sync function,
 * All the data must be fetched before it is ready
 */

export class Prefetch extends Base {
  private isReady: boolean;

  constructor(
    serverApiFunction: ServerApiFunctionsPrefetch,
    context_attributes: ContextAttributes,
    options: Options = { isAsync: true },
  ) {
    super(serverApiFunction, context_attributes);
    this.isReady = false;
    const { isAsync, graveYard } = options;
    this.graveYard = graveYard;
    const done = (result: Cache) => {
      this.cache = result;
      this.isReady = true;
      this.emit('ready');
    };
    if (isAsync) {
      serverApiFunction.getConfData(context_attributes).then(done);
    } else {
      done(serverApiFunction.getConfData(context_attributes));
    }
  }

  /**
   * Synchronous function
   * @param path the path to flag.
   */
  @debounceDeco()
  get(path: string): Cache {
    if (!this.isReady) {
      throw new Error('not ready yet');
    }
    return super.get(path);
  }
}
