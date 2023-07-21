import type { Entries, OmitIndexSignature } from 'type-fest';

interface GuardOptions {
  env: {
    [envKey in keyof Partial<OmitIndexSignature<ImportMetaEnv>>]: ImportMetaEnv[envKey] | ImportMetaEnv[envKey][]
  };
}

export const guard = (options: GuardOptions, callback: () => void) => {
  const hasAccess = (Object.entries(options.env) as Entries<typeof options['env']>)
    .every(([key, value]) => {
      if (typeof value === 'object' && Array.isArray(value)) {
        return value.includes(import.meta.env[key] as never);
      } else {
        return import.meta.env[key] === value;
      }
    });

  if (hasAccess) {
    callback();
  }
};
