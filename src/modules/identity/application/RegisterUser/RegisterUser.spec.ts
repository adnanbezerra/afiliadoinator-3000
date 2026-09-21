import { describe, expect, it } from "vitest";
import { EmailAlreadyRegisteredError } from "../shared/AuthError";
import type { PasswordHasher } from "../shared/PasswordHasher";
import type {
  CreateUserData,
  UserRecord,
  UserRepository,
} from "../shared/UserRepository";
import { RegisterUser } from "./RegisterUser.usecase";

class InMemoryUserRepository implements UserRepository {
  readonly records: UserRecord[] = [];

  async findByEmail(email: string): Promise<UserRecord | null> {
    return this.records.find((user) => user.email === email) ?? null;
  }

  async findById(id: string): Promise<UserRecord | null> {
    return this.records.find((user) => user.id === id) ?? null;
  }

  async create(data: CreateUserData): Promise<UserRecord> {
    const user = {
      ...data,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.records.push(user);
    return user;
  }
}

const passwordHasher: PasswordHasher = {
  hash: async (password) => `hashed:${password}`,
  compare: async (password, hash) => hash === `hashed:${password}`,
};

describe("RegisterUser", () => {
  it("creates a user without exposing the password hash", async () => {
    const users = new InMemoryUserRepository();
    const useCase = new RegisterUser(users, passwordHasher);

    const result = await useCase.execute({
      name: "Adnan",
      email: "adnan@example.com",
      password: "password1",
    });

    expect(result.email).toBe("adnan@example.com");
    expect(result).not.toHaveProperty("passwordHash");
    expect(users.records[0].passwordHash).toBe("hashed:password1");
  });

  it("rejects a duplicated email", async () => {
    const users = new InMemoryUserRepository();
    const useCase = new RegisterUser(users, passwordHasher);
    const input = {
      name: "Adnan",
      email: "adnan@example.com",
      password: "password1",
    };

    await useCase.execute(input);

    await expect(useCase.execute(input)).rejects.toBeInstanceOf(
      EmailAlreadyRegisteredError,
    );
  });
});
