import type { NextRequest } from "next/server";
import { getAuthenticatedUserUseCase } from "../../application/GetAuthenticatedUser/GetAuthenticatedUser.factory";
import { InvalidSessionError } from "../../application/shared/AuthError";
import { authRouteError } from "./auth-route-response";
import { getSessionToken } from "./session-cookie";

export async function getAuthenticatedUserRoute(
  request: NextRequest,
): Promise<Response> {
  try {
    const token = getSessionToken(request);

    if (!token) {
      throw new InvalidSessionError();
    }

    const user = await getAuthenticatedUserUseCase().execute(token);
    return Response.json({ user });
  } catch (error) {
    return authRouteError(error);
  }
}
