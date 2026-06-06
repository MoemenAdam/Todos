import UserModel from '../models/userModel.js';
import AppError from '../utils/AppError.js';
import { validateJWT } from '../utils/JWT.js';

const protectedRoute = async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer')
  ) {
    return next(new AppError('You have to login first', 401));
  }
  const token = req.headers.authorization.split(' ')[1];
  const payload = await validateJWT(token);
  const user = await UserModel.findById(payload.userId);

  if (!user) return next(new AppError('User does no longer exist.', 401));
  if (user.confirmEmailOTP)
    return next(new AppError('Confirm your email first', 403));
  if (user.token !== token)
    return next(new AppError('You have to login first', 401));

  req.user = user;
  next();
};

export default protectedRoute;
