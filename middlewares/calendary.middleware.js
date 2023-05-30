const Calendary = require('../models/calendary.model');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

exports.validExistCalendary = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const calendary = await Calendary.findOne({
    where: {
      status: 'active',
      id,
    },
    // include: [
    //   {
    //     model: ListVersus,
    //   },
    //   {
    //     model: Event,
    //     attributes: {
    //       exclude: [
    //         'description',
    //         'rules',
    //         'generalConditions',
    //         'changesCancellations',
    //         'requirements',
    //       ],
    //     },
    //     include: [{ model: Inscription }],
    //   },
    // ],
  });

  if (!calendary) {
    return next(new AppError(`calendary not found`, 404));
  }

  req.calendary = calendary;
  // req.ListVersus = Calendary.ListVersus;
  // req.Event = Calendary.Event;
  next();
});
