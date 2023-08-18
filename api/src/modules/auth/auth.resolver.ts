import {
  Args, Mutation, Resolver,
} from '@nestjs/graphql';
import { SignInInput, SignUpInput } from './types/resolver';
import { AuthService } from './auth.service';
import { GqlActionContext } from 'src/decorators';
import { Cookie, IActionContext } from 'src/types';
import { UseGuards } from '@nestjs/common';
import { JwtAccessTokenGuard, JwtRefreshTokenGuard } from 'src/guards';
import { CookieOptions } from 'express';
import { User } from '../users/user.entity';

const authCookieOption: CookieOptions = {
  httpOnly: true,
  sameSite: 'strict',
};

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Mutation(() => User)
  async signIn(
    @Args('input') input: SignInInput,
    @GqlActionContext() context: IActionContext,
  ): Promise<User> {
    const { user, accessToken, refreshToken } = await this.authService.signIn(input);

    context.response.cookie(Cookie.ACCESS_TOKEN, accessToken, authCookieOption);
    context.response.cookie(Cookie.REFRESH_TOKEN, refreshToken, authCookieOption);

    return user;
  }

  @Mutation(() => User)
  async signUp(
    @Args('input') input: SignUpInput,
    @GqlActionContext() context: IActionContext,
  ): Promise<User> {
    const { user, accessToken, refreshToken } = await this.authService.signUp(input);

    context.response.cookie(Cookie.ACCESS_TOKEN, accessToken, authCookieOption);
    context.response.cookie(Cookie.REFRESH_TOKEN, refreshToken, authCookieOption);

    return user;
  }

  @UseGuards(JwtAccessTokenGuard)
  @Mutation(() => Boolean)
  async signOut(
    @GqlActionContext() context: IActionContext,
  ): Promise<boolean> {
    await this.authService.signOut(context.user.id);

    context.response.clearCookie(Cookie.ACCESS_TOKEN);
    context.response.clearCookie(Cookie.REFRESH_TOKEN);

    return true;
  }

  @UseGuards(JwtRefreshTokenGuard)
  @Mutation(() => Boolean)
  async refreshTokens(
    @GqlActionContext() context: IActionContext,
  ): Promise<boolean> {
    const { accessToken, refreshToken } = await this.authService.refreshTokens(context.cookies.RefreshToken);

    context.response.cookie(Cookie.ACCESS_TOKEN, accessToken, authCookieOption);
    context.response.cookie(Cookie.REFRESH_TOKEN, refreshToken, authCookieOption);

    return true;
  }
}
