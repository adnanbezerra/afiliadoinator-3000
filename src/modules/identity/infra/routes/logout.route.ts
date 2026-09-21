import { NextResponse } from "next/server";
import { clearSessionCookie } from "./session-cookie";

export async function logoutRoute(): Promise<Response> {
  const response = NextResponse.json({ success: true });
  clearSessionCookie(response);
  return response;
}
