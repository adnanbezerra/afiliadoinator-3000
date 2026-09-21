import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { InvalidSessionError } from "@/src/modules/identity/application/shared/AuthError";
import { getAuthenticatedUserByToken } from "@/src/modules/identity/infra/routes/require-authenticated-user";
import { SESSION_COOKIE } from "@/src/modules/identity/infra/routes/session-cookie";

interface AuthLayoutProps {
  children: ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  let isAuthenticated = false;

  if (token) {
    try {
      await getAuthenticatedUserByToken(token);
      isAuthenticated = true;
    } catch (error) {
      if (!(error instanceof InvalidSessionError)) throw error;
    }
  }

  if (isAuthenticated) redirect("/");

  return children;
}
