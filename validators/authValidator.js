import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

const passwordSchema = z
  .string({
    error: (issue) => {
      if (issue.input === undefined) {
        return 'Password is required';
      }

      if (issue.code === 'invalid_type') {
        return 'Password must be a string';
      }
    },
  })
  .min(8, 'Password must be at least 8 characters long')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

const emailSchema = z
  .email({
    error: (issue) => {
      if (issue.input === undefined) {
        return 'Email is required';
      }

      if (issue.code === 'invalid_type') {
        return 'Email must be a string';
      }
    },
  })
  .trim()
  .toLowerCase();

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signUpSchema = z.object({
  name: z
    .string({
      error: (issue) => {
        if (issue.input === undefined) {
          return 'Name is required';
        }

        if (issue.code === 'invalid_type') {
          return 'Name must be a string';
        }
      },
    })
    .trim()
    .min(2, 'Name must be at least 2 characters long')
    .max(50, 'Name must not exceed 50 characters'),
  email: emailSchema,
  password: passwordSchema,
  lang: z.enum(['en', 'ar'], {
    errorMap: () => ({
      message: 'Language must be either "en" or "ar"',
    }),
  }),
  theme: z.enum(['dark', 'light'], {
    errorMap: () => ({
      message: 'Theme must be either "dark" or "light"',
    }),
  }),
});

export const confirmEmailSchema = z.object({
  email: emailSchema,
  otp: z
    .string({
      error: (issue) => {
        if (issue.input === undefined) {
          return 'OTP is required';
        }

        if (issue.code === 'invalid_type') {
          return 'OTP must be a string';
        }
      },
    })
    .regex(/^\d{6}$/, 'OTP must be exactly 6 digits'),
});

export const resendOtpSchema = z.object({
  email: emailSchema,
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z.object({
  email: emailSchema,
  otp: z
    .string({
      error: (issue) => {
        if (issue.input === undefined) {
          return 'OTP is required';
        }

        if (issue.code === 'invalid_type') {
          return 'OTP must be a string';
        }
      },
    })
    .regex(/^\d{6}$/, 'OTP must be exactly 6 digits'),
  password: passwordSchema,
  confirmPassword: passwordSchema,
});
