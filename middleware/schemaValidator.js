import AppError from '../utils/AppError.js';
import { ZodError } from 'zod';

const validate = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      const errors = {};
      let errMessage = 'Validation error';
      err.issues.forEach((issue) => {
        errMessage = issue.message;
        errors[issue.path.join('.')] = issue.message;
      });

      return next(new AppError(errMessage, 400, errors));
    }
    next(err);
  }
};

export default validate;
