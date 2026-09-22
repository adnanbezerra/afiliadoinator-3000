import { z } from "zod";

export const authenticateUserValidator = z.object({
  email: z.email().trim().toLowerCase().max(254),
  password: z.string().min(1).max(72),
});

export type AuthenticateUserDto = z.infer<
  typeof authenticateUserValidator
>;
