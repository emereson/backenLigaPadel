const express = require('express');

const resultsEventController = require('../controllers/resultsEvent.controller');
const resultsEventMiddleware = require('../middlewares/resultsEvent.middleware');
const { upload } = require('../utils/multer');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/important', resultsEventController.findAllImportant);
router.get('/liga', resultsEventController.findAllLiga);
router.get('/torneo', resultsEventController.findAllTorneo);
router.get('/americano', resultsEventController.findAllAmericano);

router.use(authMiddleware.protect);

router.post(
  '/',
  upload.array('resultsEventImgUrl', 10),
  resultsEventController.create
);

router
  .route('/:id')
  .get(
    resultsEventMiddleware.validExistResultsEvent,
    resultsEventController.findOne
  )
  .patch(
    resultsEventMiddleware.validExistResultsEvent,
    resultsEventController.update
  )
  .delete(
    resultsEventMiddleware.validExistResultsEvent,
    resultsEventController.delete
  );

module.exports = router;
