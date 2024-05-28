const http = require('http');
const fs = require('fs')
const server = http.createServer((req,res)=>{
    const log = `${new Date().toLocaleString()} ${req.url} to recieved Request\n`;
    fs.appendFile('log.txt',log, (err,result)=>{
        console.log(log);
        switch(req.url){
            case '/': res.end('Hello kasif I am server')
            break;
            case '/about' : res.end('My name is Mohd KAsif Khan')
            break;
            default: res.end('Server is 404')
    }
})
    
})

server.listen(8000,()=>{
    console.log('Server is running');
})
