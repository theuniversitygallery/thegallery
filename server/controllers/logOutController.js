const Citizen = require("../models/citizenModel");

const handleLogOut = async(req,res) => {
    const cookies = req.cookies;

    if(!cookies?.loginTokenJwt) return res.sendStatus(403)
    const refreshToken = cookies.loginTokenJwt;
    console.log(refreshToken);
    
    // check if refresh token is in the database
    const foundUser = await Citizen.findOne({refreshToken}).exec();
    console.log(foundUser);
    if (!foundUser) {
        res.clearcookie('loginTokenJwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        return res.sendStatus(204);
    }
        // deleting refresh token from db 
        foundUser.refreshToken = null;
        await foundUser.save();
   
        res.clearCookie('loginTokenJwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        res.sendStatus(204)
}

module.exports = handleLogOut;