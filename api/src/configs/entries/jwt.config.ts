import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const JWT_ACCESS_CONFIG_TOKEN = 'JWT_ACCESS_CONFIG_TOKEN';

export const createJwtAccessTokenConfig = (opts?: Partial<JwtModuleOptions>) => {
  return registerAs(JWT_ACCESS_CONFIG_TOKEN, (): JwtModuleOptions => ({
    secret: process.env.JWT_AT_SECRET,
    signOptions: {
      expiresIn: '30s',
    },
    ...opts,
  }));
};

export const JWT_REFRESH_CONFIG_TOKEN = 'JWT_REFRESH_CONFIG_TOKEN';

export const createJwtRefreshTokenConfig = (opts?: Partial<JwtModuleOptions>) => {
  return registerAs(JWT_REFRESH_CONFIG_TOKEN, (): JwtModuleOptions => ({
    secret: process.env.JWT_RT_SECRET,
    signOptions: {
      expiresIn: '28d',
    },
    ...opts,
  }));
};
