import { registerAs } from '@nestjs/config';
import {
  DatabaseProvider, NodeEnv, Platform,
} from 'src/types';

export const APP_CONFIG_TOKEN = 'APP_CONFIG_TOKEN';

export interface AppConfig {
  nodeEnv: NodeEnv;
  name: string;
  shortname: string;
  port: number;
  host: string;
  uiHost: string;
  platform: Platform;
  databaseName: string;
  databaseProvider: DatabaseProvider;
}

export const createAppConfig = (params: Pick<AppConfig, 'name' | 'shortname'>) => {
  const nodeEnv = process.env.NODE_ENV;
  const platform = process.send ? Platform.ELECTRON : Platform.STANDALONE;
  const databaseProvider = platform === Platform.ELECTRON ? DatabaseProvider.SQLITE : DatabaseProvider.POSTGRES;
  const finalDatabaseProvider = nodeEnv === NodeEnv.LOCAL ? process.env.DB_PROVIDER || databaseProvider : databaseProvider;

  return registerAs(APP_CONFIG_TOKEN, (): AppConfig => ({
    nodeEnv,
    name: params.name,
    shortname: params.shortname,
    port: process.env.PORT,
    host: process.env.HOST,
    uiHost: process.env.UI_HOST,
    platform,
    databaseName: `${params.shortname}_database`,
    databaseProvider: finalDatabaseProvider,
  }));
};
