import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { createActionContext } from 'src/tools/context';
import { IActionContext } from 'src/types';

export const GqlActionContext = createParamDecorator(
  (_: unknown, executionContext: ExecutionContext): IActionContext => {
    return createActionContext(executionContext);
  },
);
