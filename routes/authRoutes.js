import express from 'express';
import {
  protectedRoute,
  login,
  signUp,
  logOut,
  getMe,
} from '../controller/authController.js';
const Router = express.Router();

Router.post('/login', login);
Router.post('/signUp', signUp);

Router.use(protectedRoute);
Router.post('/logOut', logOut);
Router.get('/me', getMe);

export default Router;
