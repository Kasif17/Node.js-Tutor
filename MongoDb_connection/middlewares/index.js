const fs = require('fs');

function log_Req_Res(filename){
    return(req,res,next)=>{
        fs.appendFile(
            filename,
            `\n${Date.now()}:${req.ip} : ${req.mathod} : ${req.path}\n`,
            (err,data)=>{
                next();
            }
        )
    }
}

module.exports = {
    log_Req_Res,
}