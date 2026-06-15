import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
} from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import {
  loginSchema,
  signUpSchema,
  confirmEmailSchema,
} from './validators/authValidator.js';
import { taskSchema } from './validators/taskValidators.js';
import { categorySchema } from './validators/categoryValidators.js';
import { fcmTokenSchema } from './validators/userValidators.js';

export const registry = new OpenAPIRegistry();

const TokenResponse = registry.register(
  'TokenResponse',
  z.object({
    status: z.string().openapi({ example: 'success' }),
    token: z
      .string()
      .openapi({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' }),
    message: z.string(),
  })
);

const SuccessResponse = registry.register(
  'SuccessResponse',
  z.object({
    status: z.string().openapi({ example: 'success' }),
    message: z.string(),
  })
);

const ErrorResponse = registry.register(
  'ErrorResponse',
  z.object({
    status: z.string().openapi({ example: 'error' }),
    message: z.string(),
    errors: z.record(z.string()).optional(),
  })
);

const UserSchema = registry.register(
  'User',
  z.object({
    _id: z.string().openapi({ example: '664f1b2c9e1a2b3c4d5e6f7a' }),
    name: z.string().openapi({ example: 'John Doe' }),
    email: z.string().email().openapi({ example: 'user@example.com' }),
    lang: z.enum(['en', 'ar']).openapi({ example: 'en' }),
    theme: z.enum(['dark', 'light']).openapi({ example: 'dark' }),
    fcmTokens: z
      .array(z.string())
      .optional()
      .openapi({ example: ['fcm-device-token-abc123'] }),
    allowNotification: z.boolean().optional().openapi({ example: true }),
    createdAt: z.string().openapi({ format: 'date-time' }),
    updatedAt: z.string().openapi({ format: 'date-time' }),
  })
);

registry.registerComponent('securitySchemes', 'bearerAuth', {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
});

registry.registerPath({
  method: 'post',
  path: '/auth/login',
  tags: ['Auth'],
  summary: 'Login with email and password',
  request: {
    body: {
      required: true,
      content: { 'application/json': { schema: loginSchema } },
    },
  },
  responses: {
    200: {
      description: 'Login successful',
      content: { 'application/json': { schema: TokenResponse } },
    },
    400: {
      description: 'Wrong credentials / Email not confirmed',
      content: { 'application/json': { schema: ErrorResponse } },
    },
  },
});

registry.registerPath({
  method: 'post',
  path: '/auth/signUp',
  tags: ['Auth'],
  summary: 'Register a new user',
  request: {
    body: {
      required: true,
      content: { 'application/json': { schema: signUpSchema } },
    },
  },
  responses: {
    201: {
      description: 'User created — OTP sent to email',
      content: { 'application/json': { schema: SuccessResponse } },
    },
    400: {
      description: 'Validation error',
      content: { 'application/json': { schema: ErrorResponse } },
    },
  },
});

registry.registerPath({
  method: 'post',
  path: '/auth/confirmEmail',
  tags: ['Auth'],
  summary: 'Confirm email using OTP',
  request: {
    body: {
      required: true,
      content: { 'application/json': { schema: confirmEmailSchema } },
    },
  },
  responses: {
    200: {
      description: 'Email confirmed successfully',
      content: { 'application/json': { schema: SuccessResponse } },
    },
    400: {
      description: 'Wrong OTP / Expired OTP',
      content: { 'application/json': { schema: ErrorResponse } },
    },
  },
});

registry.registerPath({
  method: 'post',
  path: '/auth/logOut',
  tags: ['Auth'],
  summary: 'Logout current user',
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: 'Logged out successfully',
      content: { 'application/json': { schema: SuccessResponse } },
    },
    401: {
      description: 'Unauthorized',
      content: { 'application/json': { schema: ErrorResponse } },
    },
  },
});

const MyProgressResponse = registry.register(
  'MyProgress',
  z.object({
    total: z.number().openapi({ example: 10 }),
    completedPosts: z.number().openapi({ example: 4 }),
    progress: z.string().openapi({ example: '40%' }),
  })
);

