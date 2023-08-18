
import { Strategy as BaseJwtStrategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType, getConfigToken } from '@nestjs/config';
import { JwtAcessTokenConfig } from 'src/configs';
import { JWT_ACCESS_CONFIG_TOKEN } from 'src/configs/entries/jwt.config';
import {
  AuthStrategy, JwtAccessTokenData, Request,
} from 'src/types';
import { AuthService } from 'src/modules/auth/auth.service';
import { Validatable } from './types';

@Injectable()
export class JwtAcessTokenStrategy
  extends PassportStrategy(BaseJwtStrategy, AuthStrategy.JWT_AT)
  implements Validatable {
  constructor(
    @Inject(getConfigToken(JWT_ACCESS_CONFIG_TOKEN))
    private readonly jwtAccessTokenConfig: ConfigType<typeof JwtAcessTokenConfig>,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: (req: Request) => req?.cookies?.AccessToken || null,
      ignoreExpiration: false,
      secretOrKey: jwtAccessTokenConfig.secret,
    });
  }

  async validate(token: JwtAccessTokenData) {
    const user = await this.authService.validateUser(token.uid);

    return user;
  }
}
