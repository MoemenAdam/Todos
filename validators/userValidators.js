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

export const fcmTokenSchema = z.object({
  token: z.string({
    error: (issue) => {
      if (issue.input === undefined) {
        return 'Required';
      }

      if (issue.code === 'invalid_type') {
        return 'Must be a string';
      }
    },
  }),
});

export const userSchema = z.object({
  name: z
    .string({
      error: (issue) => {
        if (issue.code === 'invalid_type') {
          return 'Must be a string';
        }
      },
    })
    .trim()
    .min(2, 'Must be at least 2 characters long')
    .max(50, 'Must not exceed 50 characters'),
  lang: z.enum(['en', 'ar'], {
    errorMap: () => ({
      message: 'Must be either "en" or "ar"',
    }),
  }),
  notificationSound: z.enum(['default'], {
    errorMap: () => ({
      message: 'Must be "default"',
    }),
  }),
  allowNotification: z
    .boolean({
      error: (issue) => {
        if (issue.code === 'invalid_type') {
          return 'Must be a boolean';
        }
      },
    })
    .optional(),
  theme: z.enum(['dark', 'light'], {
    errorMap: () => ({
      message: 'Must be either "dark" or "light"',
    }),
  }),
});

export const updatePasswordSchema = z.object({
  password: passwordSchema,
  confirmPassword: passwordSchema,
  oldPassword: passwordSchema,
});
