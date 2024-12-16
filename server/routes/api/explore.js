const express = require('express');
const router = express();
const { query } = require('express-validator');
const {getAllPost,getApost } = require('../../controllers/exploreController')
const verifyJWT = require('../../middleware/verifyJWT')

// explore route this will show all the student or company post base on the geo location
router.route('^/$|/explore(.html)?/')
    .get(
        verifyJWT,
        query("filter")
        .notEmpty()
        .withMessage("must not be empty"),
        getAllPost
    )
// search intent by location or interest
router.route('/explore/:postId')
    .get(getApost);

module.exports = router;