import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import globalErrorHandler from './controller/errorController.js';
import AppError from './utils/AppError.js';
import authRoutes from './routes/authRoutes.js';

const app = express();

app.use(cors());
app.use(helmet());

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

app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

export default app;
