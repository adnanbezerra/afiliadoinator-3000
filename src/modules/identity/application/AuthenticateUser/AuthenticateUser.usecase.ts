import type { AuthenticateUserDto } from "../../infra/validators/authenticate-user.validator";
import { InvalidCredentialsError } from "../shared/AuthError";
import type { PasswordHasher } from "../shared/PasswordHasher";
import type { TokenService } from "../shared/TokenService";
import {
  toPublicUser,
  type PublicUser,
  type UserRepository,
} from "../shared/UserRepository";

export interface AuthenticationResult {
  token: string;
  user: PublicUser;
}

export class AuthenticateUser {
  constructor(
    private readonly users: UserRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly tokens: TokenService,
  ) {}

  async execute(input: AuthenticateUserDto): Promise<AuthenticationResult> {
    const user = await this.users.findByEmail(input.email);

    if (!user) {
      throw new InvalidCredentialsError();
    }

    const passwordMatches = await this.passwordHasher.compare(
      input.password,
      user.passwordHash,
    );

    if (!passwordMatches) {
      throw new InvalidCredentialsError();
    }

    return {
      token: await this.tokens.sign({ userId: user.id }),
      user: toPublicUser(user),
    };
  }
}
