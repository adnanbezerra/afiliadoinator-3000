import { InvalidSessionError } from "../shared/AuthError";
import type { TokenService } from "../shared/TokenService";
import {
  toPublicUser,
  type PublicUser,
  type UserRepository,
} from "../shared/UserRepository";

export class GetAuthenticatedUser {
  constructor(
    private readonly users: UserRepository,
    private readonly tokens: TokenService,
  ) {}

  async execute(token: string): Promise<PublicUser> {
    let userId: string;

    try {
      ({ userId } = await this.tokens.verify(token));
    } catch {
      throw new InvalidSessionError();
    }

    const user = await this.users.findById(userId);

    if (!user) {
      throw new InvalidSessionError();
    }

    return toPublicUser(user);
  }
}
