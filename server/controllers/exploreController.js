const { signedCookie } = require("cookie-parser");
const express = require("express");
const {validationResult,matchedData} = require("express-validator");
// const locationController = require('./locationController');

const router = express();


const getAllPost = (req, res) => {

    // req.session.user? res.status(200).send(req.session.user) : res.status(401).send({mgs:"not set or bad gate way"})

    // const result = validationResult(req);
    // const dataMatch = matchedData(req); console.log(dataMatch);
    // res.cookie("currentPage" , "explorePage", {maxAge: 6000 *24, signed:true});
    // const {query:{log, mag}} = req; 
    // req.query object will access user location if the user allow it location. it can be their longitude and their magnitude
    // if (log && mag) {
    //     // Filter internships based on the user's location
    //     findInternshipsByLocation(log,mag)
    //         .then(internships => {
    //             res.send(internships);
    //         })
    //         .catch(error => {
    //             res.status(500).send(error);
    //         });
    // } else {
    //     // tell the user to allow location for better experience while we provide global result
    //     res.send('Please specify your location to see relevant internships.');
    // }

    // locationController.getNearbyLocations;
    // res.status(200).json(data.content);
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