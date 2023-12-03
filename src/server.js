const express = require('express');//1

const colors = require('colors')//2
require('dotenv').config();//3
const connectDB = require('./config/db') //

const cors = require('cors');//4
const PORT = process.env.PORT || 8001;//5
const app = express();//6



const { errorHandler } = require('./middleware/errorMiddleware');

connectDB(); // connect to mongo database

app.use(cors());//7

app.use(express.json());//8

app.use(express.urlencoded({ extended: false })); //9

app.use('/api/auth', require('./routes/auth/auth-route'));

app.use('/api/blogs', require('./routes/blogs/blog-route'));
app.use('/api', require('./routes/images/image-route'));


app.use('/api/comments', require('./routes/comments/comment-route'))

app.use('/api/likes', require('./routes/like-unlike/like-unlike-route'));
app.use('/api/followers', require('./routes/follow/follow-route'));

app.use('/api/products', require('./routes/products/products-route'));


app.use(errorHandler)

app.listen(PORT, () => {
    console.log(` Server is running on PORT http://localhost:${PORT}`.red)
})//9