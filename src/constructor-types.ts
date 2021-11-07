/**
 * Can be any context attributes that would like ot best to the server
 * when using 'getConfData' or 'getFlag'
 */
export type ContextAttributes = {
  user?: string;
};

export type Cache = any;
// export type Cache = { [id: string]: unknown };

export interface ThrottleArgs {
  flagKey: string;
  flagValue: unknown;
}

export type AnalyiticsFnType = (
  throttleArgs: ThrottleArgs[],
  context: ContextAttributes,
) => Promise<void>;

type ServerApiFunctions = {
  analytics?: AnalyiticsFnType;
};

export interface ServerApiFunctionsPrefetch extends ServerApiFunctions {
  /**
   * this will be called at the constructor
   * @returns a promise that resolves to the entire config Object
   */
  getConfData: (context: ContextAttributes) => Promise<Cache>;
}

export interface ServerApiFunctionsOndemand extends ServerApiFunctions {
  /**
   * this will be called Any time a flag is being 'get'
   * @returns a promise that resolves to the specific value of the flag
   */
  getFlag: (path: string, context: ContextAttributes) => Promise<Cache>;
}

export type Cond = ServerApiFunctionsPrefetch extends ServerApiFunctionsOndemand
  ? ServerApiFunctionsPrefetch
  : ServerApiFunctionsOndemand;
