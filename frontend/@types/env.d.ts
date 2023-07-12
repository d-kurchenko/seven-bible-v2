declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production';
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;
    QUASAR_ELECTRON_PRELOAD: string;
    APP_URL: string;
    PORT: string;
    LOCAL_API_URL: string;
    REMOTE_API_URL: string;
    MODE: 'spa' | 'electron';
  }
}
