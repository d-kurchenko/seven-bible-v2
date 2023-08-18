import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IActionContext, TGqlExecutionContext } from 'src/types';

export const createActionContext = (executionContext: ExecutionContext): IActionContext => {
  const context = GqlExecutionContext.create(executionContext);

  const { app, req } = context.getContext<TGqlExecutionContext>();
  const { user, cookies, res } = req;

  return {
    app,
    cookies,
    user,
    request: req,
    response: res,
  };
};
