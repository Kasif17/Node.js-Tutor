const { Router } = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Blog = require('../models/blog');
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
