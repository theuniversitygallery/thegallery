const validateCookies = (req,res,next) =>{
    const {cookies}= req

    if(cookies && "lastPageVist" in cookies){
        console.log(`the last page the user visited was ${cookies.lastPageVisit}`)
    }
    next();
}

module.exports = validateCookies;