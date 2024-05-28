const express = require('express')
const app = express();

app.get('/',(req,res)=>{
    res.send("hello this is a Home Page")
})

app.get('/about',(req,res)=>{
    res.send("hello this is the About Page " + "hey my name is " + req.query.name + "my age is" + req.query.age)
})

app.listen(4000,(req,res)=>{
   console.log("server is runnig");
})