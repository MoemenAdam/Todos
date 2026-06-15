import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import globalErrorHandler from './controller/errorController.js';
import AppError from './utils/AppError.js';
import { swaggerSpec } from './swagger.js';
import authRoutes from './routes/authRoutes.js';
import cronJobRoutes from './routes/cronJobRoutes.js';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import taskRoutes from './routes/taskRoutes.js';
const app = express();
;
const swaggerUiOptions = {
  customCssUrl: 'https://unpkg.com/swagger-ui-dist@5/swagger-ui.css',
  customJs: [
    'https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js',
    'https://unpkg.com/swagger-ui-dist@5/swagger-ui-standalone-preset.js',
  ],
  customSiteTitle: 'API Documentation',
};

const buildSwaggerHtml = (specUrl) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${swaggerUiOptions.customSiteTitle}</title>
    <link rel="stylesheet" href="${swaggerUiOptions.customCssUrl}" />
    <style>
      html, body { margin: 0; padding: 0; }
    </style>
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="${swaggerUiOptions.customJs[0]}"></script>
    <script src="${swaggerUiOptions.customJs[1]}"></script>
    <script>
      window.onload = function () {
        window.ui = SwaggerUIBundle({
          url: "${specUrl}",
          dom_id: "#swagger-ui",
          presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
          layout: "StandaloneLayout",
          persistAuthorization: true,
        });
      };
    </script>
  </body>
</html>`;

const getSpecUrl = (req) => {
  const protocol = req.headers['x-forwarded-proto'] || req.protocol;
  const host = req.headers['x-forwarded-host'] || req.get('host');
  return `${protocol}://${host}/api-docs.json`;
};

app.get('/api-docs', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(buildSwaggerHtml(getSpecUrl(req)));
});

app.get('/api-docs/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(buildSwaggerHtml(getSpecUrl(req)));
});

app.get('/api-docs.json', (req, res) => {
  res.json(swaggerSpec);
});

app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", 'https://unpkg.com'],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://unpkg.com'],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'"],
      },
    },
  })
);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    limit: 100,
    legacyHeaders: false,
    message: 'To many requests try again in 15 mins!',
  })
);
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/cron-jobs', cronJobRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/tasks', taskRoutes);

app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

export default app;
