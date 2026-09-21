import { NextResponse } from "next/server";
import { getAuthenticateUser } from "../../application/AuthenticateUser/AuthenticateUser.factory";
import { authenticateUserValidator } from "../validators/authenticate-user.validator";
import { authRouteError } from "./auth-route-response";
import { setSessionCookie } from "./session-cookie";

export async function authenticateUserRoute(
  request: Request,
): Promise<Response> {
  try {
    const input = authenticateUserValidator.parse(await request.json());
    const { token, user } = await getAuthenticateUser().execute(input);
    const response = NextResponse.json({ user });

    setSessionCookie(response, token);
    return response;
  } catch (error) {
    return authRouteError(error);
  }
}
