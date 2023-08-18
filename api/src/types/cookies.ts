export enum Cookie {
  ACCESS_TOKEN = 'AccessToken',
  REFRESH_TOKEN = 'RefreshToken',
}

export type Cookies = Record<Cookie, string>;
