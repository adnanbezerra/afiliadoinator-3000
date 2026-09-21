import type { NextRequest, NextResponse } from "next/server";

export const SESSION_COOKIE = "auth_token";
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export function setSessionCookie(response: NextResponse, token: string): void {
  response.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    maxAge: SESSION_MAX_AGE_SECONDS,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export function clearSessionCookie(response: NextResponse): void {
  response.cookies.delete(SESSION_COOKIE);
}

export function getSessionToken(request: NextRequest): string | null {
  const authorization = request.headers.get("authorization");

  if (authorization?.startsWith("Bearer ")) {
    return authorization.slice("Bearer ".length);
  }

  return request.cookies.get(SESSION_COOKIE)?.value ?? null;
}
