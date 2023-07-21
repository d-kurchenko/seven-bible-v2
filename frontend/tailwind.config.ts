import type { Config } from 'tailwindcss/types/config';
import plugin from 'tailwindcss/plugin';

export default {
  prefix: 't-',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        '.fit': {
          width: '100%',
          height: '100%',
        },
      });
    }),
  ],
} as Config;
