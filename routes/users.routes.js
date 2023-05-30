const express = require('express');

const authMiddleware = require('../middlewares/auth.middleware');
const validationMiddleware = require('../middlewares/validations.middleware');
const userMiddleware = require('../middlewares/user.middleware');

const userController = require('../controllers/user.controller');

const router = express.Router();

router.use(authMiddleware.protect);

router
  .use('/:id', userMiddleware.validExistUse, authMiddleware.protectAccountOwner)
  .route('/:id')
  .patch(validationMiddleware.updateUser, userController.update)
  .delete(userController.delete);

router.get('/orders', userController.findAll);
router.get('/orders/:id', userMiddleware.validExistUse, userController.findOne);

module.exports = router;
