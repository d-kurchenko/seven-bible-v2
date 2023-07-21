import { definePlugins } from '../wrappers/vue/plugin';

import { routerPlugin } from './entities/router';
import { i18nPlugin } from './entities/i18n';
import { quasarPlugin } from './entities/quasar';

export const vuePlugins = definePlugins([
  routerPlugin,
  i18nPlugin,
  quasarPlugin,
]);
