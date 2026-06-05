const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const app = express();
const globalErrorHandler = require('./controller/errorController.js');
const AppError = require('./utils/AppError.js');

const authRoutes = require('./routes/authRoutes.js');

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
app.use(mongoSanitize());

app.use('/api/v1/auth', authRoutes);
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
