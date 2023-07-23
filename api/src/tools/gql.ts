export interface BaseGraphQLContext {
  app: string;
  connectionParams?: Record<string, unknown>;
}

export const createGraphQLContext = <T extends BaseGraphQLContext = BaseGraphQLContext>(ctx: T) => ctx;

