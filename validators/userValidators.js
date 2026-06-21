import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const fcmTokenSchema = z.object({
  token: z.string({
    required_error: 'Token is required',
    invalid_type_error: 'Token must be a string',
  }),
});

export const userSchema = z.object({
  name: z
    .string({
      invalid_type_error: 'Name must be a string',
    })
    .trim()
    .min(2, 'Name must be at least 2 characters long')
    .max(50, 'Name must not exceed 50 characters'),
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
