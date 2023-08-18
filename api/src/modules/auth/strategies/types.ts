import { User } from 'src/modules/users/user.entity';
import { JwtAccessTokenData, JwtRefreshTokenData } from 'src/types';

type Payload = JwtAccessTokenData | JwtRefreshTokenData;

export declare interface Validatable {
  validate(payload: Payload): Promise<User>;
}
