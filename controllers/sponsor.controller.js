const catchAsync = require('../utils/catchAsync');
const Sponsor = require('../models/sponsor.model');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { storage } = require('../utils/firebase');

exports.findAll = catchAsync(async (req, res, next) => {
  const sponsors = await Sponsor.findAll({
    where: {
      status: 'active',
    },
  });

  const sponsorPromises = sponsors.map(async (sponsor) => {
    const imgRef = ref(storage, sponsor.sponsorImg);
    const url = await getDownloadURL(imgRef);

    sponsor.sponsorImg = url;
    return sponsor;
  });

  const sponsorResolved = await Promise.all(sponsorPromises);

  return res.status(200).json({
    status: 'success',
    results: sponsors.length,
    sponsor: sponsorResolved,
  });
});

exports.create = catchAsync(async (req, res, next) => {
  const { name, description } = req.body;

  const imgRef = ref(
    storage,
    `sponsorImg/${Date.now()}-${req.file.originalname}`
  );

  const imgUploaded = await uploadBytes(imgRef, req.file.buffer);

  const sponsor = await Sponsor.create({
    name,
    description,
    sponsorImg: imgUploaded.metadata.fullPath,
  });

  return res.status(201).json({
    status: 'Success',
    message: 'event created successfully',
    sponsor,
  });
});

exports.findOne = catchAsync(async (req, res, next) => {
  const { sponsor } = req;

  return res.status(200).json({
    status: 'success',
    sponsor,
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const { sponsor } = req;
  const { name, description, sponsorImg } = req.body;

  await sponsor.update({
    name,
    description,
    sponsorImg,
  });

  return res.status(200).json({
    status: 'success',
    message: 'the sponsor has been updated',
    sponsor,
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const { sponsor } = req;

  await sponsor.update({ status: 'disabled' });

  return res.status(200).json({
    status: 'success',
    message: 'the sponsor has been delete',
    sponsor,
  });
});
