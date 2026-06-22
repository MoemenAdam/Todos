import express from 'express';
import AppError from '../utils/AppError.js';
import { runNotificationCronJob } from '../utils/PushNotification.js';

const Router = express.Router();
Router.get('/send-notification', async (req, res, next) => {
  if (
    !req.headers.authorization ||
    !req.headers.authorization.startsWith('Bearer')
  ) {
    return next(new AppError('who the hell are you ?', 401));
  }
  const token = req.headers.authorization.split(' ')[1];
  if (token !== process.env.cronSecret)
    return next(new AppError('who the hell are you ?', 401));
  const data = await runNotificationCronJob();

  res.status(200).json({ status: 'success' });
});

export default Router;
