import { z } from 'zod';
import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';

extendZodWithOpenApi(z);

export const taskSchema = z.object({
  title: z
    .string({
      required_error: 'Title is required',
      invalid_type_error: 'Title must be a string',
    })
    .trim()
    .min(1, 'Title is required'),

  description: z
    .string({
      invalid_type_error: 'Description must be a string',
    })
    .trim()
    .optional(),

  category: z.string({
    required_error: 'Category is required',
    invalid_type_error: 'Category must be a valid id',
  }),

  priority: z
    .enum(['low', 'med', 'high'], {
      errorMap: () => ({
        message: 'Priority must be one of: low, med, high',
      }),
    })
    .optional(),

  dueDate: z.coerce
    .date({
      errorMap: () => ({
        message: 'Due date must be a valid date',
      }),
    })
    .optional(),

  isCompleted: z
    .boolean({
      invalid_type_error: 'isCompleted must be a boolean value',
    })
    .optional(),
});
