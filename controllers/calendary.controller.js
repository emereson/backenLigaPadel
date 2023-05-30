const catchAsync = require('../utils/catchAsync');
const Calendary = require('../models/calendary.model');
const { storage } = require('../utils/firebase');
const { getDownloadURL, ref, uploadBytes } = require('firebase/storage');
const CalendaryImg = require('../models/calendaryImg.model');

exports.findAllImportant = catchAsync(async (req, res, next) => {
  const calendars = await Calendary.findAll({
    where: {
      status: 'active',
      important: 'yes',
    },
    include: {
      model: CalendaryImg,
    },
  });

  const calendarsPromises = calendars.map(async (calendary) => {
    const calendaryImgsPromises = calendary.calendaryImgs.map(
      async (calendaryImg) => {
        const imgref = ref(storage, calendaryImg.calendaryImgUrl);
        const url = await getDownloadURL(imgref);

        calendaryImg.calendaryImgUrl = url;
        return calendaryImg;
      }
    );

    const calendaryImgResolved = await Promise.all(calendaryImgsPromises);
    calendary.calendaryImg = calendaryImgResolved;

    return calendars;
  });

  const calendaryresolved = await Promise.all(calendarsPromises);

  return res.status(200).json({
    status: 'success',
    results: calendars.length,
    calendars: calendaryresolved,
  });
});

exports.findAllLiga = catchAsync(async (req, res, next) => {
  const calendars = await Calendary.findAll({
    where: {
      status: 'active',
      typeEvent: 'Liga',
    },
    include: {
      model: CalendaryImg,
    },
  });

  const calendarsPromises = calendars.map(async (calendary) => {
    const calendaryImgsPromises = calendary.calendaryImgs.map(
      async (calendaryImg) => {
        const imgref = ref(storage, calendaryImg.calendaryImgUrl);
        const url = await getDownloadURL(imgref);

        calendaryImg.calendaryImgUrl = url;
        return calendaryImg;
      }
    );

    const calendaryImgResolved = await Promise.all(calendaryImgsPromises);
    calendary.calendaryImg = calendaryImgResolved;

    return calendars;
  });

  const calendaryresolved = await Promise.all(calendarsPromises);

  return res.status(200).json({
    status: 'success',
    results: calendars.length,
    calendars: calendaryresolved,
  });
});

exports.findAllTorneo = catchAsync(async (req, res, next) => {
  const calendars = await Calendary.findAll({
    where: {
      status: 'active',
      typeEvent: 'Torneo',
    },
    include: {
      model: CalendaryImg,
    },
  });

  const calendarsPromises = calendars.map(async (calendary) => {
    const calendaryImgsPromises = calendary.calendaryImgs.map(
      async (calendaryImg) => {
        const imgref = ref(storage, calendaryImg.calendaryImgUrl);
        const url = await getDownloadURL(imgref);

        calendaryImg.calendaryImgUrl = url;
        return calendaryImg;
      }
    );

    const calendaryImgResolved = await Promise.all(calendaryImgsPromises);
    calendary.calendaryImg = calendaryImgResolved;

    return calendars;
  });

  const calendaryresolved = await Promise.all(calendarsPromises);

  return res.status(200).json({
    status: 'success',
    results: calendars.length,
    calendars: calendaryresolved,
  });
});

exports.findAllAmericano = catchAsync(async (req, res, next) => {
  const calendars = await Calendary.findAll({
    where: {
      status: 'active',
      typeEvent: 'Americano',
    },
    include: {
      model: CalendaryImg,
    },
  });

  const calendarsPromises = calendars.map(async (calendary) => {
    const calendaryImgsPromises = calendary.calendaryImgs.map(
      async (calendaryImg) => {
        const imgref = ref(storage, calendaryImg.calendaryImgUrl);
        const url = await getDownloadURL(imgref);

        calendaryImg.calendaryImgUrl = url;
        return calendaryImg;
      }
    );

    const calendaryImgResolved = await Promise.all(calendaryImgsPromises);
    calendary.calendaryImg = calendaryImgResolved;

    return calendars;
  });

  const calendaryresolved = await Promise.all(calendarsPromises);

  return res.status(200).json({
    status: 'success',
    results: calendars.length,
    calendars: calendaryresolved,
  });
});

exports.create = catchAsync(async (req, res, next) => {
  const { title, typeEvent, important } = req.body;

  const calendary = await Calendary.create({
    title,
    typeEvent,
    important,
  });

  const calendaryImgsPromises = req.files.map(async (file) => {
    const imgRef = ref(
      storage,
      `calendaryImg/${Date.now()}-${file.originalname}`
    );

    const imgUploaded = await uploadBytes(imgRef, file.buffer);

    return await CalendaryImg.create({
      calendaryId: calendary.id,
      calendaryImgUrl: imgUploaded.metadata.fullPath,
    });
  });

  await Promise.all(calendaryImgsPromises);

  return res.status(201).json({
    status: 'Success',
    message: 'calendary created successfully',
    calendary,
  });
});

exports.findOne = catchAsync(async (req, res, next) => {
  const { calendary } = req;

  return res.status(200).json({
    status: 'success',
    calendary,
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const { calendary } = req;
  const { title, typeEvent, important } = req.body;

  await calendary.update({
    title,
    typeEvent,
    important,
  });

  return res.status(200).json({
    status: 'success',
    message: 'the calendary has been updated',
    calendary,
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const { calendary } = req;

  await calendary.update({ status: 'disabled' });

  return res.status(200).json({
    status: 'success',
    message: 'the calendary has been delete',
    calendary,
  });
});
