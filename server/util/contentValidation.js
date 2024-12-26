const { body, validationResult } = require('express-validator');

const mongoose = require('mongoose');

const validateContent = [
  body('citizenID').custom(value => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      throw new Error('CitizenID must be a valid MongoDB ObjectId');
    }
    return true;
  }),
  body('title').isString().withMessage('Title must be a string'),
  body('desc').isString().withMessage('Description must be a string'),
  body('img').isURL().withMessage('Image must be a valid URL'),
  body('color').isHexColor().withMessage('Color must be a valid hex color'),
  body('tags').isArray().withMessage('Tags must be an array'),
  body('category').optional().isString().withMessage('Category must be a string'),
  // body('ipAddress').optional().isString().withMessage('IP Address must be a string'),
  body('location').custom(value => {
    const { longitude, latitude } = value;
    if (typeof longitude !== 'number' || longitude < -180 || longitude > 180) {
      throw new Error('Longitude must be a valid number between -180 and 180');
    }
    if (typeof latitude !== 'number' || latitude < -90 || latitude > 90) {
      throw new Error('Latitude must be a valid number between -90 and 90');
    }
    return true;
  }),
  body("accuracy").notEmpty().isNumeric().withMessage("accuracry is not set"),
  body('comments').optional().isArray().withMessage('Comments must be an array'),
  body('likes').optional().custom(value => {
    if (!Array.isArray(value)) {
      throw new Error('Likes must be an array');
    }
    value.forEach(id => {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Each like must be a valid MongoDB ObjectID');
      }
    });
    return true;
  }),
  body('status').optional().isIn(['active', 'archived', 'deleted']).withMessage('Status must be one of active, archived, or deleted'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateContentUpdate = [
  body('title').isString().withMessage('Title must be a string'),
  body('desc').isString().withMessage('Description must be a string'),
  body('img').isURL().withMessage('Image must be a valid URL'),
  body('color').isHexColor().withMessage('Color must be a valid hex color'),
  body('tags').isArray().withMessage('Tags must be an array'),
  body('category').optional().isString().withMessage('Category must be a string'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
]
module.exports = {validateContent,validateContentUpdate };