registry.registerPath({
  method: 'get',
  path: '/users/me',
  tags: ['Users'],
  summary: 'Get current logged-in user',
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: 'Current user data',
      content: {
        'application/json': {
          schema: z.object({
            status: z.string().openapi({ example: 'success' }),
            data: UserSchema,
            message: z.string().openapi({ example: 'User found' }),
          }),
        },
      },
    },
    401: {
      description: 'Unauthorized',
      content: { 'application/json': { schema: ErrorResponse } },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/users/myProgress',
  tags: ['Users'],
  summary: 'Get task completion progress for the logged-in user',
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: 'Task completion progress',
      content: {
        'application/json': {
          schema: z.object({
            status: z.string().openapi({ example: 'success' }),
            data: MyProgressResponse,
          }),
        },
      },
    },
    401: {
      description: 'Unauthorized',
      content: { 'application/json': { schema: ErrorResponse } },
    },
  },
});

registry.registerPath({
  method: 'post',
  path: '/users/assignPushNotifcationToken',
  tags: ['Users'],
  summary: 'Register an FCM push notification token for the current user',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      required: true,
      content: { 'application/json': { schema: fcmTokenSchema } },
    },
  },
  responses: {
    202: {
      description: 'FCM token assigned successfully',
      content: { 'application/json': { schema: SuccessResponse } },
    },
    400: {
      description: 'Validation error',
      content: { 'application/json': { schema: ErrorResponse } },
    },
    401: {
      description: 'Unauthorized',
      content: { 'application/json': { schema: ErrorResponse } },
    },
  },
});

const TaskSchema = registry.register(
  'Task',
  z.object({
    _id: z.string().openapi({ example: '664f1b2c9e1a2b3c4d5e6f7a' }),
    title: z.string().openapi({ example: 'Buy groceries' }),
    description: z
      .string()
      .optional()
      .openapi({ example: 'Milk, eggs, bread' }),
    category: z
      .string()
      .openapi({ example: '664f1b2c9e1a2b3c4d5e6f7b' }),
    user: z
      .string()
      .optional()
      .openapi({ example: '664f1b2c9e1a2b3c4d5e6f7c' }),
    priority: z.enum(['low', 'med', 'high']).optional().openapi({ example: 'med' }),
    dueDate: z
      .string()
      .openapi({ format: 'date-time', example: '2026-06-15T00:00:00.000Z' }),
    isCompleted: z.boolean().openapi({ example: false }),
    createdAt: z.string().openapi({ format: 'date-time' }),
    updatedAt: z.string().openapi({ format: 'date-time' }),
  })
);

const TaskListResponse = z.object({
  status: z.string().openapi({ example: 'success' }),
  total: z.number().openapi({ example: 25 }),
  data: z.array(TaskSchema),
});

const TaskResponse = z.object({
  status: z.string().openapi({ example: 'success' }),
  data: TaskSchema,
  message: z.string().optional(),
});

const taskIdParam = z.object({
  id: z.string().openapi({ example: '664f1b2c9e1a2b3c4d5e6f7a' }),
});

const paginationQuery = z.object({
  page: z.string().optional().openapi({ example: '1' }),
  limit: z.string().optional().openapi({ example: '10' }),
});

registry.registerPath({
  method: 'get',
  path: '/tasks',
  tags: ['Tasks'],
  summary: 'Get all tasks for the logged-in user',
  security: [{ bearerAuth: [] }],
  request: { query: paginationQuery },
  responses: {
    200: {
      description: 'Paginated task list',
      content: { 'application/json': { schema: TaskListResponse } },
    },
    401: {
      description: 'Unauthorized',
      content: { 'application/json': { schema: ErrorResponse } },
    },
  },
});

