const ResultsEvent = require('../models/resultsEvent.model');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.validExistResultsEvent = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const resultsEvent = await ResultsEvent.findOne({
    where: {
      status: 'active',
      id,
    },
  });

  if (!resultsEvent) {
    return next(new AppError(`resultsEvent not found`, 404));
  }

  req.resultsEvent = resultsEvent;
  next();
});
