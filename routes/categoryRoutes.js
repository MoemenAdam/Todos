import express from 'express';
import { getAll, create, getOne, update, deleteOne } from '../utils/CRUDS.js';
import validate from '../middleware/schemaValidator.js';
import { categorySchema } from '../validators/categoryValidators.js';
import CategoryModel from '../models/categoryModel.js';

const Router = express.Router();

Router.get('/', getAll(CategoryModel));
Router.post('/', validate(categorySchema), create(CategoryModel));
Router.route('/:id')
  .get(getOne(CategoryModel))
  .patch(validate(categorySchema), update(CategoryModel))
  .delete(deleteOne(CategoryModel));

export default Router;
