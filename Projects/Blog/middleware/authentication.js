const { verifyToken } = require("../server/authentication");


function checkForAuthentication(cookieName){
    return (req,res,next) =>{
        const tokenCookiesValue =req.cookies[cookieName];
        if(!tokenCookiesValue){
         return   next();
        }

       
        try {
            const userPayload = verifyToken(tokenCookiesValue)
            req.user = userPayload
        } catch (error) {
            
        }
        return next();
    }

}

module.exports={
    checkForAuthentication
}