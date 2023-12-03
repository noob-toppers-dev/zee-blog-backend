const asyncHandler = require('express-async-handler');
const Blogs = require('../../models/blogs-model');


const likeBlogAPI = asyncHandler(async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const userId = req.body.userId;

        const blog = await Blogs.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        if (blog.likes.includes(userId)) {
            return res.status(400).json({ message: 'You have already liked this blog' });
        }

        blog.likes.push(userId);
        await blog.save();

        res.status(200).json({ message: 'Blog liked successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});







// dislike API

const disLikeBlogAPI = asyncHandler(async (req, res) => {
    try {
        const blogId = req.params.blogId;
        const userId = req.body.userId;

        const blog = await Blogs.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        if (blog.likes.includes(userId)) {
            const filteredLikes = blog.likes.filter(likeId => likeId !== null && likeId.toString() !== userId);

            blog.likes = filteredLikes;
            await blog.save();
        } else {
            return res.status(400).json({ message: 'You have not liked this blog' });
        }

        res.status(200).json({ message: 'Blog disliked successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = { likeBlogAPI, disLikeBlogAPI }
