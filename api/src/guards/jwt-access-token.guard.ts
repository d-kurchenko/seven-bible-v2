import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthStrategy } from 'src/types';
import { createActionContext } from 'src/tools/context';

@Injectable()
export class JwtAccessTokenGuard extends AuthGuard(AuthStrategy.JWT_AT) {
  getRequest(executionContext: ExecutionContext) {
    const context = createActionContext(executionContext);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return context.request as any;
  }
}
