import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().trim().email("Please provide a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  fullName: z.string().trim().min(1, "Full name is required").optional(),
  name: z.string().trim().min(1).optional(),
}).transform((data) => ({
  email: data.email.toLowerCase(),
  password: data.password,
  fullName: data.fullName || data.name || null,
}));

export const signInSchema = z.object({
  email: z.string().trim().email("Please provide a valid email address"),
  password: z.string().min(1, "Password is required"),
}).transform((data) => ({
  email: data.email.toLowerCase(),
  password: data.password,
}));

export const requestPasswordResetSchema = z.object({
  email: z.string().trim().email("Please provide a valid email address").transform((val) => val.toLowerCase()),
});

export const updatePasswordSchema = z.object({
  newPassword: z.string().min(6, "New password must be at least 6 characters long").optional(),
  password: z.string().min(6, "Password must be at least 6 characters long").optional(),
}).refine((data) => data.newPassword || data.password, {
  message: "New password is required",
  path: ["newPassword"],
}).transform((data) => ({
  newPassword: (data.newPassword || data.password) as string,
}));

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type RequestPasswordResetInput = z.infer<typeof requestPasswordResetSchema>;
export type UpdatePasswordInput = z.infer<typeof updatePasswordSchema>;
