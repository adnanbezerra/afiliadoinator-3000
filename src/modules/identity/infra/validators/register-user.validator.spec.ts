import { describe, expect, it } from "vitest";
import { registerUserValidator } from "./register-user.validator";

const validRegistration = {
  name: "Adnan",
  email: "adnan@example.com",
  password: "Password1!",
};

describe("registerUserValidator", () => {
  it("accepts a password that meets every security requirement", () => {
    expect(registerUserValidator.safeParse(validRegistration).success).toBe(true);
  });

  it.each([
    ["at least 8 characters", "Pass1!"],
    ["an uppercase letter", "password1!"],
    ["a lowercase letter", "PASSWORD1!"],
    ["a number", "Password!"],
    ["a special character", "Password1"],
  ])("rejects a password without %s", (_requirement, password) => {
    expect(
      registerUserValidator.safeParse({ ...validRegistration, password }).success,
    ).toBe(false);
  });
});
