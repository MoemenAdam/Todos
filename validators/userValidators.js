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

export const fcmTokenSchema = z.object({
  token: z.string({
    error: (issue) => {
      if (issue.input === undefined) {
        return 'Token is required';
      }

      if (issue.code === 'invalid_type') {
        return 'Token must be a string';
      }
    },
  }),
});

export const userSchema = z.object({
  name: z
    .string({
      error: (issue) => {
        if (issue.code === 'invalid_type') {
          return 'Name must be a string';
        }
      },
    })
    .trim()
    .min(2, 'Name must be at least 2 characters long')
    .max(50, 'Name must not exceed 50 characters'),
  lang: z.enum(['en', 'ar'], {
    errorMap: () => ({
      message: 'Language must be either "en" or "ar"',
    }),
  }),
  notificationSound: z.enum(['default'], {
    errorMap: () => ({
      message: 'Notification sound must be either default or default',
    }),
  }),
  allowNotification: z
    .boolean({
      error: (issue) => {
        if (issue.code === 'invalid_type') {
          return 'allowNotification must be a boolean';
        }
      },
    })
    .optional(),
  theme: z.enum(['dark', 'light'], {
    errorMap: () => ({
      message: 'Theme must be either "dark" or "light"',
    }),
  }),
});

export const updatePasswordSchema = z.object({
  password: passwordSchema,
  confirmPassword: passwordSchema,
});
