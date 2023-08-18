import { registerAs } from '@nestjs/config';
import path from 'node:path';
import {
  ConnectionsOptions, DatabaseProvider, NodeEnv, Platform,
} from 'src/types';

export const DATABASE_CONFIG_TOKEN = 'DB_CONFIG_TOKEN';

export const createDatabaseConfig = (options?: ConnectionsOptions) => {
  const nodeEnv = process.env.NODE_ENV;
  const platform = process.send ? Platform.ELECTRON : Platform.STANDALONE;
  const databaseProvider = platform === Platform.ELECTRON ? DatabaseProvider.SQLITE : DatabaseProvider.POSTGRES;
  const finalDatabaseProvider = nodeEnv === NodeEnv.LOCAL ? process.env.DB_PROVIDER || databaseProvider : databaseProvider;

  return registerAs(DATABASE_CONFIG_TOKEN, (): ConnectionsOptions => ({
    type: finalDatabaseProvider,
    synchronize: true,
    entities: [path.join(require.main.path, '/**/*.entity.js')],
    migrations: [path.join(require.main.path, '/migrations/*.js')],
    subscribers: [path.join(require.main.path, '/**/*.entity-subscriber.js')],
    migrationsRun: true,
    ...options,
  }));
};
