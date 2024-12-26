const express = require('express');
const router = express();
const   validateRegister  = require('../../util/registerBodyValidate')
const { registerNewUser } = require('../../controllers/registerController');

// using navigator.geolocation

router.route("^/$|/register(.html)?/")
    .post(
        validateRegister, registerNewUser
    )
        

module.exports = router; 