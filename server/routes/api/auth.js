const express = require('express');
const router = express();

const {body} = require("express-validator"); 
const loginController = require("./../../controllers/authController")

router.route("^/$|/auth(.html)?/")
        .post([
            body("citizenName").notEmpty().withMessage("username need to be set"),
            body("passCode").notEmpty().withMessage("passcode is not correct"),
            body("latitude").notEmpty().isNumeric().withMessage("latitude is not set"),
            body("longitude").notEmpty().isNumeric().withMessage("longitude"),
            body("accuracy").notEmpty().isNumeric().withMessage("accuracry is not set") 
        ],loginController);

module.exports = router;