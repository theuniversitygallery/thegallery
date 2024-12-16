const express = require('express');
const router = express();
const { query } = require('express-validator');
const applyIntent = require('../../controllers/applyIntentController')
const multer =  require("multer");
const uploadIntent =  multer({dest:'../../intentBox/'})

// only POST route is need . this post routw will let user submit application
router.route('^/$|/apply(.html)?/')
    .post(
        query("filter")
        .notEmpty()
        .withMessage("upload your internLetter"), 
        uploadIntent.single('intentApply'),
        applyIntent
    )


module.exports = router;