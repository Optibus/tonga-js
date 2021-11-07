import { Cache, ContextAttributes, ServerApiFunctionsPrefetch } from './constructor-types';
import { Base } from './base';
import { throttleDeco } from './utils';

/**
 * Prefetch means the getter will be a sync function,
 * All the data must be fetched before it is ready
 */

export class Prefetch extends Base {
  private isReady: boolean;

  constructor(
    serverApiFunction: ServerApiFunctionsPrefetch,
    context_attributes: ContextAttributes,
  ) {
    super(serverApiFunction, context_attributes);
    this.isReady = false;
    serverApiFunction.getConfData(context_attributes).then((result) => {
      this.cache = result;
      this.isReady = true;
      this.emit('ready');
    });
  }

  /**
   * Synchronos function
   * @param path  the path to flag.
   */
  @throttleDeco()
  get(path: string): Cache {
    if (!this.isReady) {
      throw new Error('not ready yet');
    }
    return super.get(path);
  }
}
