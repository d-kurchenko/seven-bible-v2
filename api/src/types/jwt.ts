export enum JwtTokenType {
  ACCESS = 'access',
  REFRESH = 'refresh',
}

interface BaseJwtTokenPayload {
  /**
   * Token type
   */
  sub: JwtTokenType;

  /**
   * User ID
   */
  uid: string;
}

export interface JwtAccessTokenPayload extends BaseJwtTokenPayload {
  sub: JwtTokenType.ACCESS;
}

export interface JwtRefreshTokenPayload extends BaseJwtTokenPayload {
  sub: JwtTokenType.REFRESH;
}

interface BaseJwtTokenData {
  /**
   * Issued at
   */
  iat: number;

  /**
   * Expiration time
   */
  exp: number;
}
export interface JwtAccessTokenData extends BaseJwtTokenData, JwtAccessTokenPayload {}

export interface JwtRefreshTokenData extends BaseJwtTokenData, JwtRefreshTokenPayload {}
