const express = require('express');
const router = express();
const register = require("./api/register")
const auth = require("./api/auth")
const content = require("./api/content")
const explore = require("./api/explore")
const apply = require("./api/apply")
const verifyJWT =  require('../middleware/verifyJWT')
const refresh =  require('./api/refresh');
const logout =  require('./api/logout');

router.use(register); //signed up
router.use(auth); // login
router.use(refresh); // refresh token

router.use(verifyJWT); //verify user before entren

router.use(explore);
router.use(content);  // create post   
router.use(apply); // user interested in an application cam apply

router.use(logout); // logout
// router.use(applyPost); this will be for the applying post. 
//  router.use(approvePost); this will be for the applying post. 


module.exports = router;