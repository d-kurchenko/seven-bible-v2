import { createApp as createAppVue, type Plugin } from 'vue';
import { registerPlugins } from './plugin';

type CreateAppParameters = Parameters<typeof createAppVue>

export const createApp = (...createAppVueParameters: CreateAppParameters) => {
  const appVue = createAppVue(...createAppVueParameters);

  const app = {
    ...appVue,
    registerPlugins: (plugins: Plugin[]) => {
      registerPlugins(app, plugins);
    },
  };

  return app;
};

export type App = ReturnType<typeof createApp>
