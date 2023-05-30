const { body, validationResult } = require('express-validator');

const validFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

exports.createUser = [
  body('name')
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isString()
    .withMessage('Must be text type'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 4 })
    .withMessage('Password must be at least 8 characters long'),
  validFields,
];

exports.updateUser = [
  body('name')
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isString()
    .withMessage('Must be text type'),
  body('email')
    .notEmpty()
    .withMessage('Email field cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  validFields,
];

exports.loginUser = [
  body('email')
    .notEmpty()
    .withMessage('Email field cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password').notEmpty().withMessage('The field password cannot be empty'),
  validFields,
];
