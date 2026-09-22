import { getIdentityDependencies } from "../../infra/factories/identity-dependencies.factory";
import { GetAuthenticatedUser } from "./GetAuthenticatedUser.usecase";

let getAuthenticatedUser: GetAuthenticatedUser | undefined;

export function getAuthenticatedUserUseCase(): GetAuthenticatedUser {
  if (!getAuthenticatedUser) {
    const { tokens, users } = getIdentityDependencies();
    getAuthenticatedUser = new GetAuthenticatedUser(users, tokens);
  }

  return getAuthenticatedUser;
}
