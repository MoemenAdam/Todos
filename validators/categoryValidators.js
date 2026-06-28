import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const categorySchema = z.object({
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
    .min(1, 'Name cannot be empty'),
  color: z
    .string({
      error: (issue) => {
        if (issue.code === 'invalid_type') {
          return 'Color must be a string';
        }
      },
    })
    .optional(),
});
