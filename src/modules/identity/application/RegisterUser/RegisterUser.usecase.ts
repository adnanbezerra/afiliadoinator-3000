import type { RegisterUserDto } from "../../infra/validators/register-user.validator";
import { EmailAlreadyRegisteredError } from "../shared/AuthError";
import type { PasswordHasher } from "../shared/PasswordHasher";
import type { TokenService } from "../shared/TokenService";
import {
  toPublicUser,
  type PublicUser,
  type UserRepository,
} from "../shared/UserRepository";

export interface RegistrationResult {
  token: string;
  user: PublicUser;
}

export class RegisterUser {
  constructor(
    private readonly users: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly tokens: TokenService,
  ) {}

  async execute(input: RegisterUserDto): Promise<RegistrationResult> {
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

    return {
      token: await this.tokens.sign({ userId: user.id }),
      user: toPublicUser(user),
    };
  }
}
