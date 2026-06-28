import UserModel from '../models/userModel.js';
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
    if (!user.validateOTPExpires(user.confirmEmailOTPExpires)) {
      const otp = await user.generateconfirmEmailOTP();
      await user.save({ validateBeforeSave: false });
      await sendEmail({
        email: user.email,
        type: 'CONFIRM_EMAIL',
        code: otp,
      });
      return next(new AppError('Confirmation OTP sent to your email', 403));
    }
    return next(new AppError('Confirm your email first', 403));
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

  if (!user.confirmEmailOTP)
    return next(new AppError('User Email allready confirmed', 400));
  if (!user || !user.validateConfirmEmailOTP(otp))
    return next(new AppError("Email or OTP isn't correct", 400));
  if (!user.validateOTPExpires(user.confirmEmailOTPExpires))
    return next(new AppError('OTP is Expired click resend otp', 400));

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

export const resendOtp = async (req, res, next) => {
  const { email } = req.body;
  const user = await UserModel.findOne({
    email,
  });

  if (!user) return next(new AppError("Email isn't correct", 400));
  if (!user.confirmEmailOTP)
    return next(new AppError('User Email allready confirmed', 400));
  if (user.validateOTPExpires(user.confirmEmailOTPExpires))
    return next(new AppError("Otp isn't expired yet", 400));

  const otp = await user.generateconfirmEmailOTP();
  await user.save({ validateBeforeSave: false });
  await sendEmail({
    email: user.email,
    type: 'CONFIRM_EMAIL',
    code: otp,
  });

  res.status(200).json({
    status: 'success',
    message: 'Confirmation OTP sent to your email',
  });
};

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await UserModel.findOne({
    email,
  });

  if (!user) {
    res.status(200).json({
      status: 'success',
      message: 'If Email exist Reset password otp will be sent to your email',
    });
  }

  const otp = await user.generateResetPasswordOTP();
  await user.save({ validateBeforeSave: false });
  await sendEmail({
    email: user.email,
    type: 'FORGOT_PASSWORD',
    code: otp,
  });

  res.status(200).json({
    status: 'success',
    message: 'If Email exist Reset password otp will be sent to your email',
  });
};

export const resetPassword = async (req, res, next) => {
  if (req.body.password !== req.body.confirmPassword)
    return next(new AppError("Passwords dosn't match", 400));

  const user = await UserModel.findOne({
    email: req.body.email,
  });

  if (!user) return next(new AppError("Email isn't correct", 400));

  if (!user.validateResetPasswordOTP(req.body.otp)) {
    return next(new AppError('Reset password otp is invalid', 400));
  }
  if (!(await user.validateOTPExpires(user.resetPasswordOTPExpires))) {
    const otp = await user.generateResetPasswordOTP();
    await user.save({ validateBeforeSave: false });
    await sendEmail({
      email: user.email,
      type: 'FORGOT_PASSWORD',
      code: otp,
    });
    return next(
      new AppError(
        'Reset password otp is expired new OTP sent to your email',
        400
      )
    );
  }
  if (await user.validatePassword(req.body.password)) {
    return next(new AppError("You can't use the same password", 400));
  }

  user.password = req.body.password;
  await user.save();
  res.status(200).json({
    status: 'success',
    message: 'Password have been reseted succesffuly',
  });
};
