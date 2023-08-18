import { User } from 'src/modules/users/user.entity';
import { Cookies } from './cookies';
import { Request as BaseRequest, Response as BaseResponce } from 'express';

export interface Request extends BaseRequest {
  user: User;
  cookies: Cookies;
  res: BaseResponce;
}

export interface IActionContext {
  app: string;
  user: User;
  cookies: Cookies;
  request: Request;
  response: BaseResponce;
}

export type TGqlExecutionContext = Pick<IActionContext, 'app'> & {req: Request}
