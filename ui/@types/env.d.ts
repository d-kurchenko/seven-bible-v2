// eslint-disable-next-line spaced-comment
/// <reference types="vite/client" />

type NodeEnv = 'development' | 'production';
type UIEnv = 'electron' | 'spa';

interface ImportMetaEnv {
  readonly NODE_ENV: NodeEnv;
  readonly UI_ENV: UIEnv;
  readonly VITE_PORT: string;
  readonly VITE_LOCAL_API_URL: string;
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
