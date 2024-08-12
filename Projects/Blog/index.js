const express = require('express');
const path = require('path');
const mongoose = require('mongoose')
const cookiesParser = require('cookie-parser')
const useRoute = require('./routes/user');
const Blog = require('./models/blog')
const userRouteBlog = require('./routes/blog')
const { checkForAuthentication } = require('./middleware/authentication');



const app = express();
const PORT = 5001;

mongoose.connect('mongodb+srv://developer786kasif:9794975553@cluster0.wqbnhut.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(e=>{
  console.log('DB conneted Sucessfully');
}).catch('Db not connected')

app.set('view engine','ejs');
app.set('views',path.resolve('./views'));
app.use(express.urlencoded({ extended: true }));
app.use(cookiesParser());
app.use(checkForAuthentication('token'))
app.use(express.static(path.resolve('./public')))

app.get('/', async(req,res)=>{
  const AllBlogs = await Blog.find({})
  return res.render('home',{
    user:req.user,
    blogs:AllBlogs
  });
})

app.use('/user',useRoute);
app.use('/blog',userRouteBlog)

app.listen(PORT,(req,res)=>{
    console.log(`server is running on port ${PORT}`);
})