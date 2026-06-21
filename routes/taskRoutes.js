import express from 'express';
import validate from '../middleware/schemaValidator.js';
import protectedRoute from '../middleware/protectedRoute.js';
import assignToUser from '../middleware/assignToUser.js';
import isIdBelongsToMe from '../middleware/isIdBelongsToMe.js';
import AppError from '../utils/AppError.js';

import { getAll, create, getOne, update, deleteOne } from '../utils/CRUDS.js';
import { taskSchema } from '../validators/taskValidators.js';
import TaskModel from '../models/taskModel.js';

const Router = express.Router();

Router.use(protectedRoute);

Router.get('/', (req, res, next) => {
  return getAll(TaskModel, { user: req.user._id }, ['category'])(req, res, next);
});
Router.post(
  '/',
  validate(taskSchema),
  assignToUser('user'),
  create(TaskModel)
);

Router.get('/calendar', calendarController);

Router.use(isIdBelongsToMe(TaskModel));
Router.route('/:id')
  .get(getOne(TaskModel))
  .patch(validate(taskSchema), update(TaskModel))
  .delete(deleteOne(TaskModel));

function calendarController(req, res, next) {
  const type = req.query.type;
  if (!type || ['overdue', 'dueToday', 'done'].includes(type))
    return next(
      new AppError(
        'Type is required and must be eather overdue, late or done',
        400
      )
    );
  let dateFilter = {};
  const now = new Date();
  const tomorrow = new Date();
  tomorrow.setHours(24, 0, 0, 0);
  if (type === 'overdue') dueDate = { $lte: now };
  else if (type === 'dueToday') dueDate = { $gt: now, $lt: tomorrow };
  else if (type === 'done') isCompleted = true;
  return getAll(TaskModel, { user: req.user._id, dateFilter })(
    req,
    res,
    next
  );
}

export default Router;
