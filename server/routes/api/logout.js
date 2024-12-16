const express = require('express');
const router = express();

const handleLogOut = require("../../controllers/logOutController")

router.route("^/$|/logout(.html)?/")
        .get(handleLogOut);

module.exports = router;