registry.registerPath({
  method: 'post',
  path: '/tasks',
  tags: ['Tasks'],
  summary: 'Create a new task',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      required: true,
      content: { 'application/json': { schema: taskSchema } },
    },
  },
  responses: {
    201: {
      description: 'Task created',
      content: {
        'application/json': {
          schema: TaskResponse.extend({
            message: z
              .string()
              .openapi({ example: 'Document created successfully' }),
          }),
        },
      },
    },
    400: {
      description: 'Validation error',
      content: { 'application/json': { schema: ErrorResponse } },
    },
    401: {
      description: 'Unauthorized',
      content: { 'application/json': { schema: ErrorResponse } },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/tasks/{id}',
  tags: ['Tasks'],
  summary: 'Get a single task by ID',
  security: [{ bearerAuth: [] }],
  request: { params: taskIdParam },
  responses: {
    200: {
      description: 'Task found',
      content: { 'application/json': { schema: TaskResponse } },
    },
    401: {
      description: 'Unauthorized',
      content: { 'application/json': { schema: ErrorResponse } },
    },
    404: {
      description: 'Task not found or does not belong to the current user',
      content: { 'application/json': { schema: ErrorResponse } },
    },
  },
});

registry.registerPath({
  method: 'patch',
  path: '/tasks/{id}',
  tags: ['Tasks'],
  summary: 'Update a task by ID',
  security: [{ bearerAuth: [] }],
  request: {
    params: taskIdParam,
    body: {
      required: true,
      content: { 'application/json': { schema: taskSchema } },
    },
  },
  responses: {
    200: {
      description: 'Task updated',
      content: {
        'application/json': {
          schema: TaskResponse.extend({
            message: z
              .string()
              .openapi({ example: 'Document updated successfully' }),
          }),
        },
      },
    },
    400: {
      description: 'Validation error',
      content: { 'application/json': { schema: ErrorResponse } },
    },
    401: {
      description: 'Unauthorized',
      content: { 'application/json': { schema: ErrorResponse } },
    },
    404: {
      description: 'Task not found or does not belong to the current user',
      content: { 'application/json': { schema: ErrorResponse } },
    },
  },
});

registry.registerPath({
  method: 'delete',
  path: '/tasks/{id}',
  tags: ['Tasks'],
  summary: 'Delete a task by ID',
  security: [{ bearerAuth: [] }],
  request: { params: taskIdParam },
  responses: {
    204: {
      description: 'Task deleted',
      content: { 'application/json': { schema: TaskResponse } },
    },
    401: {
      description: 'Unauthorized',
      content: { 'application/json': { schema: ErrorResponse } },
    },
    404: {
      description: 'Task not found or does not belong to the current user',
      content: { 'application/json': { schema: ErrorResponse } },
    },
  },
});

const calendarQuery = z.object({
  type: z
    .enum(['overdue', 'dueToday', 'done'])
    .openapi({ example: 'overdue', description: 'Filter tasks by calendar view' }),
  page: z.string().optional().openapi({ example: '1' }),
  limit: z.string().optional().openapi({ example: '10' }),
});

registry.registerPath({
  method: 'get',
  path: '/tasks/calendar',
  tags: ['Tasks'],
  summary: 'Get tasks filtered by calendar type',
  description:
    'Returns paginated tasks for the logged-in user. `type` must be one of: overdue, dueToday, or done.',
  security: [{ bearerAuth: [] }],
  request: { query: calendarQuery },
  responses: {
    200: {
      description: 'Filtered task list',
      content: { 'application/json': { schema: TaskListResponse } },
    },
    400: {
      description: 'Missing or invalid type query parameter',
      content: { 'application/json': { schema: ErrorResponse } },
    },
    401: {
      description: 'Unauthorized',
      content: { 'application/json': { schema: ErrorResponse } },
    },
  },
});

const CategorySchema = registry.register(
  'Category',
  z.object({
    _id: z.string().openapi({ example: '664f1b2c9e1a2b3c4d5e6f7d' }),
    name: z.string().openapi({ example: 'Work' }),
    user: z
      .string()
      .optional()
      .openapi({ example: '664f1b2c9e1a2b3c4d5e6f7c' }),
    createdAt: z.string().openapi({ format: 'date-time' }),
    updatedAt: z.string().openapi({ format: 'date-time' }),
  })
);

