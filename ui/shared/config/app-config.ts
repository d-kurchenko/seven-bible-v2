import type { AppConfig } from '../types';

const env = import.meta.env;

export const appConfig: AppConfig = {
  localApiGql: env.RENDERER_LOCAL_API_GQL,
  localApiUrl: env.VITE_LOCAL_API_URL,
  port: env.VITE_PORT,
  nodeEnv: env.NODE_ENV,
  uiEnv: env.UI_ENV,
  baseUrl: env.BASE_URL,
};
