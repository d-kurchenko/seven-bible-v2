import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthStrategy } from 'src/types';

@Injectable()
export class LocalAuthGuard extends AuthGuard(AuthStrategy.LOCAL) {}

@Injectable()
export class GqlLocalAuthGuard extends LocalAuthGuard {
  getRequest(executionContext: ExecutionContext) {
    const context = GqlExecutionContext.create(executionContext);

    return context.getContext().req;
  }
}
