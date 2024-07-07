const express = require('express');
const userRoute = require('./routes/user')
const {log_Req_Res} = require('./middlewares/index')
const {connectionDB} = require('./connection')

const app = express();
const PORT = 4001
 
connectionDB('mongodb+srv://developer786kasif:9794975553@cluster0.ngckuqy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
    console.log('Db connnected successfully');
})
.catch()
 

//middleware plugin
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(log_Req_Res('log.txt'));

//Routes
app.use('/api/user',userRoute)

app.listen(PORT,(req,res)=>{
    console.log(`Server is running on port ${PORT}`);
})