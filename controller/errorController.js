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

const DevErrors = (err, res) => {
  res.statusCode(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const ProdErrors = (err, res) => {
  if (err.isOperational) {
    res.statusCode(err.status).json({
      status: err.status,
      error: err.errors,
      message: err.message,
    });
  } else {
    console.error('ERROR 💥', err);
    res.statusCode(500).json({
      status: 'error',
      message: 'Somthing went wrong',
    });
  }
};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    DevErrors(Error, res);
  } else {
    let error = structuredClone(err);
    if (error.name === 'CastError') error = handleCastError(error);
    else if (error.name === 'ValidationError')
      error = handleValidationError(error);
    else if (error.code === 11000) error = handleDuplicateError(error);

    ProdErrors(error, res);
  }
};

export default globalErrorHandler;
