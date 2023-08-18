
import { Strategy as BaseJwtStrategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType, getConfigToken } from '@nestjs/config';
import { JwtRefreshTokenConfig } from 'src/configs';
import {
  AuthStrategy, JwtRefreshTokenData, Request,
} from 'src/types';
import { JWT_REFRESH_CONFIG_TOKEN } from 'src/configs/entries/jwt.config';
import { AuthService } from 'src/modules/auth/auth.service';
import { Validatable } from './types';

@Injectable()
export class JwtRefreshTokenStrategy
  extends PassportStrategy(BaseJwtStrategy, AuthStrategy.JWT_RT)
  implements Validatable {
  constructor(
    @Inject(getConfigToken(JWT_REFRESH_CONFIG_TOKEN))
    private readonly jwtRefreshTokenConfig: ConfigType<typeof JwtRefreshTokenConfig>,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: (req: Request) => req?.cookies?.RefreshToken || null,
      ignoreExpiration: false,
      secretOrKey: jwtRefreshTokenConfig.secret,
    });
  }

  async validate(token: JwtRefreshTokenData) {
    const user = await this.authService.validateUser(token.uid);

    return user;
  }
}
