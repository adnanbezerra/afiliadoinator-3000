import { describe, expect, it } from "vitest";
import { AuthConfigurationError } from "../../application/shared/AuthError";
import { JwtTokenService } from "./jwt-token.service";

describe("JwtTokenService", () => {
  it("rejects a missing secret before token operations", () => {
    const tokens = new JwtTokenService("");

    expect(() => tokens.assertReady()).toThrow(AuthConfigurationError);
    expect(() => tokens.assertReady()).toThrow(
      "JWT_SECRET must contain at least 32 characters",
    );
  });

  it("signs and verifies tokens when the secret is valid", async () => {
    const tokens = new JwtTokenService("a".repeat(64));
    tokens.assertReady();

    const token = await tokens.sign({ userId: "user-id" });

    await expect(tokens.verify(token)).resolves.toEqual({ userId: "user-id" });
  });
});
