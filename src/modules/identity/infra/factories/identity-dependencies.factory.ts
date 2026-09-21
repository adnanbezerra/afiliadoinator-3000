import { getPrismaClient } from "@/src/shared/infra/database/prisma";
import type { PasswordHasher } from "../../application/shared/PasswordHasher";
import type { TokenService } from "../../application/shared/TokenService";
import type { UserRepository } from "../../application/shared/UserRepository";
import { BcryptPasswordHasher } from "../crypto/bcrypt-password-hasher";
import { JwtTokenService } from "../crypto/jwt-token.service";
import { PrismaUserRepository } from "../prisma/repositories/prisma-user.repository";

interface IdentityDependencies {
  users: UserRepository;
  passwordHasher: PasswordHasher;
  tokens: TokenService;
}

let dependencies: IdentityDependencies | undefined;

export function getIdentityDependencies(): IdentityDependencies {
  if (!dependencies) {
    dependencies = {
      users: new PrismaUserRepository(getPrismaClient()),
      passwordHasher: new BcryptPasswordHasher(),
      tokens: new JwtTokenService(),
    };
  }

  return dependencies;
}
