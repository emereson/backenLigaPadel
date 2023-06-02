const express = require('express');

const datePaymentsController = require('../controllers/datePayments.controller');

const router = express.Router();

router.get('/allDatePayments', datePaymentsController.findAll);
router.get('/oneDatePayments/id', datePaymentsController.findOne);

module.exports = router;
