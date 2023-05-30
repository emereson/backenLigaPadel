const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const Gallery = require('../models/gallery.model');

exports.validExistGallery = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const gallery = await Gallery.findOne({
    where: {
      status: 'active',
      id,
    },
  });

  if (!gallery) {
    return next(new AppError(`gallery not found`, 404));
  }

  req.gallery = gallery;
  next();
});
