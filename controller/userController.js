import TaskModel from '../models/taskModel.js';

export const getMe = async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: req.user,
    message: 'User found',
  });
};

export const updateMe = async (req, res, next) => {
  for (const key in req.body) req.user[key] = req.body[key];
  await req.user.save();
  res.status(200).json({
    status: 'success',
    data: req.user,
    message: 'User updated successfully',
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

  res.status(202).json({
    status: 'success',
    meessage: 'Token assigned successfully',
  });
};

export const getLeaderBoard = async (req, res) => {
  const data = await TaskModel.aggregate([
    {
      $group: {
        _id: '$user',
        totalTasks: { $sum: 1 },
        totalCompletedTasks: {
          $sum: { $cond: [{ $eq: ['$isCompleted', true] }, 1, 0] },
        },
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        pipeline: [
          {
            $project: {
              name: 1,
              email: 1,
              _id: 0,
            },
          },
        ],
        as: 'user',
      },
    },
    { $unwind: '$user' },
    { $sort: { totalCompletedTasks: -1, totalTasks: -1 } },
  ]);
  res.status(200).json({
    status: 'success',
    data: data,
  });
};
