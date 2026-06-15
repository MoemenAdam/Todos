import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const fcmTokenSchema = z.object({
  token: z.string({
    required_error: 'Token is required',
    invalid_type_error: 'Token must be a string',
  }),
});
