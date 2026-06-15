import express from 'express';
import {
  getMe,
  getMyProgress,
  assignFCMtoken,
} from '../controller/userController.js';
import protectedRoute from '../middleware/protectedRoute.js';
import validate from '../middleware/schemaValidator.js';
import { fcmTokenSchema } from '../validators/userValidators.js';

const Router = express.Router();

Router.use(protectedRoute);
Router.get('/me', getMe);
Router.get('/myProgress', getMyProgress);
Router.post(
  '/assignPushNotifcationToken',
  validate(fcmTokenSchema),
  assignFCMtoken
);

export default Router;
