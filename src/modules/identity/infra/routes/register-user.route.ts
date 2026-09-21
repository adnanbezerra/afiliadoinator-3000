import { getRegisterUser } from "../../application/RegisterUser/RegisterUser.factory";
import { registerUserValidator } from "../validators/register-user.validator";
import { authRouteError } from "./auth-route-response";

export async function registerUserRoute(request: Request): Promise<Response> {
  try {
    const input = registerUserValidator.parse(await request.json());
    const user = await getRegisterUser().execute(input);

    return Response.json({ user }, { status: 201 });
  } catch (error) {
    return authRouteError(error);
  }
}
