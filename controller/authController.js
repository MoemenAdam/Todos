import UserModel from '../models/userModel.js';
import AppError from '../utils/AppError.js';
import { generateJWT, validateJWT } from '../utils/JWT.js';

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({
    email,
  });

  if (!user || !(await user.validatePassword(password, user.password))) {
    return next(new AppError("Email or Password isn't correct", 400));
  }

  let token = '';
  if (user.token) {
    try {
      await validateJWT(user.token);
      token = user.token;
    } catch (err) {
      token = await generateJWT(user._id);
    }
  } else {
    token = await generateJWT(user._id);
  }
  user.token = token;
  await user.save({ validateBeforeSave: false });

  res.status(201).json({
    status: 'success',
    token,
    message: 'User created successflly',
  });
};

export const logOut = async (req, res, next) => {
  req.user.token = undefined;
  await req.user.save({ validateBeforeSave: false });
  res.status(201).json({
    status: 'success',
    message: 'User logged out successflly',
  });
};

export const signUp = async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await UserModel.create({ name, email, password });

  const token = await generateJWT(user._id);
  user.token = token;
  await user.save({ validateBeforeSave: false });

  res.status(201).json({
    status: 'success',
    token,
    message: 'User created successflly',
  });
};

export const getMe = async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: { ...req.user },
    message: 'User found',
  });
};

export const protectedRoute = async (req, res, next) => {
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
  if (user.token !== token)
    return next(new AppError('You have to login first', 401));

  req.user = user;
  next();
};
