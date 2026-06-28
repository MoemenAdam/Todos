import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const taskSchema = z.object({
  title: z
    .string({
      error: (issue) => {
        if (issue.input === undefined) {
          return 'Title is required';
        }

        if (issue.code === 'invalid_type') {
          return 'Title must be a string';
        }
      },
    })
    .trim()
    .min(1, 'Title is required'),

  description: z
    .string({
      error: (issue) => {
        if (issue.code === 'invalid_type') {
          return 'Description must be a string';
        }
      },
    })
    .trim()
    .optional(),

  category: z.string({
    error: (issue) => {
      if (issue.input === undefined) {
        return 'Category is required';
      }

      if (issue.code === 'invalid_type') {
        return 'Category must be a valid id';
      }
    },
  }),

  priority: z
    .enum(['low', 'med', 'high'], {
      errorMap: () => ({
        message: 'Priority must be one of: low, med, high',
      }),
    })
    .optional(),

  dueDate: z.coerce.date({
    error: (issue) => {
      if (issue.input === undefined) {
        return 'dueDate is required';
      }

      if (issue.code === 'invalid_type') {
        return 'dueDate must be a valid date';
      }
    },
    errorMap: () => ({
      message: 'Due date must be a valid date',
    }),
  }),

  isCompleted: z
    .boolean({
      error: (issue) => {
        if (issue.code === 'invalid_type') {
          return 'isCompleted must be a boolean value';
        }
      },
    })
    .optional(),
});
