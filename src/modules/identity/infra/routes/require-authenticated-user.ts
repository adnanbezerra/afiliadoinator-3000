import type { NextRequest } from "next/server";
import { getAuthenticatedUserUseCase } from "../../application/GetAuthenticatedUser/GetAuthenticatedUser.factory";
import { InvalidSessionError } from "../../application/shared/AuthError";
import type { PublicUser } from "../../application/shared/UserRepository";
import { getSessionToken } from "./session-cookie";

export async function getAuthenticatedUserByToken(
  token: string | undefined,
): Promise<PublicUser> {
  if (!token) {
    throw new InvalidSessionError();
  }

  return getAuthenticatedUserUseCase().execute(token);
}

export function requireAuthenticatedUser(
  request: NextRequest,
): Promise<PublicUser> {
  return getAuthenticatedUserByToken(getSessionToken(request) ?? undefined);
}
