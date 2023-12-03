
const express = require('express');
const { authMiddleware } = require('../../middleware/authMiddleware');
const { likeBlogAPI, disLikeBlogAPI } = require('../../controllers/like-unlike/like-unlike-controller');
const router = express.Router();

router.put('/like-blog/:blogId', authMiddleware, likeBlogAPI);
router.put('/dislike-blog/:blogId', authMiddleware, disLikeBlogAPI);




module.exports = router;