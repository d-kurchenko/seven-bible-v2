import { createI18n } from 'vue-i18n';
import { definePlugin } from 'src/shared/helpers/plugin';

import type { MessageLanguages } from 'app/@types/i18n';
import { messages } from 'src/shared/i18n';

export const i18nPlugin = definePlugin({
  install(app) {
    const i18n = createI18n({
      locale: 'en-US' as MessageLanguages,
      legacy: false,
      messages,
    });

    app.use(i18n);
  },
});
