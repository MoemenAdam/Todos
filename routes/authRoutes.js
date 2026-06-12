import express from 'express';
import {
  login,
  signUp,
  confirmEmail,
  logOut,
  getMe,
  getMyProgress,
} from '../controller/authController.js';
import {
  loginSchema,
  signUpSchema,
  confirmEmailSchema,
} from '../validators/authValidator.js';
import protectedRoute from '../middleware/protectedRoute.js';
import validate from '../middleware/schemaValidator.js';

const Router = express.Router();

Router.post('/login', validate(loginSchema), login);
Router.post('/signUp', validate(signUpSchema), signUp);
Router.post('/confirmEmail', validate(confirmEmailSchema), confirmEmail);

Router.use(protectedRoute);
Router.post('/logOut', logOut);
Router.get('/me', getMe);
Router.get('/myProgress', getMyProgress);

export default Router;
