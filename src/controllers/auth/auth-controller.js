const asyncHandler = require('express-async-handler');
const User = require('../../models/auth-model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const { json } = require('express');
const randomstring = require('randomstring');
const { transporter, mailOptionResetPassFn, mailOptionContactFn } = require('../../utils/nodemail/config');


const resetPasswordMail = async (username, email) => {
    //nodemailer transporter

    try {
        transporter.sendMail(mailOptionResetPassFn(username, email), (err, info) => {
            if (err) {
                console.log("errr", err.message);
            } else {
                console.log("Mail has been sent on: ", email, info.response)
            }

        })

    } catch (error) {
        res.status(500).json({ message: "Something went wrong while reseting password" })
    }
}


const showAuth = asyncHandler(async (req, res) => {
    const showData = await User.find()
    res.status(200).json(showData)

})


// @description      post data
// @routes           Get /api/register
// Access           PRIVATE

const register = asyncHandler(async (req, res) => {

    // destructuring from req body
    const { username, email, password, profile } = req.body;
    // console.log('register profile', username, password, email)
    try {
        if (!username || !email || !password) {
            res.status(401)
            throw new Error('Please fill all the fields')
        }

        // first check user exist or not
        const userExists = await User.findOne({
            $or: [{ email: email }, { username: username }],
        });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" })
        }
        const hashedPassword = await hashPassword(password);

        const user = { username, email, password: hashedPassword, profile }
        // const newUser = await new User(user);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            profile,
        });
        await newUser.save();
        return res.status(200).json({ message: 'User registered successfully' })
    } catch (error) {
        return res.status(500).json({ message: "Error occured while register user" })
    }

});

// @description      post data
// @routes           Get /api/login
// Access           PRIVATE

const login = asyncHandler(async (req, res) => {
    try {
        const { email, password, username, profile } = req.body;
        //check email, password and username  match

        const user = await User.findOne({
            $or: [{ email: email }, { username: username }],
        });

        if (!user) {
            return res.status(400).json({ message: 'Email or username does not exist!' });
        }

        if (user && (await verifyHashPassword(password, user.password))) {
            const refreshToken = generateRefreshToken(user)
            user.password = undefined
            res.status(200).json({
                status: "success",
                message: "User Login successfully",
                user: {
                    userId: user._id,
                    email: user.email,
                    username: user.username,
                    profile: user.profile,
                    blogs: user.blogs,
                    followers: user.followers,
                    following: user.following,
                    savedBlogs: user.savedBlogs
                },
                accessToken: generateJWTToken(user),
                refreshToken: refreshToken,
            })
        } else {
            res.status(400).json({ message: 'Invalid email and password !' })
        }
    } catch (error) {
        res.status(500).json({ message: "An error occured while login user!" })
    }

});




// forgot password

const forgotPasswordAPI = asyncHandler(async (req, res) => {
    console.log("reset 2")

    try {
        const { email } = req.body;
        console.log(email, "email")
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ message: 'Email does not exist!' });
        }
        // resetPass
        await resetPasswordMail(user.username, user.email);

        res.status(200).json({ message: "Please check your inbox of mail" })

    } catch (error) {
        res.status(500).json({ message: "An error occured while forgot password!" })
    }
})


const resetPasswordAPI = asyncHandler(async (req, res) => {
    try {

        const { email } = req.query;
        const { password } = req.body
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: 'Email does not exist!' });
        }
        const hashedPassword = await hashPassword(password);

        // const updateUser = await User.findByIdAndUpdate({ _id: user._id }, { $set: { password: hashedPassword } }, { new: true })
        const updateUser = await User.findByIdAndUpdate(user._id, { $set: { password: hashedPassword } }, { new: true });
        res.status(200).json({ message: "Password updated successfully!!" })

    } catch (error) {
        res.status(500).json({ message: "An error occured while reseting password!" })

    }
})





//  contact us

const contactUsAPI = asyncHandler(async (req, res) => {
    try {
        const { username, email, message } = req.body;

        console.log(username, email, message)

        transporter.sendMail(mailOptionContactFn(username, message, email), (error, info) => {
            if (error) {
                console.log("errr", error.message);
            } else {
                console.log("Mail has been sent on: ", email, info.response)
                res.status(200).json({ success: true, message: "Email sent successfully" });
            }
        })

    } catch (error) {
        res.status(500).json({ message: "An error occured while sending mail!" })

    }
})




//token

const generateJWTToken = (user) => {
    // const tokenExpirationTime = Math.floor(Date.now() / 1000) + expiresIn;
    return jwt.sign({ ...user.toJSON() }, process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' })
}

// refresh token

const generateRefreshToken = (user) => {
    return jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY, { expiresIn: '24h' })
}

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)

    return await bcrypt.hash(password, salt)
}

const verifyHashPassword = async (password, userPassword) => {
    return await bcrypt.compare(password, userPassword)
}



const logoutUser = async (request, response) => {
    const token = request.body.token;
    console.log(token, "token")

    response.status(204).json({ msg: 'logout successfull' });
}






module.exports = {
    register,
    login,
    logoutUser,
    showAuth,
    forgotPasswordAPI,
    resetPasswordAPI,
    contactUsAPI

}
