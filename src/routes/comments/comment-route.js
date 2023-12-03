const express = require('express');
const router = express.Router();
const { addCommentAPI, getAllCommentAPI, getCommentAPI, deleteCommentAPI } = require('../../controllers/comment/comment-controller');
const { authMiddleware } = require('../../middleware/authMiddleware');

router.post('/add-comment', authMiddleware, addCommentAPI);
router.get('/get-all-comment', authMiddleware, getAllCommentAPI);
router.get('/get-comment/:id', authMiddleware, getCommentAPI);
router.delete('/delete-comment/:id', authMiddleware, deleteCommentAPI);


module.exports = router;
