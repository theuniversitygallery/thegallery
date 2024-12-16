const jwt = require('jsonwebtoken');
require('dotenv').config();

const  verifyJWT = (req, res, next) => {
        const tokenFromCookies = req.cookies.loginTokenJwt
    
        const authHeader = req.headers.authorization || req.header.AuthHeader;
        if(!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
        const tokenFromHeader = authHeader && authHeader.split(' ')[1];
        
        // const token = tokenFromHeader || tokenFromCookies;
        const token = tokenFromHeader || tokenFromCookies;

        if (!token) return res.sendStatus(401);
        console.log(authHeader); // Bearer token
        
        jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
            (err, decoded) => {
                if (err) return res.sendStatus(403); //invalid token
                req.user = decoded.userInfo.citizenName;
                req.citizenID = decoded.userInfo.citizenID;
                req.roles = decoded.userInfo.roles;
                next();
            }
    );
}


module.exports = verifyJWT