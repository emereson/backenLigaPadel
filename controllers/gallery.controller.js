const catchAsync = require('../utils/catchAsync');
const Gallery = require('../models/gallery.model');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { storage } = require('../utils/firebase');
const GalleryImg = require('../models/galleryImg.model');

exports.findAllImportant = catchAsync(async (req, res, next) => {
  const galleries = await Gallery.findAll({
    where: {
      status: 'active',
      important: 'yes',
    },
    include: {
      model: GalleryImg,
    },
  });

  const galleriesPromises = galleries.map(async (gallery) => {
    const galleryImgsPromises = gallery.galleryImgs.map(async (galleryImg) => {
      const imgref = ref(storage, galleryImg.galleryImgUrl);
      const url = await getDownloadURL(imgref);

      galleryImg.galleryImgUrl = url;
      return galleryImg;
    });

    const galleryImgResolved = await Promise.all(galleryImgsPromises);
    gallery.galleryImg = galleryImgResolved;

    return galleries;
  });

  const galleryResolved = await Promise.all(galleriesPromises);

  return res.status(200).json({
    status: 'success',
    results: galleries.length,
    galleries: galleryResolved,
  });
});

exports.findAllLiga = catchAsync(async (req, res, next) => {
  const galleries = await Gallery.findAll({
    where: {
      status: 'active',
      typeEvent: 'Liga',
    },
    include: {
      model: GalleryImg,
    },
  });

  const galleriesPromises = galleries.map(async (gallery) => {
    const galleryImgsPromises = gallery.galleryImgs.map(async (galleryImg) => {
      const imgref = ref(storage, galleryImg.galleryImgUrl);
      const url = await getDownloadURL(imgref);

      galleryImg.galleryImgUrl = url;
      return galleryImg;
    });

    const galleryImgResolved = await Promise.all(galleryImgsPromises);
    gallery.galleryImg = galleryImgResolved;

    return galleries;
  });

  const galleryResolved = await Promise.all(galleriesPromises);

  return res.status(200).json({
    status: 'success',
    results: galleries.length,
    galleries: galleryResolved,
  });
});

exports.findAllTorneo = catchAsync(async (req, res, next) => {
  const galleries = await Gallery.findAll({
    where: {
      status: 'active',
      typeEvent: 'Torneo',
    },
    include: {
      model: GalleryImg,
    },
  });

  const galleriesPromises = galleries.map(async (gallery) => {
    const galleryImgsPromises = gallery.galleryImgs.map(async (galleryImg) => {
      const imgref = ref(storage, galleryImg.galleryImgUrl);
      const url = await getDownloadURL(imgref);

      galleryImg.galleryImgUrl = url;
      return galleryImg;
    });

    const galleryImgResolved = await Promise.all(galleryImgsPromises);
    gallery.galleryImg = galleryImgResolved;

    return galleries;
  });

  const galleryResolved = await Promise.all(galleriesPromises);

  return res.status(200).json({
    status: 'success',
    results: galleries.length,
    galleries: galleryResolved,
  });
});

exports.findAllAmericano = catchAsync(async (req, res, next) => {
  const galleries = await Gallery.findAll({
    where: {
      status: 'active',
      typeEvent: 'Americano',
    },
    include: {
      model: GalleryImg,
    },
  });

  const galleriesPromises = galleries.map(async (gallery) => {
    const galleryImgsPromises = gallery.galleryImgs.map(async (galleryImg) => {
      const imgref = ref(storage, galleryImg.galleryImgUrl);
      const url = await getDownloadURL(imgref);

      galleryImg.galleryImgUrl = url;
      return galleryImg;
    });

    const galleryImgResolved = await Promise.all(galleryImgsPromises);
    gallery.galleryImg = galleryImgResolved;

    return galleries;
  });

  const galleryResolved = await Promise.all(galleriesPromises);

  return res.status(200).json({
    status: 'success',
    results: galleries.length,
    galleries: galleryResolved,
  });
});

exports.create = catchAsync(async (req, res, next) => {
  const { name, typeEvent, important } = req.body;

  const gallery = await Gallery.create({
    name,
    typeEvent,
    important,
  });

  const galleryImgsPromises = req.files.map(async (file) => {
    const imgRef = ref(
      storage,
      `galleryImg/${Date.now()}-${file.originalname}`
    );

    const imgUploaded = await uploadBytes(imgRef, file.buffer);

    return await GalleryImg.create({
      galleryId: gallery.id,
      galleryImgUrl: imgUploaded.metadata.fullPath,
    });
  });

  await Promise.all(galleryImgsPromises);

  return res.status(201).json({
    status: 'Success',
    message: 'gallery created successfully',
    gallery,
  });
});

exports.findOne = catchAsync(async (req, res, next) => {
  const { gallery } = req;

  return res.status(200).json({
    status: 'success',
    gallery,
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const { gallery } = req;
  const { title, typeEvent, important } = req.body;

  await gallery.update({
    title,
    typeEvent,
    important,
  });

  return res.status(200).json({
    status: 'success',
    message: 'the img has been updated',
    gallery,
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const { gallery } = req;

  await gallery.update({ status: 'disabled' });

  return res.status(200).json({
    status: 'success',
    message: 'the img has been delete',
    gallery,
  });
});
