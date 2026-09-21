import { NextResponse } from "next/server";
import { ZodError } from "zod";
import {
  EmailAlreadyRegisteredError,
  InvalidCredentialsError,
  InvalidSessionError,
} from "../../application/shared/AuthError";

export function authRouteError(error: unknown): NextResponse {
  if (error instanceof ZodError) {
    return NextResponse.json(
      {
        error: "Invalid request data",
        fields: error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  if (error instanceof SyntaxError) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (error instanceof EmailAlreadyRegisteredError) {
    return NextResponse.json({ error: error.message }, { status: 409 });
  }

  if (
    error instanceof InvalidCredentialsError ||
    error instanceof InvalidSessionError
  ) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }

  console.error(error);
  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
}
