import type { RegisterUserDto } from "../../infra/validators/register-user.validator";
import { EmailAlreadyRegisteredError } from "../shared/AuthError";
import type { PasswordHasher } from "../shared/PasswordHasher";
import {
  toPublicUser,
  type PublicUser,
  type UserRepository,
} from "../shared/UserRepository";

export class RegisterUser {
  constructor(
    private readonly users: UserRepository,
    private readonly passwordHasher: PasswordHasher,
  ) {}

  async execute(input: RegisterUserDto): Promise<PublicUser> {
    const existingUser = await this.users.findByEmail(input.email);

    if (existingUser) {
      throw new EmailAlreadyRegisteredError();
    }

    const passwordHash = await this.passwordHasher.hash(input.password);
    const user = await this.users.create({
      name: input.name,
      email: input.email,
      passwordHash,
    });

    return toPublicUser(user);
  }
}
