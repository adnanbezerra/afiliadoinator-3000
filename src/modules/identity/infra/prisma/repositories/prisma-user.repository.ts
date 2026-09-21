import type { PrismaClient } from "@/src/generated/prisma/client";
import { EmailAlreadyRegisteredError } from "../../../application/shared/AuthError";
import type {
  CreateUserData,
  UserRecord,
  UserRepository,
} from "../../../application/shared/UserRepository";

export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  findByEmail(email: string): Promise<UserRecord | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findById(id: string): Promise<UserRecord | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async create(data: CreateUserData): Promise<UserRecord> {
    try {
      return await this.prisma.user.create({ data });
    } catch (error) {
      if (
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === "P2002"
      ) {
        throw new EmailAlreadyRegisteredError();
      }

      throw error;
    }
  }
}
