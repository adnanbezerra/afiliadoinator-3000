import { z } from "zod";

export const registerUserValidator = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().trim().toLowerCase().max(254),
  password: z
    .string()
    .min(8)
    .max(72)
    .regex(/[A-Za-z]/, "Password must contain a letter")
    .regex(/[0-9]/, "Password must contain a number"),
});

export type RegisterUserDto = z.infer<typeof registerUserValidator>;
