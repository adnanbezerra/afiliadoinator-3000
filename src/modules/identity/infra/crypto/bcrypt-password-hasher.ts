import { compare, hash } from "bcryptjs";
import type { PasswordHasher } from "../../application/shared/PasswordHasher";

const BCRYPT_COST = 12;

export class BcryptPasswordHasher implements PasswordHasher {
  hash(password: string): Promise<string> {
    return hash(password, BCRYPT_COST);
  }

  compare(password: string, passwordHash: string): Promise<boolean> {
    return compare(password, passwordHash);
  }
}
