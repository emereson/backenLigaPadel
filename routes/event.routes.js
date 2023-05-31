const express = require('express');

const { upload } = require('../utils/multer');

const eventController = require('../controllers/event.controller');
const eventMiddleware = require('../middlewares/event.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const createOderController = require('../controllers/mercadoPago.controller');

const router = express.Router();

router.get('/', eventController.findAll);
router.get('/liga', eventController.findAllLiga);
router.get('/americano', eventController.findAllAmericano);
router.get('/torneo', eventController.findAllTorneo);
router.get('/:id', eventMiddleware.validExistEvent, eventController.findOne);

router.post('/:id/createOrder', createOderController.createOrder);
router.post('/webhook', createOderController.webhook);

router.use(authMiddleware.protect);
router.post('/', upload.single('coverImg'), eventController.create);
router
  .route('/:id')
  .patch(eventMiddleware.validExistEvent, eventController.update)
  .delete(eventMiddleware.validExistEvent, eventController.delete);

module.exports = router;
