import { z } from "zod";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_PATTERNS,
} from "../../application/shared/password-policy";

export const registerUserValidator = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().trim().toLowerCase().max(254),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH)
    .max(72)
    .regex(PASSWORD_PATTERNS.uppercase, "Password must contain an uppercase letter")
    .regex(PASSWORD_PATTERNS.lowercase, "Password must contain a lowercase letter")
    .regex(PASSWORD_PATTERNS.number, "Password must contain a number")
    .regex(
      PASSWORD_PATTERNS.specialCharacter,
      "Password must contain a special character",
    ),
});

export type RegisterUserDto = z.infer<typeof registerUserValidator>;
