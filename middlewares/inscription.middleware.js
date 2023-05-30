const Inscription = require('../models/inscription.model');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.validExistInscription = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const inscription = await Inscription.findOne({
    where: {
      status: 'active',
      id,
    },
  });
  if (!inscription) {
    return next(new AppError(`Inscription not found`, 404));
  }

  req.inscription = inscription;
  next();
});
