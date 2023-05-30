const catchAsync = require('../utils/catchAsync');
const Sponsor = require('../models/sponsor.model');

exports.validExistSponsor = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const sponsor = await Sponsor.findOne({
    where: {
      status: 'active',
      id,
    },
  });

  if (!sponsor) {
    return next(new AppError(`sponsor not found`, 404));
  }

  req.sponsor = sponsor;
  next();
});
