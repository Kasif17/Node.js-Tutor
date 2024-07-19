const express = require('express');
const path = require('path')
const multer  = require('multer')
const app = express();
const PORT = 5001;

app.set("view engine","ejs");
app.set('views', path.resolve('./views'))

const storage = multer.diskStorage({
    destination: function (req, file, cb){
      return cb(null,'./uploads')
    },
    filename: function (req, file, cb){
      return cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const uplaod = multer({storage})

app.use(express.urlencoded({ extended:false}));

app.get('/',(req,res)=>{
   return res.render("homepage")
})

app.post('/uplaod', uplaod.single('fileImgae'),(req,res)=>{

    console.log(req.body);
    console.log(req.file);

    return res.redirect('/')
})

app.listen(PORT,(req,res)=>{
    console.log(`server is running on port ${PORT}`)
})






