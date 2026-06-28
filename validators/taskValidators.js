import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const taskSchema = z.object({
  title: z
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
    .min(1, 'Cannot be empty'),

  description: z
    .string({
      error: (issue) => {
        if (issue.code === 'invalid_type') {
          return 'Must be a string';
        }
      },
    })
    .trim()
    .optional(),

  category: z.string({
    error: (issue) => {
      if (issue.input === undefined) {
        return 'Required';
      }

      if (issue.code === 'invalid_type') {
        return 'Must be a valid id';
      }
    },
  }),

  priority: z
    .enum(['low', 'med', 'high'], {
      errorMap: () => ({
        message: 'Must be one of: low, med, high',
      }),
    })
    .optional(),

  dueDate: z.coerce.date({
    error: (issue) => {
      if (issue.input === undefined) {
        return 'Required';
      }

      if (issue.code === 'invalid_type') {
        return 'Must be a valid date';
      }
    },
    errorMap: () => ({
      message: 'Must be a valid date',
    }),
  }),

  isCompleted: z
    .boolean({
      error: (issue) => {
        if (issue.code === 'invalid_type') {
          return 'Must be a boolean';
        }
      },
    })
    .optional(),
});
