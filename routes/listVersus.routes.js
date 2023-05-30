const express = require('express');

const listVersusController = require('../controllers/listVersus.controller');
const listVersusMiddleware = require('../middlewares/listVersus.middleware');
const { upload } = require('../utils/multer');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/important', listVersusController.findAllImportant);
router.get('/liga', listVersusController.findAllLiga);
router.get('/torneo', listVersusController.findAllTorneo);
router.get('/americano', listVersusController.findAllAmericano);

router.use(authMiddleware.protect);

router.post(
  '/',
  upload.array('listVersusImgUrl', 10),
  listVersusController.create
);

router
  .route('/:id')
  .get(listVersusMiddleware.validExistListVersus, listVersusController.findOne)
  .patch(listVersusMiddleware.validExistListVersus, listVersusController.update)
  .delete(
    listVersusMiddleware.validExistListVersus,
    listVersusController.delete
  );

module.exports = router;
