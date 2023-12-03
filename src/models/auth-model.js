const mongoose = require('mongoose')


const authSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add username']
    },
    email: {
        type: String,
        required: [true, 'Please add email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add password']
    },
    mobile: {
        type: Number,
        required: [false, 'Please add mobile']
    },
    profile: {
        type: String,
        required: false
    },
    blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blogs'
    }],
    savedBlogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blogs'
    }],
    followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
}, { timestamps: true })

module.exports = mongoose.model('User', authSchema)



// const authSchema = mongoose.Schema({
//     username: {
//         type: String,
//         required: [true, 'Please add username']
//     },
//     email: {
//         type: String,
//         required: [true, 'Please add email'],
//         unique: true
//     },
//     password: {
//         type: String,
//         required: [true, 'Please add password']
//     },
// }, { timestamps: true });

// module.exports = mongoose.model('Auth', authSchema)