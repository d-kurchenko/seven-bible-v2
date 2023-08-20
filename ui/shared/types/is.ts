export enum IsKey {
  ELECTRON = 'electron',
  SPA = 'spa',
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
}

export type Is = Record<IsKey, boolean>
