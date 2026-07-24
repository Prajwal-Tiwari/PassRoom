import {z} from "zod";

export const signupSchema = z.object({
    name: z.string().trim().min(2, "Name must be at least 2 characters..."),
    email: z.string().trim().email("Invalid email Address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const credentialSchema = z.object({
  website: z.string().trim().min(1, "Website is required"),
  username: z.string().trim().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});