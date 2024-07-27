const express = require('express');
const path = require('path');
const useRoute = require('./routes/user')
const app = express();

const PORT = 5001;


app.set('view engine','ejs');
app.set('views',path.resolve('./views'))

app.get('/',(req,res)=>{
  return res.render('home');
})

app.use('/user',useRoute);

app.listen(PORT,(req,res)=>{
    console.log(`server is running on port ${PORT}`);
})