import { ContextAttributes, ServerApiFunctionsOndemand, Cache } from './constructor-types';
import { Base } from './base';
import setter from 'lodash/set';
import { throttleDeco } from './utils';

/** @module */
/**
 * This is the description of the interface
 *
 * @interface EditDialogField
 * @member {string} label is used for whatever reason
 * @field {string} prop is used for other reason
 */
/**
 * This the main Tonga Class
 */

export class Ondemand extends Base {
  private getFlag: ServerApiFunctionsOndemand['getFlag'];

  constructor(
    serverApiFunctions: ServerApiFunctionsOndemand,
    context_attributes: ContextAttributes,
  ) {
    super(serverApiFunctions, context_attributes);
    this.getFlag = serverApiFunctions.getFlag;
  }

  @throttleDeco()
  async get(path: string): Promise<Cache> {
    let cachedValue = super.get(path);
    if (cachedValue == null) {
      const value = await this.getFlag(path, this.contextAttributes);
      if (value) {
        setter(this.cache, path, value);
      }
      cachedValue = super.get(path);
    }
    return cachedValue;
  }
}
