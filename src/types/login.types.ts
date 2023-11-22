export interface ICredentials {
  username: string;
  password: string;
}

export interface ILoginResponse {
  access_token: string;
  token_type: TokenType;
  refresh_token: string;
  expires_in: number;
  scope: Scope;
  jti: string;
}

type Scope = "ui"

export type TokenType = "bearer"