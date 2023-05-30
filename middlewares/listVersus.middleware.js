const ListVersus = require('../models/listVersus.model');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.validExistListVersus = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const listVersus = await ListVersus.findOne({
    where: {
      status: 'active',
      id,
    },
  });

  if (!listVersus) {
    return next(new AppError(`listVersus not found`, 404));
  }

  req.listVersus = listVersus;
  next();
});
