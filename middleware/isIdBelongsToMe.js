import AppError from '../utils/AppError.js';

const isIdBelongsToMe = (Model) => {
  return async (req, res, next) => {
    const userId = req.user._id;
    const documentId = req.params.id;
    const document = await Model.findById(documentId);
    if (!document || document.user.equals(userId))
      return next(new AppError('Document not found', 404));

    next();
  };
};

export default isIdBelongsToMe;
