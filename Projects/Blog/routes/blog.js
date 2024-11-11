const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Blog = require('../models/blog');
const Comment = require('../models/comment')
const router = Router();

// Ensure that the 'uploads' directory exists
const uploadPath = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

router.get('/add-new', (req, res) => {
    return res.render('addBlog', {
        user: req.user
    });
});

router.get('/:id', async(req,res)=>{
    const blog = await Blog.findById(req.params.id).populate("createBy");
    const comments = await Comment.find({blogId:req.params.id}).populate("createBy");
    return res.render('Blog',{
        user:req.user,
        blog,
        comments,
    })
});

router.post('/comment/:blogId',async(req,res)=>{
    await Comment.create({
        content: req.body.content,
        blogId: req.params.blogId,
        createBy: req.user._id
    })
    return res.redirect(`/blog/${req.params.blogId}`)
})

router.delete('/:id', async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) {
            return res.status(404).render('Blog', { message: 'Blog post not found' });
        }
        return res.status(200).render('Blog', { message: 'Blog post deleted successfully' });
    } catch (error) {
        console.error('Error deleting blog post:', error);
        return res.status(500).render('Blog', { message: 'Internal server error' });
    }
});


router.post('/', upload.single('coverImage'), async (req, res) => {
    if (!req.user) {
        return res.status(401).send('Unauthorized: No user information found');
    }

    try {
        const { title, body } = req.body;
        const blog = await Blog.create({
            body,
            title,
            createBy: req.user._id,
            coverImgURL: `/uploads/${req.file.filename}`
        });
        return res.redirect(`/blog/${blog._id}`);
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
