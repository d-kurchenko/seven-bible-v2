import { loadEnv } from  'src/tools/env';
loadEnv();

import { createAppConfig } from './entries/app.config';
import { createDatabaseConfig } from './entries/database.config';
import { createJwtAccessTokenConfig, createJwtRefreshTokenConfig } from './entries/jwt.config';
const NAME = 'Seven Bible';
const SHORTNAME = 'sb';

export const AppConfig = createAppConfig({
  name: NAME,
  shortname: SHORTNAME,
});

const {
  databaseName,
  databaseProvider,
} = AppConfig();

export const DatabaseConfig = createDatabaseConfig({
  database: databaseName,
  type: databaseProvider,
});

export const JwtAcessTokenConfig = createJwtAccessTokenConfig();
export const JwtRefreshTokenConfig = createJwtRefreshTokenConfig();

