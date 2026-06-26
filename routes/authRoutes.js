import express from 'express';
import {
  login,
  signUp,
  confirmEmail,
  logOut,
  resendOtp,
  forgotPassword,
  resetPassword,
} from '../controller/authController.js';
import {
  loginSchema,
  signUpSchema,
  confirmEmailSchema,
  resendOtpSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from '../validators/authValidator.js';
import protectedRoute from '../middleware/protectedRoute.js';
import validate from '../middleware/schemaValidator.js';

const Router = express.Router();

Router.post('/login', validate(loginSchema), login);
Router.post('/signUp', validate(signUpSchema), signUp);
Router.post('/confirmEmail', validate(confirmEmailSchema), confirmEmail);
Router.post('/resendOtp', validate(resendOtpSchema), resendOtp);
Router.post('/forgotPassword', validate(forgotPasswordSchema), forgotPassword);
Router.post('/resetPassword', validate(resetPasswordSchema), resetPassword);

Router.use(protectedRoute);
Router.post('/logOut', logOut);

export default Router;
