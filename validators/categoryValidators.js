import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const categorySchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(1, 'Name cannot be empty'),
});
