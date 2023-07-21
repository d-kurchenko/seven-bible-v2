import { definePlugin } from 'app/src/wrappers/vue/plugin';
import { router } from 'src/router';

export const routerPlugin = definePlugin({
  install(app) {
    app.use(router);
  },
});
