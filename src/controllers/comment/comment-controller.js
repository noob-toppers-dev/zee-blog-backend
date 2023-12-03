const asyncHandler = require("express-async-handler");
const Comments = require('../../models/comments-model')


const addCommentAPI = asyncHandler(async (req, res) => {
    try {
        const comment = await new Comments(req.body);
        if (comment) {
            comment.save();
        }
        res.status(200).json({ message: "Add comment Successfully!!" })
    } catch (error) {
        res.status(500).json({ err: err.message })
    }

})
const getAllCommentAPI = asyncHandler(async (req, res) => {
    try {
        const comments = await Comments.find({});
        return res.status(200).json(comments)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

})
const getCommentAPI = asyncHandler(async (req, res) => {
    try {
        const comment = await Comments.find({ postId: req.params.id });
        return res.status(200).json(comment)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

})

const deleteCommentAPI = asyncHandler(async (req, res) => {
    try {
        const comment = await Comments.findById(req.params.id)
        if (!comment) {
            return res.status(401).json({ message: 'Comment not found!' })
        }
        await comment.delete();
        return res.status(200).json({ message: 'Comment successfully Deleted' });
    } catch (error) {
        return res.status(500).json({ message: error.message })

    }
})

module.exports = { addCommentAPI, getAllCommentAPI, getCommentAPI, deleteCommentAPI }