import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AuthConfigurationError } from "../../application/shared/AuthError";

const { execute } = vi.hoisted(() => ({ execute: vi.fn() }));

vi.mock("../../application/RegisterUser/RegisterUser.factory", () => ({
  getRegisterUser: () => ({ execute }),
}));

import { registerUserRoute } from "./register-user.route";

describe("registerUserRoute", () => {
  beforeEach(() => {
    execute.mockReset();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("creates the session cookie with the registration token", async () => {
    const user = {
      id: "c975f760-70e8-42fe-af6e-e0da037d6208",
      name: "Adnan",
      email: "adnan@example.com",
      createdAt: new Date("2026-09-22T12:00:00.000Z"),
      updatedAt: new Date("2026-09-22T12:00:00.000Z"),
    };
    execute.mockResolvedValue({ token: "signed-token", user });

    const response = await registerUserRoute(
      new Request("http://localhost/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          password: "Password1!",
        }),
      }),
    );

    expect(response.status).toBe(201);
    await expect(response.json()).resolves.toMatchObject({
      user: { id: user.id, email: user.email },
    });
    expect(response.headers.get("set-cookie")).toContain(
      "auth_token=signed-token",
    );
    expect(response.headers.get("set-cookie")).toContain("HttpOnly");
    expect(response.headers.get("set-cookie")).toContain("SameSite=lax");
  });

  it("returns 503 when authentication is not configured", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    execute.mockRejectedValue(
      new AuthConfigurationError("JWT_SECRET must contain at least 32 characters"),
    );

    const response = await registerUserRoute(
      new Request("http://localhost/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Adnan",
          email: "adnan@example.com",
          password: "Password1!",
        }),
      }),
    );

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      error: "Authentication service unavailable",
    });
  });
});
