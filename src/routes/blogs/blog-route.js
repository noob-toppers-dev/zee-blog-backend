const express = require('express')
const router = express.Router();
const { authMiddleware } = require('../../middleware/authMiddleware');
const { createBlog, getAllBlog, getBlogById, updateBlog, deleteBlog, getSavedBlogByUserIdAPI, savedBlogAPI } = require('../../controllers/blogs/blogs-controller');



router.post('/create-blog', authMiddleware, createBlog);
router.get('/get-all-blog', getAllBlog);
router.get('/get-single-blog/:id', authMiddleware, getBlogById);
router.put('/update-blog/:id', authMiddleware, updateBlog);
router.delete('/delete-blog/:id', authMiddleware, deleteBlog);
router.post('/saved-blog/:blogId', authMiddleware, savedBlogAPI);
router.get('/get-saved-blog/:userId', getSavedBlogByUserIdAPI);

module.exports = router;
