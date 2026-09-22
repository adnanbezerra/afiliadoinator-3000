import type { NextRequest } from "next/server";
import { authRouteError } from "./auth-route-response";
import { requireAuthenticatedUser } from "./require-authenticated-user";

export async function getAuthenticatedUserRoute(
  request: NextRequest,
): Promise<Response> {
  try {
    const user = await requireAuthenticatedUser(request);
    return Response.json({ user });
  } catch (error) {
    return authRouteError(error);
  }
}
