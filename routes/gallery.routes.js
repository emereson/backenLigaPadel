const express = require('express');

const { upload } = require('../utils/multer');

const galleryController = require('../controllers/gallery.controller');
const galleryMiddleware = require('../middlewares/gallery.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/important', galleryController.findAllImportant);
router.get('/liga', galleryController.findAllLiga);
router.get('/torneo', galleryController.findAllTorneo);
router.get('/americano', galleryController.findAllAmericano);

router.use(authMiddleware.protect);

router.post('/', upload.array('galleryImgUrl', 15), galleryController.create);

router
  .route('/:id')
  .get(galleryMiddleware.validExistGallery, galleryController.findOne)
  .patch(galleryMiddleware.validExistGallery, galleryController.update)
  .delete(galleryMiddleware.validExistGallery, galleryController.delete);

module.exports = router;
