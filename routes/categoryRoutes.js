import express from 'express';
import { getAll, create, getOne, update, deleteOne } from '../utils/CRUDS.js';
import protectedRoute from '../middleware/protectedRoute.js';
import assignToUser from '../middleware/assignToUser.js';
import isIdBelongsToMe from '../middleware/isIdBelongsToMe.js';
import validate from '../middleware/schemaValidator.js';
import { categorySchema } from '../validators/categoryValidators.js';
import CategoryModel from '../models/categoryModel.js';

const Router = express.Router();

Router.use(protectedRoute);
Router.get('/', (req, res, next) => {
  return getAll(CategoryModel, { user: req.user._id })(req, res, next);
});
Router.post(
  '/',
  validate(categorySchema),
  assignToUser('user'),
  create(CategoryModel)
);

Router.use(isIdBelongsToMe(CategoryModel));
Router.route('/:id')
  .get(getOne(CategoryModel))
  .patch(validate(categorySchema), update(CategoryModel))
  .delete(deleteOne(CategoryModel));

export default Router;
