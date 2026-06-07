import CategoryModel from '../models/categoryModel.js';
import AppError from '../utils/AppError.js';

export const getAll = async (req, res) => {
  const page = Math.max(1, +req.query?.page || 1);
  const limit = Math.max(1, +req.query?.limit || 10);
  const data = await CategoryModel.find()
    .skip((page - 1) * limit)
    .limit(limit);
  const totalDocs = await CategoryModel.countDocuments();

  res.status(200).json({
    status: 'success',
    total: totalDocs,
    data,
  });
};

export const create = async (req, res) => {
  const { name } = req.body;
  const data = await CategoryModel.create({
    name,
  });

  res.status(201).json({
    status: 'success',
    data,
    message: 'Category created successflly',
  });
};

export const getOne = async (req, res, next) => {
  const id = req.params.id;
  const data = await CategoryModel.findById(id);
  if (!data) return next(new AppError('Category not found', 404));
  res.status(200).json({
    status: 'success',
    data,
  });
};

export const deleteOne = async (req, res, next) => {
  const id = req.params.id;
  const data = await CategoryModel.findByIdAndDelete(id);
  if (!data) return next(new AppError('Category not found', 404));
  res.status(204).json({
    status: 'success',
    data,
  });
};

export const update = async (req, res, next) => {
  const id = req.params.id;
  const { name } = req.body;
  const data = await CategoryModel.findByIdAndUpdate(
    id,
    {
      name,
    },
    { new: true, runValidators: true }
  );
  if (!data) return next(new AppError('Category not found', 404));

  res.status(200).json({
    status: 'success',
    data,
    message: 'Category updated successflly',
  });
};
