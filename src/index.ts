import { Ondemand } from './ondemand';
import { Prefetch } from './prefetch';
import { Options, ContextAttributes } from './constructor-types';

/**
 * This the main Tonga Class
 */

export default function mainRouter(
  options: Options,
  serverApiFunctions: any,
  context_attributes: ContextAttributes,
) {
  if (options.fetchMode === 'prefetch') {
    return new Prefetch(serverApiFunctions, context_attributes);
  }
  return new Ondemand(serverApiFunctions, context_attributes);
}
