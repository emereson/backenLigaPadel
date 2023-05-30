const catchAsync = require('../utils/catchAsync');
const ResultsEvent = require('../models/resultsEvent.model');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { storage } = require('../utils/firebase');
const ResultsEventImg = require('../models/resultsEventImg.model');

exports.findAllImportant = catchAsync(async (req, res, next) => {
  const resultsEvent = await ResultsEvent.findAll({
    where: {
      status: 'active',
      important: 'yes',
    },
    include: {
      model: ResultsEventImg,
    },
  });

  const resultsEventPromises = resultsEvent.map(async (resultEvent) => {
    const resultsEventImgsPromises = resultEvent.resultsEventImgs.map(
      async (resultsEventImg) => {
        const imgref = ref(storage, resultsEventImg.resultsEventImgUrl);
        const url = await getDownloadURL(imgref);

        resultsEventImg.resultsEventImgUrl = url;
        return resultsEventImg;
      }
    );

    const resultsEventImgResolved = await Promise.all(resultsEventImgsPromises);
    resultsEvent.ResultsEventImg = resultsEventImgResolved;

    return resultsEvent;
  });

  const resultsEventResolved = await Promise.all(resultsEventPromises);

  return res.status(200).json({
    status: 'success',
    results: resultsEvent.length,
    resultsEvent: resultsEventResolved,
  });
});

exports.findAllLiga = catchAsync(async (req, res, next) => {
  const resultsEvent = await ResultsEvent.findAll({
    where: {
      status: 'active',
      typeEvent: 'Liga',
    },
    include: {
      model: ResultsEventImg,
    },
  });

  const resultsEventPromises = resultsEvent.map(async (resultEvent) => {
    const resultsEventImgsPromises = resultEvent.resultsEventImgs.map(
      async (resultsEventImg) => {
        const imgref = ref(storage, resultsEventImg.resultsEventImgUrl);
        const url = await getDownloadURL(imgref);

        resultsEventImg.resultsEventImgUrl = url;
        return resultsEventImg;
      }
    );

    const resultsEventImgResolved = await Promise.all(resultsEventImgsPromises);
    resultsEvent.ResultsEventImg = resultsEventImgResolved;

    return resultsEvent;
  });

  const resultsEventResolved = await Promise.all(resultsEventPromises);

  return res.status(200).json({
    status: 'success',
    results: resultsEvent.length,
    resultsEvent: resultsEventResolved,
  });
});

exports.findAllTorneo = catchAsync(async (req, res, next) => {
  const resultsEvent = await ResultsEvent.findAll({
    where: {
      status: 'active',
      typeEvent: 'Torneo',
    },
    include: {
      model: ResultsEventImg,
    },
  });

  const resultsEventPromises = resultsEvent.map(async (resultEvent) => {
    const resultsEventImgsPromises = resultEvent.resultsEventImgs.map(
      async (resultsEventImg) => {
        const imgref = ref(storage, resultsEventImg.resultsEventImgUrl);
        const url = await getDownloadURL(imgref);

        resultsEventImg.resultsEventImgUrl = url;
        return resultsEventImg;
      }
    );

    const resultsEventImgResolved = await Promise.all(resultsEventImgsPromises);
    resultsEvent.ResultsEventImg = resultsEventImgResolved;

    return resultsEvent;
  });

  const resultsEventResolved = await Promise.all(resultsEventPromises);

  return res.status(200).json({
    status: 'success',
    results: resultsEvent.length,
    resultsEvent: resultsEventResolved,
  });
});

exports.findAllAmericano = catchAsync(async (req, res, next) => {
  const resultsEvent = await ResultsEvent.findAll({
    where: {
      status: 'active',
      typeEvent: 'Americano',
    },
    include: {
      model: ResultsEventImg,
    },
  });

  const resultsEventPromises = resultsEvent.map(async (resultEvent) => {
    const resultsEventImgsPromises = resultEvent.resultsEventImgs.map(
      async (resultsEventImg) => {
        const imgref = ref(storage, resultsEventImg.resultsEventImgUrl);
        const url = await getDownloadURL(imgref);

        resultsEventImg.resultsEventImgUrl = url;
        return resultsEventImg;
      }
    );

    const resultsEventImgResolved = await Promise.all(resultsEventImgsPromises);
    resultsEvent.ResultsEventImg = resultsEventImgResolved;

    return resultsEvent;
  });

  const resultsEventResolved = await Promise.all(resultsEventPromises);

  return res.status(200).json({
    status: 'success',
    results: resultsEvent.length,
    resultsEvent: resultsEventResolved,
  });
});

exports.create = catchAsync(async (req, res, next) => {
  const { title, typeEvent, important } = req.body;

  const resultsEvent = await ResultsEvent.create({
    title,
    typeEvent,
    important,
  });

  const resultsEventImgsPromises = req.files.map(async (file) => {
    const imgRef = ref(
      storage,
      `resultsEventImg/${Date.now()}-${file.originalname}`
    );

    const imgUploaded = await uploadBytes(imgRef, file.buffer);

    return await ResultsEventImg.create({
      resultsEventId: resultsEvent.id,
      resultsEventImgUrl: imgUploaded.metadata.fullPath,
    });
  });

  await Promise.all(resultsEventImgsPromises);

  return res.status(201).json({
    status: 'Success',
    message: 'resultsEvent created successfully',
    resultsEvent,
  });
});

exports.findOne = catchAsync(async (req, res, next) => {
  const { resultsEvent } = req;

  return res.status(200).json({
    status: 'success',
    resultsEvent,
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const { resultsEvent } = req;
  const { title, typeEvent, important } = req.body;

  await resultsEvent.update({
    title,
    typeEvent,
    important,
  });

  return res.status(200).json({
    status: 'success',
    message: 'the resultsEvent has been updated',
    resultsEvent,
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const { resultsEvent } = req;

  await resultsEvent.update({ status: 'disabled' });

  return res.status(200).json({
    status: 'success',
    message: 'the resultsEvent has been delete',
    resultsEvent,
  });
});
