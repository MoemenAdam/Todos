import express from 'express';
import validate from '../middleware/schemaValidator.js';
import protectedRoute from '../middleware/protectedRoute.js';
import assignToUser from '../middleware/assignToUser.js';
import isIdBelongsToMe from '../middleware/isIdBelongsToMe.js';

import { getAll, create, getOne, update, deleteOne } from '../utils/CRUDS.js';
import { taskSchema } from '../validators/taskValidators.js';
import TaskModel from '../models/taskModel.js';

const Router = express.Router();

Router.use(protectedRoute);
Router.use('/:id', isIdBelongsToMe(TaskModel));

Router.get('/', (req, res, next) => {
  return getAll(TaskModel, { userId: req.user._id })(req, res, next);
});
Router.post(
  '/',
  validate(taskSchema),
  assignToUser('userId'),
  create(TaskModel)
);
Router.route('/:id')
  .get(getOne(TaskModel))
  .patch(validate(taskSchema), update(TaskModel))
  .delete(deleteOne(TaskModel));

export default Router;
