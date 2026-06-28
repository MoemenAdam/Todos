import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

const passwordSchema = z
  .string({
    error: (issue) => {
      if (issue.input === undefined) {
        return 'Required';
      }

      if (issue.code === 'invalid_type') {
        return 'Must be a string';
      }
    },
  })
  .min(8, 'Must be at least 8 characters long')
  .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Must contain at least one number');

const emailSchema = z
  .email({
    error: (issue) => {
      if (issue.input === undefined) {
        return 'Required';
      }

      if (issue.code === 'invalid_type') {
        return 'Must be a string';
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
          return 'Required';
        }

        if (issue.code === 'invalid_type') {
          return 'Must be a string';
        }
      },
    })
    .trim()
    .min(2, 'Must be at least 2 characters long')
    .max(50, 'Must not exceed 50 characters'),
  email: emailSchema,
  password: passwordSchema,
  lang: z.enum(['en', 'ar'], {
    errorMap: () => ({
      message: 'Must be either "en" or "ar"',
    }),
  }),
  theme: z.enum(['dark', 'light'], {
    errorMap: () => ({
      message: 'Must be either "dark" or "light"',
    }),
  }),
});

export const confirmEmailSchema = z.object({
  email: emailSchema,
  otp: z
    .string({
      error: (issue) => {
        if (issue.input === undefined) {
          return 'Required';
        }

        if (issue.code === 'invalid_type') {
          return 'Must be a string';
        }
      },
    })
    .regex(/^\d{6}$/, 'Must be exactly 6 digits'),
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
          return 'Required';
        }

        if (issue.code === 'invalid_type') {
          return 'Must be a string';
        }
      },
    })
    .regex(/^\d{6}$/, 'Must be exactly 6 digits'),
  password: passwordSchema,
  confirmPassword: passwordSchema,
});
