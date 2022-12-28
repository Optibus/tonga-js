import { ContextAttributes, ServerApiFunctionsOndemand, Cache, Options } from './constructor-types';
import { Base } from './base';
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
export declare class Ondemand extends Base {
    private getFlag;
    constructor(serverApiFunctions: ServerApiFunctionsOndemand, context_attributes: ContextAttributes, options?: Options);
    get(path: string): Promise<Cache>;
}
//# sourceMappingURL=ondemand.d.ts.map