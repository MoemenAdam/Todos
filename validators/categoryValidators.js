import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const categorySchema = z.object({
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
    .min(1, 'Cannot be empty'),
  color: z
    .string({
      error: (issue) => {
        if (issue.code === 'invalid_type') {
          return 'Must be a string';
        }
      },
    })
    .optional(),
});
