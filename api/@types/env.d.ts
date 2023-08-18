import { DatabaseProvider, NodeEnv } from 'src/enums/config.enum';

declare global {
  declare namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      HOST: string;
      UI_HOST: string;
      NODE_ENV: NodeEnv;
      DB_PROVIDER: DatabaseProvider;
      JWT_AT_SECRET: string;
      JWT_RT_SECRET: string;
    }
  }
}
