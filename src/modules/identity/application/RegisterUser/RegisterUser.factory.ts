import { getIdentityDependencies } from "../../infra/factories/identity-dependencies.factory";
import { RegisterUser } from "./RegisterUser.usecase";

let registerUser: RegisterUser | undefined;

export function getRegisterUser(): RegisterUser {
  if (!registerUser) {
    const { passwordHasher, users } = getIdentityDependencies();
    registerUser = new RegisterUser(users, passwordHasher);
  }

  return registerUser;
}
