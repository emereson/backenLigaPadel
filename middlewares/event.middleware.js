const Event = require('../models/event.model');
const Inscription = require('../models/inscription.model');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.validExistEvent = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const event = await Event.findOne({
    where: {
      id,
    },
    include: [
      {
        model: Inscription,
      },
    ],
  });

  if (!event) {
    return next(new AppError(`event not found`, 404));
  }

  req.event = event;
  req.Inscription = event.Inscription;
  next();
});
