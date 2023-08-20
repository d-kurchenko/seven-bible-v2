export interface AppConfig {
  nodeEnv: ImportMetaEnv['NODE_ENV'],
  uiEnv: ImportMetaEnv['UI_ENV'],
  port: string,
  localApiUrl: string,
  localApiGql: string
  baseUrl: string
}
