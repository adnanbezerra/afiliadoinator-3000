export interface TokenPayload {
  userId: string;
}

export interface TokenService {
  assertReady(): void;
  sign(payload: TokenPayload): Promise<string>;
  verify(token: string): Promise<TokenPayload>;
}
