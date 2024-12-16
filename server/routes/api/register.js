const express = require('express');
const router = express();

const {body} = require("express-validator"); 
const { registerNewUser } = require('../../controllers/registerController');

// using navigator.geolocation

router.route("^/$|/register(.html)?/")
    .post(
        [
            body("citizenName").notEmpty().withMessage("username need to be set"),
            body("citizenEmail").isEmail().withMessage("email address"),
            body("passCode").notEmpty().withMessage("passCode"),
            body("confirmPwd").notEmpty().withMessage("retype passcode"),
            // body("ipAddress").notEmpty().withMessage("ipAddress is not set"),
            body("latitude").notEmpty().isNumeric().withMessage("latitude is not set"),
            body("longitude").notEmpty().isNumeric().withMessage("longitude"),
            body("accuracy").notEmpty().isNumeric().withMessage("accuracry is not set"),
            body("status").notEmpty().withMessage("status not set")
        ], registerNewUser
    )
        

module.exports = router; 