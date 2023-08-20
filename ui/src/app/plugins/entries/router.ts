import { definePlugin } from 'src/shared/helpers/plugin';
import { router } from 'src/app/router';

export const routerPlugin = definePlugin({
  install(app) {
    app.use(router);
  },
});
