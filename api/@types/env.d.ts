declare namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    HOST: string;
    UI_HOST: string;
    NODE_ENV: 'development' | 'production';
  }
}
