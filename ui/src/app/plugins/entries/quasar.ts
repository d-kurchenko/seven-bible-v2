import { definePlugin } from 'src/shared/helpers/plugin';

import { Quasar } from 'quasar';
import '@quasar/extras/roboto-font/roboto-font.css';
import '@quasar/extras/material-icons/material-icons.css';
import 'quasar/dist/quasar.css';

export const quasarPlugin = definePlugin({
  install(app) {
    app.use(Quasar, {
      plugins: {
      },
      config: {
      },
    });
  },
});
