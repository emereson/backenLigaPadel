const express = require('express');

const calendaryController = require('../controllers/calendary.controller');
const calendaryMiddleware = require('../middlewares/calendary.middleware');
const { upload } = require('../utils/multer');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/important', calendaryController.findAllImportant);
router.get('/liga', calendaryController.findAllLiga);
router.get('/torneo', calendaryController.findAllTorneo);
router.get('/americano', calendaryController.findAllAmericano);

router.use(authMiddleware.protect);

router.post(
  '/',
  upload.array('calendaryImgUrl', 10),
  calendaryController.create
);

router
  .route('/:id')
  .get(calendaryMiddleware.validExistCalendary, calendaryController.findOne)
  .patch(calendaryMiddleware.validExistCalendary, calendaryController.update)
  .delete(calendaryMiddleware.validExistCalendary, calendaryController.delete);

module.exports = router;
