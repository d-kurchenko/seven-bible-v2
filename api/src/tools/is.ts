import { AppConfig } from 'src/configs';
import { DatabaseProvider, NodeEnv } from 'src/types';

const appConfig = AppConfig();

const isElectron = Boolean(process.send);
const isStandalone = !isElectron;

export const is = {
  electron: isElectron,
  standalone: isStandalone,
  local: appConfig.nodeEnv === NodeEnv.LOCAL,
  development: appConfig.nodeEnv === NodeEnv.DEVELOPMENT,
  production: appConfig.nodeEnv === NodeEnv.PRODUCTION,
  postgres: appConfig.databaseProvider === DatabaseProvider.POSTGRES,
  sqlite: appConfig.databaseProvider === DatabaseProvider.SQLITE,
};

