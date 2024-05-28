const express = require('express');
const fs = require('fs')
const app = express();
const PORT = 4001

//Middleware 
app.use( async(req,res,next)=>{
    await fs.writeFile('./logo.txt', `Date is ${Date.now()} , ${req.method} \n ` ,(err,date)=>{
    });
    next();
})
app.use((req,res,next)=>{
    console.log(`middleware first -----`);
    req.myUsername = 'Anas Shahab'
    next();
})

app.use((req,res,next)=>{
    console.log(`middleware second -----`, req.myUsername);
    return res.send({msg: `Hello Khan its working on Port ${PORT}`})
    next();
})

app.use((req, res, next) => {
    res.status(404).send('Not Found');
});


app.listen(PORT,(req,res)=>{
    console.log(`server is running on PORT ${PORT} `);
})