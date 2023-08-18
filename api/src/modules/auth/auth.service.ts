import { JwtService } from '@nestjs/jwt';
import { ConfigType, getConfigToken } from '@nestjs/config';
import {
  Inject, Injectable, UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as argon2 from 'argon2';
import { JwtAcessTokenConfig, JwtRefreshTokenConfig } from 'src/configs';
import { UsersService } from 'src/modules/users/users.service';
import { JWT_ACCESS_CONFIG_TOKEN, JWT_REFRESH_CONFIG_TOKEN } from 'src/configs/entries/jwt.config';
import {
  SignInOptions, SignInResult, SignUpOptions, SignUpResult,
} from './types/service';
import { UserStatus } from '../users/types/common';
import { User } from '../users/user.entity';
import { UserManager } from '../user-manager/user-manager.classes';
import { Tokens } from './types/common';
import {
  JwtAccessTokenPayload, JwtRefreshTokenData, JwtRefreshTokenPayload, JwtTokenType, MaybeNull,
} from 'src/types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private usersManager: UserManager,
    private jwtService: JwtService,
    @Inject(getConfigToken(JWT_ACCESS_CONFIG_TOKEN))
    private readonly jwtAccessTokenConfig: ConfigType<typeof JwtAcessTokenConfig>,
    @Inject(getConfigToken(JWT_REFRESH_CONFIG_TOKEN))
    private readonly jwtRefreshTokenConfig: ConfigType<typeof JwtRefreshTokenConfig>,
  ) {}

  private async generateTokens(userId: string): Promise<Tokens> {
    const jwtAccessTokenPayload: JwtAccessTokenPayload = {
      sub: JwtTokenType.ACCESS,
      uid: userId,
    };
    const accessToken = await this.jwtService.signAsync(jwtAccessTokenPayload, {
      secret: this.jwtAccessTokenConfig.secret,
      expiresIn: this.jwtAccessTokenConfig.signOptions.expiresIn,
    });

    const jwtRefreshTokenPayload: JwtRefreshTokenPayload = {
      sub: JwtTokenType.REFRESH,
      uid: userId,
    };
    const refreshToken = await this.jwtService.signAsync(jwtRefreshTokenPayload, {
      secret: this.jwtRefreshTokenConfig.secret,
      expiresIn: this.jwtRefreshTokenConfig.signOptions.expiresIn,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  private async updateRefreshTokenHash(userId: string, refreshToken: string) {
    const user = await this.usersService.getOneOrFail(userId);
    user.refreshTokenHash = await argon2.hash(refreshToken);
    user.save();
  }

  async validateUser(userId: string): Promise<User> {
    const user = await this.usersService.getOne(userId);

    if (!user) {
      throw new UnauthorizedException({
        message: `User with id ${userId} not found`,
      });
    }

    if (user.status === UserStatus.DELETED) {
      throw new UnauthorizedException({
        message: `User with id ${userId} has been deleted`,
      });
    }

    return user;
  }

  async signIn(options: SignInOptions): Promise<SignInResult> {
    const { username, password } = options;
    const user = await this.usersService.getOneByUsername(username);

    if (!user) {
      throw new UnauthorizedException({
        message: `User with username ${username} not found`,
      });
    }

    if (user.status === UserStatus.DELETED) {
      throw new UnauthorizedException({
        message: `User with username ${username} has been deleted`,
      });
    }

    if (!user?.passwordHash || !await bcrypt.compare(password, user.passwordHash)) {
      throw new UnauthorizedException({
        message: `Password is incorrect`,
      });
    }

    const tokens =  await this.generateTokens(user.id);
    await this.updateRefreshTokenHash(user.id, tokens.refreshToken);

    return {
      user,
      ...tokens,
    };
  }

  async signUp(options: SignUpOptions): Promise<SignUpResult> {
    const user = await this.usersService.create(options);

    const tokens = await this.generateTokens(user.id);
    await this.updateRefreshTokenHash(user.id, tokens.refreshToken);

    return {
      user,
      ...tokens,
    };
  }

  async signOut(userId: string): Promise<boolean> {
    const user = await this.usersService.getOneOrFail(userId);
    if (user.refreshTokenHash) {
      user.refreshTokenHash = null;
      user.save();
    }

    return true;
  }

  async refreshTokens(refreshToken: string): Promise<Tokens> {
    const refreshTokenData = this.jwtService.decode(refreshToken) as MaybeNull<JwtRefreshTokenData>;

    if (!refreshTokenData) {
      throw new UnauthorizedException({
        message: `Invalid refresh token`,
      });
    }

    const user = await this.usersService.getOneOrFail(refreshTokenData.uid);

    if (!user.refreshTokenHash) {
      throw new UnauthorizedException({
        message: `Refresh token expired`,
      });
    }

    const isRefreshTokensMatches = await argon2.verify(user.refreshTokenHash, refreshToken);
    if (!isRefreshTokensMatches) {
      throw new UnauthorizedException({
        message: `Refresh token expired`,
      });
    }

    const tokens = await this.generateTokens(user.id);
    await this.updateRefreshTokenHash(user.id, tokens.refreshToken);

    return tokens;
  }
}
