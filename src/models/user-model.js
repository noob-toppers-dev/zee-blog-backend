// // models/user.js
// const mongoose = require('mongoose');

// const userSchema = mongoose.Schema({
//     mobile: {
//         type: Number,
//         required: [false, 'Please add mobile']
//     },
//     profile: {
//         type: String,
//         required: false
//     },
//     blogs: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Blogs'
//     }],
//     savedBlogs: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Blogs'
//     }],
//     followers: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
//     }],
//     following: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User'
//     }],
// }, { timestamps: true });

// module.exports = mongoose.model('User', userSchema)

