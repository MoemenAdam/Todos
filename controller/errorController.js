import AppError from '../utils/AppError.js';

const handleCastError = (err) => {
  const map = { _id: 'id' };
  return new AppError(
    `Can't find any element with this ${map[err.path] ?? err.path} = ${
      err.value
    }`,
    404
  );
};

const handleValidationError = (err) => {
  const errors = {};
  let errMessage = 'Validation error';
  Object.entries(err.errors).forEach(([key, value]) => {
    const message = (errors[key] =
      value.name === 'CastError'
        ? `${value.reason.value} is not valid`
        : value.message);
    errMessage = message;
    return message;
  });
  return new AppError(errMessage, 400, errors);
};

const handleDuplicateError = (err) => {
  const errors = {};
  let errMessage = 'Duplicate error';
  Object.keys(err.keyPattern).forEach((key) => {
    const message = (errors[key] = `This ${key} is used before`);
    errMessage = message;
    return message;
  });
  return new AppError(errMessage, 400, errors);
};

const handleJWTError = () =>
  new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please log in again.', 401);

const DevErrors = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const ProdErrors = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      ...(err.errors &&
        Object.keys(err.errors).length > 0 && {
          errors: err.errors,
        }),
      message: err.message,
    });
  } else {
    console.error('ERROR 💥', err);
    res.status(500).json({
      status: 'error',
      message: 'Somthing went wrong',
    });
  }
};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    DevErrors(err, res);
  } else {
    let error = { ...err };
    error.message = err.message;
    if (error.name === 'CastError') error = handleCastError(error);
    else if (error.name === 'ValidationError')
      error = handleValidationError(error);
    else if (error.code === 11000) error = handleDuplicateError(error);
    else if (error.name === 'JsonWebTokenError') error = handleJWTError();
    else if (error.name === 'TokenExpiredError')
      error = handleJWTExpiredError();

    ProdErrors(error, res);
  }
};

export default globalErrorHandler;
