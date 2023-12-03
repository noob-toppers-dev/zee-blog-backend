const Blog = require('../../models/blogs-model');
const asyncHandler = require('express-async-handler')
const User = require('../../models/auth-model');

//create blog api

const createBlog = asyncHandler(async (req, res) => {
    try {
        const blog = await new Blog(req.body);
        if (!blog) {
            return res.status(401).json({ message: "Failed to update user!! or blog not found" })
        }
        blog.save();
        res.status(200).json({ message: 'Blog saved successfully' });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
})


//get all blog api

const getAllBlog = asyncHandler(async (req, res) => {
    try {
        const blogs = await Blog.find({});
        return res.status(200).json(blogs)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

//get single blog
const getBlogById = asyncHandler(async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        return res.status(200).json(blog);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
})

const updateBlog = asyncHandler(async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        if (!blog) {
            return res.status(401).json({ message: 'Blog not found!' })
        }
        await Blog.findByIdAndUpdate(req.params.id, { $set: req.body });
        return res.status(200).json({ message: 'Blog successfully Updated' });
    } catch (error) {
        return res.status(500).json({ message: error.message })

    }
})
const deleteBlog = asyncHandler(async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id)
        if (!blog) {
            return res.status(401).json({ message: 'Blog not found!' })
        }
        await blog.delete();
        return res.status(200).json({ message: 'Blog successfully Deleted' });
    } catch (error) {
        return res.status(500).json({ message: error.message })

    }
})
const savedBlogAPI = asyncHandler(async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId)
        if (!blog) {
            return res.status(401).json({ message: 'Blog not found!' })
        }
        //  find user by userId which is get from body
        const user = await User.findById(req.body.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.savedBlogs.includes(blogId)) {
            user.savedBlogs.push(blogId);
            await user.save();
            return res.status(200).json({ message: 'Blog saved successfully' });
        } else {
            return res.status(400).json({ error: 'Blog already saved by the user' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })

    }
})

//get saved blog by user id
const getSavedBlogByUserIdAPI = asyncHandler(async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('savedBlogs');
        if (!user) {
            return res.status(404).json({ status: false, mesage: 'User not found' });
        }

        const savedBlogs = user.savedBlogs;

        return res.status(200).json({ status: true, savedBlogs: savedBlogs });

    } catch (error) {
        return res.status(500).json({ status: false, message: error.message })
    }
})






module.exports = { createBlog, getAllBlog, getBlogById, updateBlog, deleteBlog, savedBlogAPI, getSavedBlogByUserIdAPI }