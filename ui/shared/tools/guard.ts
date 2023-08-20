import type { Entries, OmitIndexSignature } from 'type-fest';
import type { AppConfig, IsKey } from '../types';
import { appConfig } from '../config';
import { is } from 'app/shared/tools';

export interface GuardOptions {
  config?: {
    [key in keyof Partial<OmitIndexSignature<AppConfig>>]: AppConfig[key] | AppConfig[key][]
  };
  is?: IsKey | IsKey[];
}

export const guard = (options: GuardOptions, callback?: () => void): boolean => {
  let hasAccess = true;

  if (options.config) {
    hasAccess = (Object.entries(options.config) as Entries<typeof options['config']>)
      .every(([key, value]) => {
        if (typeof value === 'object' && Array.isArray(value)) {
          return value.includes(appConfig[key] as never);
        } else {
          return appConfig[key] === value;
        }
      });
  }

  if (options.is) {
    if (Array.isArray(options.is)) {
      hasAccess = options.is.every((isKey) => is[isKey]);
    } else {
      hasAccess = is[options.is];
    }
  }

  if (hasAccess) {
    callback?.();

    return true;
  }

  return false;
};
