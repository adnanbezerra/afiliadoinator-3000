import { beforeEach, describe, expect, it, vi } from "vitest";

const { execute } = vi.hoisted(() => ({ execute: vi.fn() }));

vi.mock("../../application/RegisterUser/RegisterUser.factory", () => ({
  getRegisterUser: () => ({ execute }),
}));

import { registerUserRoute } from "./register-user.route";

describe("registerUserRoute", () => {
  beforeEach(() => {
    execute.mockReset();
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
          password: "password1",
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
});
