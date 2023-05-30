const catchAsync = require('../utils/catchAsync');
const ListVersus = require('../models/listVersus.model');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { storage } = require('../utils/firebase');
const ListVersusImg = require('../models/listVersusImg.model');

exports.findAllImportant = catchAsync(async (req, res, next) => {
  const readyVersus = await ListVersus.findAll({
    where: {
      status: 'active',
      important: 'yes',
    },
    include: {
      model: ListVersusImg,
    },
  });

  const readyVersusPromises = readyVersus.map(async (listVersus) => {
    const readyVersusImgsPromises = listVersus.listVersusImgs.map(
      async (ListVersusImg) => {
        const imgref = ref(storage, ListVersusImg.listVersusImgUrl);
        const url = await getDownloadURL(imgref);

        ListVersusImg.listVersusImgUrl = url;
        return ListVersusImg;
      }
    );

    const listVersusImgResolved = await Promise.all(readyVersusImgsPromises);
    listVersus.ListVersusImg = listVersusImgResolved;

    return readyVersus;
  });

  const listVersusResolved = await Promise.all(readyVersusPromises);

  return res.status(200).json({
    status: 'success',
    results: readyVersus.length,
    readyVersus: listVersusResolved,
  });
});

exports.findAllLiga = catchAsync(async (req, res, next) => {
  const readyVersus = await ListVersus.findAll({
    where: {
      status: 'active',
      typeEvent: 'Liga',
    },
    include: {
      model: ListVersusImg,
    },
  });

  const readyVersusPromises = readyVersus.map(async (listVersus) => {
    const readyVersusImgsPromises = listVersus.listVersusImgs.map(
      async (ListVersusImg) => {
        const imgref = ref(storage, ListVersusImg.listVersusImgUrl);
        const url = await getDownloadURL(imgref);

        ListVersusImg.listVersusImgUrl = url;
        return ListVersusImg;
      }
    );

    const listVersusImgResolved = await Promise.all(readyVersusImgsPromises);
    listVersus.ListVersusImg = listVersusImgResolved;

    return readyVersus;
  });

  const listVersusResolved = await Promise.all(readyVersusPromises);

  return res.status(200).json({
    status: 'success',
    results: readyVersus.length,
    readyVersus: listVersusResolved,
  });
});

exports.findAllTorneo = catchAsync(async (req, res, next) => {
  const readyVersus = await ListVersus.findAll({
    where: {
      status: 'active',
      typeEvent: 'Torneo',
    },
    include: {
      model: ListVersusImg,
    },
  });

  console.log(readyVersus);
  const readyVersusPromises = readyVersus.map(async (listVersus) => {
    const readyVersusImgsPromises = listVersus.listVersusImgs.map(
      async (ListVersusImg) => {
        const imgref = ref(storage, ListVersusImg.listVersusImgUrl);
        const url = await getDownloadURL(imgref);

        ListVersusImg.listVersusImgUrl = url;
        return ListVersusImg;
      }
    );

    const listVersusImgResolved = await Promise.all(readyVersusImgsPromises);
    listVersus.ListVersusImg = listVersusImgResolved;

    return readyVersus;
  });

  const listVersusResolved = await Promise.all(readyVersusPromises);

  return res.status(200).json({
    status: 'success',
    results: readyVersus.length,
    readyVersus: listVersusResolved,
  });
});

exports.findAllAmericano = catchAsync(async (req, res, next) => {
  const readyVersus = await ListVersus.findAll({
    where: {
      status: 'active',
      typeEvent: 'Americano',
    },
    include: {
      model: ListVersusImg,
    },
  });

  console.log(readyVersus);
  const readyVersusPromises = readyVersus.map(async (listVersus) => {
    const readyVersusImgsPromises = listVersus.listVersusImgs.map(
      async (ListVersusImg) => {
        const imgref = ref(storage, ListVersusImg.listVersusImgUrl);
        const url = await getDownloadURL(imgref);

        ListVersusImg.listVersusImgUrl = url;
        return ListVersusImg;
      }
    );

    const listVersusImgResolved = await Promise.all(readyVersusImgsPromises);
    listVersus.ListVersusImg = listVersusImgResolved;

    return readyVersus;
  });

  const listVersusResolved = await Promise.all(readyVersusPromises);

  return res.status(200).json({
    status: 'success',
    results: readyVersus.length,
    readyVersus: listVersusResolved,
  });
});

exports.create = catchAsync(async (req, res, next) => {
  const { title, typeEvent, important } = req.body;

  const listVersus = await ListVersus.create({
    title,
    typeEvent,
    important,
  });

  const listVersusImgsPromises = req.files.map(async (file) => {
    const imgRef = ref(
      storage,
      `listVersusImg/${Date.now()}-${file.originalname}`
    );

    const imgUploaded = await uploadBytes(imgRef, file.buffer);

    return await ListVersusImg.create({
      listVersusId: listVersus.id,
      listVersusImgUrl: imgUploaded.metadata.fullPath,
    });
  });

  await Promise.all(listVersusImgsPromises);

  return res.status(201).json({
    status: 'Success',
    message: 'gallery created successfully',
    listVersus,
  });
});

exports.findOne = catchAsync(async (req, res, next) => {
  const { listVersus } = req;

  return res.status(200).json({
    status: 'success',
    listVersus,
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const { listVersus } = req;
  const { title, typeEvent, important } = req.body;

  await listVersus.update({
    title,
    typeEvent,
    important,
  });

  return res.status(200).json({
    status: 'success',
    message: 'the listVersus has been updated',
    listVersus,
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const { listVersus } = req;

  await listVersus.update({ status: 'disabled' });

  return res.status(200).json({
    status: 'success',
    message: 'the listVersus has been delete',
    listVersus,
  });
});
