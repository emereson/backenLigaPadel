const catchAsync = require('../utils/catchAsync');
const Inscription = require('../models/inscription.model');
const { storage } = require('../utils/firebase');
const { getDownloadURL, ref, uploadBytes } = require('firebase/storage');

exports.findAll = catchAsync(async (req, res, next) => {
  const inscription = await Inscription.findAll({
    where: {
      status: 'active',
    },
  });

  return res.status(200).json({
    status: 'success',
    results: inscription.length,
    inscription,
  });
});

exports.findAllByEvent = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const inscription = await Inscription.findAll({
    where: {
      status: 'active',
      eventId: id,
    },
  });

  return res.status(200).json({
    status: 'success',
    results: inscription.length,
    inscription,
  });
});

exports.create = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const {
    name1,
    lastName1,
    RutPlayer1,
    email1,
    mobileNumber1,
    birthDate1,
    poloSize1,
    category1,
    clubPlay1,
    positionPlay1,
    medicalProblem1,
    name2,
    lastName2,
    RutPlayer2,
    email2,
    mobileNumber2,
    birthDate2,
    poloSize2,
    category2,
    clubPlay2,
    positionPlay2,
    medicalProblem2,
    discountCoupon,
  } = req.body;

  const inscription = await Inscription.create({
    name1,
    lastName1,
    RutPlayer1,
    email1,
    mobileNumber1,
    birthDate1,
    poloSize1,
    category1,
    clubPlay1,
    positionPlay1,
    medicalProblem1,
    name2,
    lastName2,
    RutPlayer2,
    email2,
    mobileNumber2,
    birthDate2,
    poloSize2,
    category2,
    clubPlay2,
    positionPlay2,
    medicalProblem2,
    discountCoupon,
    eventId: id,
  });

  return res.status(201).json({
    status: 'Success',
    message: 'the inscription  has been created',
    inscription,
  });
});

exports.findOne = catchAsync(async (req, res, next) => {
  const { inscription } = req;

  return res.status(200).json({
    status: 'success',
    inscription,
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const { inscription } = req;
  const {
    name1,
    lastName1,
    RutPlayer1,
    email1,
    mobileNumber1,
    birthDate1,
    poloSize1,
    category1,
    clubPlay1,
    positionPlay1,
    medicalProblem1,
    score1,
    name2,
    lastName2,
    RutPlayer2,
    email2,
    mobileNumber2,
    birthDate2,
    poloSize2,
    category2,
    clubPlay2,
    positionPlay2,
    medicalProblem2,
    score2,
  } = req.body;

  const imgRef = ref(
    storage,
    `playerImg/${Date.now()}-${req.file.originalname}`
  );

  const imgUploaded = await uploadBytes(imgRef, req.file.buffer);

  await inscription.update({
    name1,
    lastName1,
    RutPlayer1,
    email1,
    mobileNumber1,
    birthDate1,
    poloSize1,
    category1,
    clubPlay1,
    positionPlay1,
    medicalProblem1,
    score1,
    name2,
    lastName2,
    RutPlayer2,
    email2,
    mobileNumber2,
    birthDate2,
    poloSize2,
    category2,
    clubPlay2,
    positionPlay2,
    medicalProblem2,
    score2,
    playerImg: imgUploaded.metadata.fullPath,
  });

  return res.status(200).json({
    status: 'success',
    message: 'the inscription has been updated',
    inscription,
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const { inscription } = req;

  await inscription.update({ status: 'disabled' });

  return res.status(200).json({
    status: 'success',
    message: 'the inscription has been delete',
    inscription,
  });
});
