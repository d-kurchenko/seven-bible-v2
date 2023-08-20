import { appConfig } from '../config';
import {
  NodeEnv, UIEnv, type Is,
} from '../types';

export const is: Is = {
  electron: appConfig.uiEnv === UIEnv.ELECTRON,
  spa: appConfig.uiEnv === UIEnv.SPA,
  production: appConfig.nodeEnv === NodeEnv.PRODUCTION,
  development: appConfig.nodeEnv === NodeEnv.DEVELOPMENT,
};
