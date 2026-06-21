import TaskModel from '../models/taskModel.js';

export const getMe = async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: req.user,
    message: 'User found',
  });
};

export const updateMe = async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: req.user,
    message: 'User updated successfully found',
  });
};

export const getMyProgress = async (req, res, next) => {
  const tasks = await TaskModel.find({
    user: req.user._id,
    isCompleted: true,
  });
  const total = await TaskModel.countDocuments({ user: req.user._id });
  res.status(200).json({
    status: 'success',
    data: {
      total,
      completedTasks: tasks.length,
      progress: `${(tasks.length / Math.max(1, total)) * 100}%`,
    },
  });
};

export const assignFCMtoken = async (req, res) => {
  const fcmToken = req.body.token;
  const userFcmTokens = [];
  new Set([...req.user.fcmTokens, fcmToken]).forEach((el) => {
    userFcmTokens.push(el);
  });
  req.user.fcmTokens = userFcmTokens;
  await req.user.save({ validateBeforeSave: false });

  req.status(202).json({
    status: 'success',
    meessage: 'Token assigned successfully',
  });
};
