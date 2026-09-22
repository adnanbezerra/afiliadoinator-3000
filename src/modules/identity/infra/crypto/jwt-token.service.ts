import { jwtVerify, SignJWT } from "jose";
import type {
  TokenPayload,
  TokenService,
} from "../../application/shared/TokenService";
import { AuthConfigurationError } from "../../application/shared/AuthError";

const TOKEN_ISSUER = "afiliadoinator-3000";
const TOKEN_AUDIENCE = "afiliadoinator-3000";

function encodeSecret(secret: string | undefined): Uint8Array {
  if (!secret || secret.length < 32) {
    throw new AuthConfigurationError(
      "JWT_SECRET must contain at least 32 characters",
    );
  }

  return new TextEncoder().encode(secret);
}

export class JwtTokenService implements TokenService {
  constructor(private readonly secret = process.env.JWT_SECRET) {}

  assertReady(): void {
    encodeSecret(this.secret);
  }

  sign({ userId }: TokenPayload): Promise<string> {
    return new SignJWT({})
      .setProtectedHeader({ alg: "HS256" })
      .setSubject(userId)
      .setIssuer(TOKEN_ISSUER)
      .setAudience(TOKEN_AUDIENCE)
      .setIssuedAt()
      .setExpirationTime("7d")
      .sign(encodeSecret(this.secret));
  }

  async verify(token: string): Promise<TokenPayload> {
    const { payload } = await jwtVerify(token, encodeSecret(this.secret), {
      issuer: TOKEN_ISSUER,
      audience: TOKEN_AUDIENCE,
    });

    if (!payload.sub) {
      throw new Error("Token subject is missing");
    }

    return { userId: payload.sub };
  }
}
