// eslint-disable-next-line spaced-comment
/// <reference types="vite/client" />

import type { NodeEnv, UIEnv } from 'app/shared/types/env';

declare global {
  interface ImportMetaEnv {
    readonly NODE_ENV: NodeEnv;
    readonly UI_ENV: UIEnv;
    readonly VITE_PORT: string;
    readonly VITE_LOCAL_API_URL: string;
    readonly RENDERER_LOCAL_API_GQL: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }

  declare namespace NodeJS {
    interface ProcessEnv {
      ELECTRON_RENDERER_URL: string;
      UI_ENV: UIEnv;
    }
  }
}
