const { body, validationResult } = require('express-validator');

const mongoose = require('mongoose');

const getAllContent = [
    // Validation middleware
    body('citizenID').isString().notEmpty().trim().escape(),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
      }
]
module.exports = getAllContent;