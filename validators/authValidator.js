import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

const passwordSchema = z
  .string({ required_error: 'Password is required' })
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Must contain uppercase letter')
  .regex(/[0-9]/, 'Must contain number');

export const loginSchema = z
  .object({
    email: z.email('Invalid email address'),
    password: passwordSchema,
  })
  .strip();

export const signUpSchema = z
  .object({
    name: z
      .string({ required_error: 'Name is required' })
      .trim()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must not exceed 50 characters'),
    email: z.email('Invalid email address').trim().toLowerCase(),
    password: passwordSchema,
    lang: z.enum(['en', 'ar']).default('en'),
    theme: z.enum(['dark', 'light']).default('dark'),
  })
  .strip();

export const confirmEmailSchema = z
  .object({
    email: z.email('Invalid email address'),
    otp: z
      .string({ required_error: 'OTP is required' })
      .regex(/^\d{6}$/, 'OTP must be exactly 6 digits'),
  })
  .strip();
