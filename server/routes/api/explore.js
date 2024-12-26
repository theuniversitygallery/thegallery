const express = require('express');
const router = express();
const { query,check } = require('express-validator');
const {getAllPost,getApost } = require('../../controllers/exploreController')
const verifyJWT = require('../../middleware/verifyJWT')

// explore route this will show all the student or company post base on the geo location
router.route('^/$|/explore(.html)?/')
    .get(
        verifyJWT,
        [
            // check('citizenID').notEmpty().withMessage('Citizen ID must not be empty'),
            check('longitude').isNumeric().withMessage('Longitude must be a number'),
            check('latitude').isNumeric().withMessage('Latitude must be a number')
        ],
        getAllPost
    )
// search intent by location or interest
router.route('/explore/:postId')
    .get(getApost);

module.exports = router;