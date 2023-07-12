import { Entries } from 'type-fest';

const env = {
  MODE: process.env.MODE,
  NODE_ENV: process.env.NODE_ENV,
};

interface GuardOptions {
  env: {
    [aaa in keyof Partial<typeof env>]: typeof env[aaa] | typeof env[aaa][]
  };
}

export const guard = (options: GuardOptions, callback: () => void) => {
  const hasAccess = (Object.entries(options.env) as Entries<typeof options['env']>)
    .every(([key, value]) => {
      if (typeof value === 'object' && Array.isArray(value)) {
        return value.includes(env[key] as never);
      } else {
        return env[key] === value;
      }
    });

  if (hasAccess) {
    callback();
  }
};
