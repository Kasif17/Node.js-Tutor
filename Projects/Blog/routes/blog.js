const {Router} = require('express')
const multer = require('multer');
const path = require('path')
const Blog = require('../models/blog')
const router = Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb){
        const uploadPath = path.resolve('../public/uplaods');
      return cb(null,uploadPath)
    },
    filename: function (req, file, cb){
      return cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const uplaod = multer({storage})
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         const uploadPath = path.join(__dirname, '../public/uplaods');
//         cb(null, uploadPath);
//     },
//     filename: function (req, file, cb) {
//       const fileName = `${Date.now()}-${file.originalname}`;
//       cb(null,fileName);
//     }
//   })
//   const upload = multer({ storage: storage })

router.get('/add-new',(req,res)=>{
  
    return res.render('addBlog',{
        user:req.user
    });
})

router.post('/', uplaod.single('coverImage'), async(req, res) => { 
    
    try {
        const {title,body} = req.body;
        const blog = await Blog.create({
            body,
            title,
            createBy: req.user._id,
            coverImgURL:`/uploads/${req.user.filename}`
        })
        res.redirect('/');
    } catch (err) {
        if (err instanceof multer.MulterError) {
            console.error('Multer error:', err);
            res.status(400).send('File upload error');
        } else {
            console.error('Unexpected error:', err);
            res.status(500).send('Internal server error');
        }
    }
});


module.exports = router;