const CategoryListResponse = z.object({
  status: z.string().openapi({ example: 'success' }),
  total: z.number().openapi({ example: 5 }),
  data: z.array(CategorySchema),
});

const CategoryResponse = z.object({
  status: z.string().openapi({ example: 'success' }),
  data: CategorySchema,
  message: z.string().optional(),
});

const categoryIdParam = z.object({
  id: z.string().openapi({ example: '664f1b2c9e1a2b3c4d5e6f7d' }),
});

registry.registerPath({
  method: 'get',
  path: '/categories',
  tags: ['Categories'],
  summary: 'Get all categories',
  security: [{ bearerAuth: [] }],
  request: { query: paginationQuery },
  responses: {
    200: {
      description: 'Paginated category list',
      content: { 'application/json': { schema: CategoryListResponse } },
    },
    401: {
      description: 'Unauthorized',
      content: { 'application/json': { schema: ErrorResponse } },
    },
  },
});

registry.registerPath({
  method: 'post',
  path: '/categories',
  tags: ['Categories'],
  summary: 'Create a new category for the logged-in user',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      required: true,
      content: { 'application/json': { schema: categorySchema } },
    },
  },
  responses: {
    201: {
      description: 'Category created',
      content: {
        'application/json': {
          schema: CategoryResponse.extend({
            message: z
              .string()
              .openapi({ example: 'Document created successfully' }),
          }),
        },
      },
    },
    400: {
      description: 'Validation error',
      content: { 'application/json': { schema: ErrorResponse } },
    },
    401: {
      description: 'Unauthorized',
      content: { 'application/json': { schema: ErrorResponse } },
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/categories/{id}',
  tags: ['Categories'],
  summary: 'Get a single category by ID',
  security: [{ bearerAuth: [] }],
  request: { params: categoryIdParam },
  responses: {
    200: {
      description: 'Category found',
      content: { 'application/json': { schema: CategoryResponse } },
    },
    401: {
      description: 'Unauthorized',
      content: { 'application/json': { schema: ErrorResponse } },
    },
    404: {
      description: 'Category not found or does not belong to the current user',
      content: { 'application/json': { schema: ErrorResponse } },
    },
  },
});

registry.registerPath({
  method: 'patch',
  path: '/categories/{id}',
  tags: ['Categories'],
  summary: 'Update a category by ID',
  security: [{ bearerAuth: [] }],
  request: {
    params: categoryIdParam,
    body: {
      required: true,
      content: { 'application/json': { schema: categorySchema } },
    },
  },
  responses: {
    200: {
      description: 'Category updated',
      content: {
        'application/json': {
          schema: CategoryResponse.extend({
            message: z
              .string()
              .openapi({ example: 'Document updated successfully' }),
          }),
        },
      },
    },
    400: {
      description: 'Validation error',
      content: { 'application/json': { schema: ErrorResponse } },
    },
    401: {
      description: 'Unauthorized',
      content: { 'application/json': { schema: ErrorResponse } },
    },
    404: {
      description: 'Category not found or does not belong to the current user',
      content: { 'application/json': { schema: ErrorResponse } },
    },
  },
});

registry.registerPath({
  method: 'delete',
  path: '/categories/{id}',
  tags: ['Categories'],
  summary: 'Delete a category by ID',
  security: [{ bearerAuth: [] }],
  request: { params: categoryIdParam },
  responses: {
    204: {
      description: 'Category deleted',
      content: { 'application/json': { schema: CategoryResponse } },
    },
    401: {
      description: 'Unauthorized',
      content: { 'application/json': { schema: ErrorResponse } },
    },
    404: {
      description: 'Category not found or does not belong to the current user',
      content: { 'application/json': { schema: ErrorResponse } },
    },
  },
});

const generator = new OpenApiGeneratorV3(registry.definitions);

export const swaggerSpec = generator.generateDocument({
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
  },
  servers: [{ url: '/api/v1' }],
});
