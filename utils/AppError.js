class AppEror extends Error {
  constructor(message, statusCode, errors = {}) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('5') ? 'error' : 'fail';
    this.errors = errors;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppEror;
