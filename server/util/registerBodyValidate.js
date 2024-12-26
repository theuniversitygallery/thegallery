const { body, validationResult } = require('express-validator');

const mongoose = require('mongoose');

const validateRegister = [
    body("citizenName").notEmpty().withMessage("username need to be set"),
    body("citizenEmail").isEmail().withMessage("email address"),
    body("passCode").notEmpty().withMessage("passCode"),
    body("confirmPwd").notEmpty().withMessage("retype passcode"),
    body("latitude").notEmpty().isNumeric().withMessage("latitude is not set"),
    body("longitude").notEmpty().isNumeric().withMessage("longitude"),
    body("accuracy").notEmpty().isNumeric().withMessage("accuracry is not set"),
    body("status").notEmpty().withMessage("status not set"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        next();
      }
];

module.exports = validateRegister;

