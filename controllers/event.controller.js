const catchAsync = require('../utils/catchAsync');
const Event = require('../models/event.model');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { storage } = require('../utils/firebase');

exports.findAll = catchAsync(async (req, res, next) => {
  const events = await Event.findAll({
    where: {
      status: 'active',
    },
  });

  const eventsPromises = events.map(async (event) => {
    const imgRef = ref(storage, event.coverImg);
    const url = await getDownloadURL(imgRef);

    event.coverImg = url;
    return events;
  });

  const eventResolved = await Promise.all(eventsPromises);

  return res.status(200).json({
    status: 'success',
    results: events.length,
    events: eventResolved,
  });
});

exports.findAllLiga = catchAsync(async (req, res, next) => {
  const events = await Event.findAll({
    where: {
      typeEvent: 'Liga',
    },
  });

  const eventsPromises = events.map(async (event) => {
    const imgRef = ref(storage, event.coverImg);
    const url = await getDownloadURL(imgRef);

    event.coverImg = url;
    return event;
  });

  const eventResolved = await Promise.all(eventsPromises);

  return res.status(200).json({
    status: 'success',
    results: events.length,
    events: eventResolved,
  });
});

exports.findAllAmericano = catchAsync(async (req, res, next) => {
  const events = await Event.findAll({
    where: {
      typeEvent: 'Americano',
    },
  });

  const eventsPromises = events.map(async (event) => {
    const imgRef = ref(storage, event.coverImg);
    const url = await getDownloadURL(imgRef);

    event.coverImg = url;
    return event;
  });

  const eventResolved = await Promise.all(eventsPromises);

  return res.status(200).json({
    status: 'success',
    results: events.length,
    events: eventResolved,
  });
});

exports.findAllTorneo = catchAsync(async (req, res, next) => {
  const events = await Event.findAll({
    where: {
      typeEvent: 'Torneo',
    },
  });

  const eventsPromises = events.map(async (event) => {
    const imgRef = ref(storage, event.coverImg);
    const url = await getDownloadURL(imgRef);

    event.coverImg = url;
    return event;
  });

  const eventResolved = await Promise.all(eventsPromises);

  return res.status(200).json({
    status: 'success',
    results: events.length,
    events: eventResolved,
  });
});

exports.create = catchAsync(async (req, res, next) => {
  const {
    name,
    subTitle,
    place,
    typeEvent,
    description,
    rules,
    startDateEvent,
    endDateEvent,
    price,
    generalConditions,
    requirements,
    changesCancellations,
    rutPlayerLocked1,
    rutPlayerLocked2,
    rutPlayerLocked3,
    rutPlayerLocked4,
    rutPlayerLocked5,
    damasA,
    damasB,
    damasC,
    damasD,
    maculina1ra,
    maculina2da,
    maculina3ra,
    maculina4ta,
    maculina5ta,
    maculina6ta,
    mixta,
    coupon1,
    discount1,
    coupon2,
    discount2,
  } = req.body;

  const imgRef = ref(storage, `event/${Date.now()}-${req.file.originalname}`);

  const imgUploaded = await uploadBytes(imgRef, req.file.buffer);

  const event = await Event.create({
    name,
    subTitle,
    place,
    typeEvent,
    description,
    rules,
    startDateEvent,
    endDateEvent,
    price,
    generalConditions,
    requirements,
    changesCancellations,
    rutPlayerLocked1,
    rutPlayerLocked2,
    rutPlayerLocked3,
    rutPlayerLocked4,
    rutPlayerLocked5,
    damasA,
    damasB,
    damasC,
    damasD,
    maculina1ra,
    maculina2da,
    maculina3ra,
    maculina4ta,
    maculina5ta,
    maculina6ta,
    mixta,
    coupon1,
    discount1,
    coupon2,
    discount2,
    coverImg: imgUploaded.metadata.fullPath,
  });

  return res.status(201).json({
    status: 'Success',
    message: 'event created successfully',
    event,
  });
});

exports.findOne = catchAsync(async (req, res, next) => {
  const { event } = req;

  const imgRef = ref(storage, event.coverImg);
  const url = await getDownloadURL(imgRef);

  event.coverImg = url;

  return res.status(200).json({
    status: 'success',
    event,
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const { event } = req;
  const {
    name,
    subTitle,
    place,
    typeEvent,
    description,
    rules,
    startDateEvent,
    endDateEvent,
    price,
    generalConditions,
    requirements,
    changesCancellations,
    rutPlayerLocked1,
    rutPlayerLocked2,
    rutPlayerLocked3,
    rutPlayerLocked4,
    rutPlayerLocked5,
    damasA,
    damasB,
    damasC,
    damasD,
    maculina1ra,
    maculina2da,
    maculina3ra,
    maculina4ta,
    maculina5ta,
    maculina6ta,
    mixta,
    coupon1,
    discount1,
    coupon2,
    discount2,
    status,
  } = req.body;

  await event.update({
    name,
    subTitle,
    place,
    typeEvent,
    description,
    rules,
    startDateEvent,
    endDateEvent,
    price,
    generalConditions,
    requirements,
    changesCancellations,
    rutPlayerLocked1,
    rutPlayerLocked2,
    rutPlayerLocked3,
    rutPlayerLocked4,
    rutPlayerLocked5,
    damasA,
    damasB,
    damasC,
    damasD,
    maculina1ra,
    maculina2da,
    maculina3ra,
    maculina4ta,
    maculina5ta,
    maculina6ta,
    mixta,
    coupon1,
    discount1,
    coupon2,
    discount2,
    status,
  });

  return res.status(200).json({
    status: 'success',
    message: 'the event has been updated',
  });
});

exports.delete = catchAsync(async (req, res, next) => {
  const { event } = req;

  await event.destroy();

  return res.status(200).json({
    status: 'success',
    message: 'the event has been delete',
    event,
  });
});
