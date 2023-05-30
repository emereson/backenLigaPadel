const express = require('express');

const inscriptionController = require('../controllers/inscription.controller');
const inscriptionMiddleware = require('../middlewares/inscription.middleware');
const eventMiddleware = require('../middlewares/event.middleware');
const { upload } = require('../utils/multer');

const router = express.Router();

router.get('/', inscriptionController.findAll);

router.get('/event/:id', inscriptionController.findAllByEvent);

router
  .route('/:id')
  .post(
    upload.single('playerImg'),
    eventMiddleware.validExistEvent,
    inscriptionController.create
  )
  .get(
    inscriptionMiddleware.validExistInscription,
    inscriptionController.findOne
  )
  .patch(
    upload.single('playerImg'),
    inscriptionMiddleware.validExistInscription,
    inscriptionController.update
  )
  .delete(
    inscriptionMiddleware.validExistInscription,
    inscriptionController.delete
  );

module.exports = router;
