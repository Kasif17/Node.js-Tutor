const JWT = require('jsonwebtoken');

const secret = "$uper$superman@123456";

async function createTokenforUser(user){
    const playload = {
        _id : user._id, 
        email : user.email,
        profileImageURL:user.profileImageURL,
        role : user.role,
    }

    const token = JWT.sign(playload,secret);
    return token;
}

function verifyToken(token){
    const playload = JWT.verify(token,secret);
    return playload;
}


module.exports ={
    createTokenforUser,
    verifyToken
}