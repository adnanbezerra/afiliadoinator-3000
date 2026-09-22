import { describe, expect, it } from "vitest";
import { InvalidCredentialsError } from "../shared/AuthError";
import type { PasswordHasher } from "../shared/PasswordHasher";
import type { TokenService } from "../shared/TokenService";
import type {
  CreateUserData,
  UserRecord,
  UserRepository,
} from "../shared/UserRepository";
import { AuthenticateUser } from "./AuthenticateUser.usecase";

const user: UserRecord = {
  id: "c975f760-70e8-42fe-af6e-e0da037d6208",
  name: "Adnan",
  email: "adnan@example.com",
  passwordHash: "hashed:password1",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const users: UserRepository = {
  findByEmail: async (email) => (email === user.email ? user : null),
  findById: async (id) => (id === user.id ? user : null),
  create: async (data: CreateUserData) => ({ ...user, ...data }),
};

const passwordHasher: PasswordHasher = {
  hash: async (password) => `hashed:${password}`,
  compare: async (password, hash) => hash === `hashed:${password}`,
};

const tokens: TokenService = {
  assertReady: () => undefined,
  sign: async ({ userId }) => `token:${userId}`,
  verify: async (token) => ({ userId: token.replace("token:", "") }),
};

describe("AuthenticateUser", () => {
  it("returns a session token for valid credentials", async () => {
    const useCase = new AuthenticateUser(users, passwordHasher, tokens);

    const result = await useCase.execute({
      email: user.email,
      password: "password1",
    });

    expect(result.token).toBe(`token:${user.id}`);
    expect(result.user).not.toHaveProperty("passwordHash");
  });

  it("rejects an invalid password", async () => {
    const useCase = new AuthenticateUser(users, passwordHasher, tokens);

    await expect(
      useCase.execute({ email: user.email, password: "wrong-password" }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
