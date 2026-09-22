import { NextResponse } from "next/server";
import { getRegisterUser } from "../../application/RegisterUser/RegisterUser.factory";
import { registerUserValidator } from "../validators/register-user.validator";
import { authRouteError } from "./auth-route-response";
import { setSessionCookie } from "./session-cookie";

export async function registerUserRoute(request: Request): Promise<Response> {
  try {
    const input = registerUserValidator.parse(await request.json());
    const { token, user } = await getRegisterUser().execute(input);
    const response = NextResponse.json({ user }, { status: 201 });

    setSessionCookie(response, token);
    return response;
  } catch (error) {
    return authRouteError(error);
  }
}
