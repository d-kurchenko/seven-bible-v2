declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;
    QUASAR_ELECTRON_PRELOAD: string;
    APP_URL: string;
    PORT: string;
    PLATFORM: 'web' | 'electron';
    API_URL: string;
  }
}
