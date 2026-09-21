import { getIdentityDependencies } from "../../infra/factories/identity-dependencies.factory";
import { AuthenticateUser } from "./AuthenticateUser.usecase";

let authenticateUser: AuthenticateUser | undefined;

export function getAuthenticateUser(): AuthenticateUser {
  if (!authenticateUser) {
    const { passwordHasher, tokens, users } = getIdentityDependencies();
    authenticateUser = new AuthenticateUser(users, passwordHasher, tokens);
  }

  return authenticateUser;
}
