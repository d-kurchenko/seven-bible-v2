import { fileURLToPath, URL } from 'node:url';
import path from 'node:path';

import {
  loadEnv,
  mergeConfig,
  type UserConfig,
  type UserConfigExport,
} from 'vite';
import {
  defineConfig,
  defineViteConfig,
  splitVendorChunkPlugin,
} from 'electron-vite';
import vue from '@vitejs/plugin-vue';
import { quasar, transformAssetUrls } from '@quasar/vite-plugin';

enum EnvPrefix {
  MAIN = 'MAIN_VITE',
  PRELOAD = 'PRELOAD_',
  RENDERER = 'RENDERER_',
  ALL = 'VITE_',
}

const loadEnvCustom = (mode: string) => {
  const env = loadEnv(mode, process.cwd(), Object.values(EnvPrefix));

  const metaEnv = {
    PORT: env.VITE_PORT,
    UI_ENV: (process.env.UI_ENV || 'spa') as UIEnv,
    NODE_ENV: mode as NodeEnv,
  };

  return {
    env,
    metaEnv,
  };
};

const getCommonConfig: UserConfigExport = ({ mode }) => {
  const { metaEnv } = loadEnvCustom(mode);

  return {
    resolve: {
      alias: {
        'app': fileURLToPath(new URL('.', import.meta.url)),
        'src': fileURLToPath(new URL('./src', import.meta.url)),
        'src-electron': fileURLToPath(new URL('./src-electron', import.meta.url)),
      },
    },
    define: {
      'import.meta.env.UI_ENV': JSON.stringify(metaEnv.UI_ENV),
      'import.meta.env.NODE_ENV': JSON.stringify(metaEnv.NODE_ENV),
    },
    server: {
      port: Number(metaEnv.PORT),
    },
  } as UserConfig;
};

const getCommonElectronConfig: UserConfigExport = (config) => {
  return {
    ...mergeConfig({
      // plugins: [externalizeDepsPlugin({
      //   exclude: ['@vueuse/core', 'vue'],
      // })],
    } as UserConfig, getCommonConfig(config)),
  } as UserConfig;
};

const getRendererConfig: UserConfigExport = (config) => {
  const { metaEnv } = loadEnvCustom(config.mode);

  return {
    ...mergeConfig({
      root: '.',
      envPrefix: [EnvPrefix.ALL, EnvPrefix.RENDERER],
      plugins: [
        vue({
          template: {
            transformAssetUrls,
          },
        }),
        quasar({
          autoImportComponentCase: 'pascal',
        }),
        splitVendorChunkPlugin(),
      ],
      build: metaEnv.UI_ENV === 'electron' ? undefined : {
        outDir: 'dist/spa',
      },
    } as UserConfig, getCommonConfig(config)),
  };
};

export const rendererDefineConfig = defineViteConfig(getRendererConfig);

export default defineConfig((config) => {
  process.env.UI_ENV = 'electron';

  return {
    renderer: mergeConfig({
      build: {
        rollupOptions: {
          input: {
            index: path.resolve(__dirname, './index.html'),
          },
        },
      },
    } as UserConfig, getRendererConfig(config)),

    main: defineViteConfig((config) => {
      return {
        ...mergeConfig({
          root: '.',
          envPrefix: [EnvPrefix.ALL, EnvPrefix.MAIN],
          build: {
            rollupOptions: {
              input: {
                index: path.resolve(__dirname, 'src-electron/main.ts'),
              },
            },
          },
        } as UserConfig, getCommonElectronConfig(config)),
      };
    }),

    preload: defineViteConfig((config) => {
      return mergeConfig({
        envPrefix: [EnvPrefix.ALL, EnvPrefix.PRELOAD],
        build: {
          rollupOptions: {
            input: {
              index: path.resolve(__dirname, 'src-electron/preload.ts'),
            },
          },
        },
      } as UserConfig, getCommonElectronConfig(config));
    }),
  };
});
