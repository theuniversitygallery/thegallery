// DataBase Connection
/*
now you can log in and it will send access token to the client.
use the accesstoken to route all the requests to the server
*/
const Citizen = require("../models/citizenModel");
const Location = require("../models/locationModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { matchedData,validationResult } = require("express-validator");
const roleMap = require("../config/roles_list");
// check if citizenName already exist 
// check if cookies if last page visit  is set, if set redirect use to the page .

const registerNewUser = async (req, res)=>{
    
    let result = validationResult(req)
    if(!result.isEmpty()) return res.sendStatus(400).send({errors: result.array() })
    
    const data = matchedData(req);
    const {citizenName,citizenEmail,passCode,confirmPwd,latitude,longitude,status, accuracy} = data;


    try {  

        // check if status is company or student
        if (!(status === "company" || status === "student")) {
            return res.status(409).json({ message: 'Invalid status' });
        }

        // check if citizen name is duplicated
        const duplicate = await Citizen.findOne({citizenName: citizenName}).exec();
        if (duplicate) {
            return res.status(409).json({ message: 'Citizen name already exists' });
        } 
        
        let roles = "";
        //set user roles
        if(status === "company"){
             roles = "Editor";
        }else {
             roles = "Basic";
        }

        // const roles = 1997; 
        const role = roleMap[roles];
        
        if (!role) {
            return res.status(400).json({ message: 'invalid user role' });
        }
        
        // check passCode and hash it using bycrt
        if (passCode !== confirmPwd) {
            return res.status(401).json({ message: 'Passcode does not match' });
        }

         // Create a new location
         const location = new Location({
            location: {
                type: 'Point',
                coordinates: [longitude, latitude]
            },
            accuracy: accuracy // Assuming accuracy is passed in the request
        });
        // Save the location to the database
        const savedLocation = await location.save();

         // Hash the password        
        const hashedPwd = await bcrypt.hash(passCode,10);

        /// Create a new citizen and reference the saved location
        const citizen = await Citizen.create({
                citizenName, 
                citizenEmail,
                hashedPwd,  
                location: savedLocation._id, // Reference the saved location
                status,
                role
        }); 
        // if the credentials have been saved to DB, the start session
        //JWT tokens
        const rolesArray = Object.values(citizen.role);
        const accessToken = jwt.sign(
            {
                userInfo: {
                    citizenName: citizen.citizenName,
                    citizenID: citizen._id,
                    roles: rolesArray
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '16m' } // Access token expiration
        );

        const refreshToken = jwt.sign(
            { citizenName: citizen.citizenName },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' } // Refresh token expiration
        );

        // Save refresh token with the current user
        citizen.refreshToken = refreshToken;
        await citizen.save();

        // Send the access token in the response
        res.status(201).json({ accessToken });

    }catch(err){
        console.error(err)
        res.status(401).json({ 'message': 'content was not uploaded' });    
    }
} 

module.exports = {registerNewUser};