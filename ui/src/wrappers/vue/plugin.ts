import type { App, Plugin } from 'vue';

export const definePlugin = (plugin: Plugin) => plugin;

export const definePlugins = (plugins: Plugin[]) => plugins;

export const registerPlugins = (app: App, plugins: Plugin[]) => {
  plugins.forEach((plugin) => {
    app.use(plugin);
  });
};
