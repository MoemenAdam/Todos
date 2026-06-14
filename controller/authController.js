import UserModel from '../models/userModel.js';
import TaskModel from '../models/taskModel.js';
import AppError from '../utils/AppError.js';
import { generateJWT, validateJWT } from '../utils/JWT.js';
import sendEmail from '../utils/Email.js';

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({
    email,
  });

  if (!user || !(await user.validatePassword(password))) {
    return next(new AppError("Email or Password isn't correct", 400));
  }

  if (user.confirmEmailOTP) {
    if (!user.validateConfirmEmailOTPExpires(user.confirmEmailOTPExpires)) {
      const otp = await user.generateconfirmEmailOTP();
      await user.save({ validateBeforeSave: false });
      await sendEmail({
        email: user.email,
        type: 'CONFIRM_EMAIL',
        code: otp,
      });
      return next(new AppError('Confirmation OTP sent to your email', 400));
    }
    return next(new AppError('Confirm your email first', 400));
  }

  let token = '';
  if (user.token) {
    try {
      await validateJWT(user.token);
      token = user.token;
    } catch (err) {
      token = generateJWT(user._id);
    }
  } else {
    token = generateJWT(user._id);
  }
  user.token = token;
  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: 'success',
    token,
    message: 'User logged in successfully',
  });
};

export const logOut = async (req, res, next) => {
  req.user.token = undefined;
  await req.user.save({ validateBeforeSave: false });
  res.status(200).json({
    status: 'success',
    message: 'User logged out successfully',
  });
};

export const signUp = async (req, res, next) => {
  const { name, email, password, lang, theme } = req.body;
  const user = await UserModel.create({ name, email, password, lang, theme });
  const otp = await user.generateconfirmEmailOTP();
  await user.save({ validateBeforeSave: false });
  await sendEmail({
    email: user.email,
    type: 'CONFIRM_EMAIL',
    code: otp,
  });

  res.status(201).json({
    status: 'success',
    message: 'Confirmation OTP sent to your email',
  });
};

export const confirmEmail = async (req, res, next) => {
  const { email, otp } = req.body;
  if (!email) return next(new AppError('Email is required', 400));
  if (!otp) return next(new AppError('OTP is required', 400));

  const user = await UserModel.findOne({
    email,
  });

  if (!user || !user.validateConfirmEmailOTP(otp))
    return next(new AppError("Email or OTP isn't correct", 400));
  if (!user.validateConfirmEmailOTPExpires(user.confirmEmailOTPExpires))
    return next(new AppError('OTP is Expired Login again to get new OTP', 400));

  user.confirmEmailOTP = undefined;
  user.confirmEmailOTPExpires = undefined;
  await user.save({ validateBeforeSave: false });
  await sendEmail({
    email: user.email,
    type: 'EMAIL_CONFIRMED',
  });

  res.status(200).json({
    status: 'success',
    message: 'Email confirmed successfully please login',
  });
};

export const getMe = async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: req.user,
    message: 'User found',
  });
};

export const getMyProgress = async (req, res, next) => {
  const posts = await TaskModel.find({
    userId: req.user._id,
    isCompleted: true,
  });
  const total = await TaskModel.countDocuments({ userId: req.user._id });
  res.status(200).json({
    status: 'success',
    data: {
      total,
      completedPosts: posts.length,
      progress: `${(posts.length / Math.max(1, total)) * 100}%`,
    },
  });
};
