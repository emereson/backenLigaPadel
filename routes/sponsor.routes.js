const express = require('express');

const { upload } = require('../utils/multer');

const sponsorController = require('../controllers/sponsor.controller');
const sponsorMiddleware = require('../middlewares/sponsor.middleware');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', sponsorController.findAll);

router.use(authMiddleware.protect);
router.post('/', upload.single('sponsorImg'), sponsorController.create);

router
  .route('/:id')
  .get(sponsorMiddleware.validExistSponsor, sponsorController.findOne)
  .patch(sponsorMiddleware.validExistSponsor, sponsorController.update)
  .delete(sponsorMiddleware.validExistSponsor, sponsorController.delete);

module.exports = router;
