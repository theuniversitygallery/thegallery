const express = require('express');
const router = express();

const handleRefreshToken = require("../../controllers/refreshTokenCotroller")

router.route("^/$|/refresh(.html)?/")
        .get(handleRefreshToken);

module.exports = router;