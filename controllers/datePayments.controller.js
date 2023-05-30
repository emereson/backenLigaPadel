const DatePayments = require('../models/datePayments.model');
const catchAsync = require('../utils/catchAsync');

exports.findAll = catchAsync(async (req, res, next) => {
  const datePayments = await DatePayments.findAll({
    where: {
      status: 'approved',
    },
  });

  return res.status(200).json({
    status: 'Success',
    results: datePayments.length,
    datePayments,
  });
});

exports.findOne = catchAsync(async (req, res, next) => {
  const { collectorId } = req.body;

  const datePay = await DatePayments.findOne({
    collectorId: collectorId,
  });

  if (!datePay) {
    return next(new AppError(`datePay not found`, 404));
  }

  return res.status(200).json({
    status: 'Success',
    datePay,
  });
});
