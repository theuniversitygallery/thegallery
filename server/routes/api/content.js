const express = require('express');
const router = express();
const {validateContent,validateContentUpdate} = require("../../util/contentValidation");
const {query,body} = require("express-validator"); 
const verifyJWT = require('../../middleware/verifyJWT');
const {newContent,getAllContent,updateContentByID} = require('../../controllers/contentController');
const verifyRoles = require('../../middleware/verifyRoles');
const ROLES_LIST = require('../../config/roles_list');
// const userContentValidation = require('../../util/userContentValidation');

// explore route this will show all the student or company post base on the geo location
router.route('^/$|/content(.html)?/')
.get(
        verifyJWT,
        getAllContent
    )
    .post(
        //    verifyRoles(ROLES_LIST.Admin,ROLES_LIST.Editor),
        validateContent,
        newContent
    )
    // .patch(deleteContent)
// search intent by location or interest
/*
router.route('^/$|/content(.html)?/:contentId')
    .get(verifyJWT,getContentByID)
    .patch(
    validateContentUpdate,updateContentByID) //update record  
  */    //.delete(verifyRoles(ROLES_LIST.Admin),deletContentByID);
module.exports = router;