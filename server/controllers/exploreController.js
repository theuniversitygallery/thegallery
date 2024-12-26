const { signedCookie } = require("cookie-parser");
const express = require("express");
const {check,validationResult,matchedData} = require("express-validator");
const {findNearbyCitizens}  = require('../controllers/nearbyCitizen');
const jwt = require('jsonwebtoken')

// const { check, validationResult } = require('express-validator');

const getAllPost = async (req, res) => {
    // validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    // get the user id from the AccessToken through the middleware
    const userId = req.userId; 
    const { longitude, latitude } = req.body;   

    if (typeof longitude !== 'number' || typeof latitude !== 'number') {
        return res.status(400).json({ message: 'Invalid coordinates provided' });
    }
    
    try {
        // nearbycitizen
        const nearbyCitizens = await findNearbyCitizens(userId,[longitude,latitude]);
        res.status(200).json(nearbyCitizens);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


const getApost = (req, res)=>{
    const result = validationResult(req)
    const dataMatch = matchedData(req)

    try {
        const {
            params:{postId} 
        } = req;    
        const parseId = parseInt(postId);
        // check if your the param exist or correct format if not 
        // set status code to 400
        if(isNaN(parseId)) res.status(400).send({msg: "Bad request : invalid ID"});
        const findUser = data.explore.find((content) => content.postID === parseId);
        if(!findUser) return res.sendStatus(404);
        return res.json(findUser);
    }catch(err){
        throw(err);
    }
}

module.exports = {
    getAllPost,
    getApost
}