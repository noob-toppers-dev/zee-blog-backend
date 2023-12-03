const mongoose = require('mongoose');

const commentsSchema = mongoose.Schema({
    // blogs: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Blogs'
    // },
    username: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'User',
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    },
    comments: {
        type: String,
        required: true
    },
    commentDate: {
        type: Date,
        required: true
    },
},
    {
        timestamps: true
    }
)


module.exports = mongoose.model('Comments', commentsSchema)

