import AppError from '../utils/AppError.js';

export const getAll =
  (Model, mainFilters = {}, populateArr = []) =>
  async (req, res) => {
    const page = Math.max(1, +req.query?.page || 1);
    const limit = Math.max(1, +req.query?.limit || 10);
    const data = await Model.find({ ...mainFilters })
      .skip((page - 1) * limit)
      .limit(limit).populate([...populateArr]);
    const totalDocs = await Model.countDocuments({ ...mainFilters });

    res.status(200).json({
      status: 'success',
      total: totalDocs,
      data,
    });
  };

export const create = (Model, mainFilters = {}) => async (req, res) => {
  const data = await Model.create(req.body);

  res.status(201).json({
    status: 'success',
    data,
    message: 'Document created successfully',
  });
};

export const getOne = (Model, mainFilters = {}) => async (req, res, next) => {
  const id = req.params.id;
  const data = await Model.findById(id);
  if (!data) return next(new AppError('Document not found', 404));
  res.status(200).json({
    status: 'success',
    data,
  });
};

export const deleteOne = (Model, mainFilters = {}) => async (req, res, next) => {
  const id = req.params.id;
  const data = await Model.findByIdAndDelete(id);
  if (!data) return next(new AppError('Document not found', 404));
  res.status(204).json({
    status: 'success',
    data,
  });
};

export const update = (Model, mainFilters = {}) => async (req, res, next) => {
  const id = req.params.id;
  const data = await Model.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!data) return next(new AppError('Document not found', 404));

  res.status(200).json({
    status: 'success',
    data,
    message: 'Document updated successfully',
  });
};
