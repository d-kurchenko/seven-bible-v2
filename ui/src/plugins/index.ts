import { definePlugins } from '../wrappers/vue/plugin';

import { routerPlugin } from './entries/router';
import { apolloPlugin } from './entries/apollo';
import { i18nPlugin } from './entries/i18n';
import { quasarPlugin } from './entries/quasar';

export const vuePlugins = definePlugins([
  routerPlugin,
  apolloPlugin,
  i18nPlugin,
  quasarPlugin,
]);
