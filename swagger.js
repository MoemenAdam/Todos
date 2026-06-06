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
      description: 'Email confirmed — token returned',
      content: { 'application/json': { schema: TokenResponse } },
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

registry.registerPath({
  method: 'get',
  path: '/auth/me',
  tags: ['Auth'],
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

const generator = new OpenApiGeneratorV3(registry.definitions);

export const swaggerSpec = generator.generateDocument({
  openapi: '3.0.0',
  info: {
    title: 'API Documentation',
    version: '1.0.0',
  },
  servers: [{ url: '/api/v1' }],
});
