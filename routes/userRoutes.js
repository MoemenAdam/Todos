import express from 'express';
import {
  getMe,
  getMyProgress,
  assignFCMtoken,
  updateMe,
  getLeaderBoard,
  updatePassword,
} from '../controller/userController.js';
import protectedRoute from '../middleware/protectedRoute.js';
import validate from '../middleware/schemaValidator.js';
import {
  fcmTokenSchema,
  userSchema,
  updatePasswordSchema,
} from '../validators/userValidators.js';

const Router = express.Router();

Router.use(protectedRoute);
Router.get('/me', getMe);
Router.patch('/updateMe', validate(userSchema), updateMe);
Router.get('/myProgress', getMyProgress);
Router.get('/updatePassword', validate(updatePasswordSchema), updatePassword);
Router.get('/leaderBoard', getLeaderBoard);
Router.post(
  '/assignPushNotifcationToken',
  validate(fcmTokenSchema),
  assignFCMtoken
);

export default Router;
