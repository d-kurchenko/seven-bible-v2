/* eslint-disable node/no-unsupported-features/es-syntax */
import { registerAs } from '@nestjs/config';
import 'dotenv/config';

export const APP_CONFIG_TOKEN = 'APP_CONFIG_TOKEN';

export interface AppConfig {
  env: NodeJS.ProcessEnv['NODE_ENV'];
  name: string;
  shortname: string;
  port: number;
  host: string;
  uiHost: string;
}

export const createAppConfig = (params: Pick<AppConfig, 'name' | 'shortname'>) => {
  return registerAs(APP_CONFIG_TOKEN, (): AppConfig => ({
    env: process.env.NODE_ENV,
    name: params.name,
    shortname: params.shortname,
    port: process.env.PORT,
    host: process.env.HOST,
    uiHost: process.env.UI_HOST,
  }));
};
