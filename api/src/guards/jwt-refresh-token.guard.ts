import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthStrategy } from 'src/types';
import { createActionContext } from 'src/tools/context';

@Injectable()
export class JwtRefreshTokenGuard extends AuthGuard(AuthStrategy.JWT_RT) {
  getRequest(executionContext: ExecutionContext) {
    const context = createActionContext(executionContext);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return context.request as any;
  }
}
