import express from 'express';
import {
  getAll,
  create,
  getOne,
  update,
  deleteOne,
} from '../controller/categoryController.js';
import validate from '../middleware/schemaValidator.js';
import { deleteAndCreateSchema } from '../validators/categoryValidators.js';

const Router = express.Router();

Router.get('/', getAll);
Router.post('/', validate(deleteAndCreateSchema), create);
Router.route('/:id')
  .get(getOne)
  .patch(validate(deleteAndCreateSchema), update)
  .delete(deleteOne);

export default Router;
