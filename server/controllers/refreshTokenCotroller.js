const Citizen = require("../models/citizenModel");
const jwt = require('jsonwebtoken')

const handleRefreshToken = async (req,res) => {
    const cookies = req.cookies;
    if (!cookies?.loginTokenJwt) return res.sendStatus(401); // unauthorize
    const refreshToken = cookies.loginTokenJwt;
    
    const foundUser = await Citizen.findOne({refreshToken : refreshToken}).exec();
    if (!foundUser) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.citizenName !== decoded.citizenName) return res.sendStatus(403);
            const roles = Object.values(foundUser.role);
            const accessToken = jwt.sign(
                {
                     "userInfo":{
                        "citizenName": decoded.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '16m' }
            );
            res.json({ accessToken })
        }
    );
}

module.exports = handleRefreshToken;