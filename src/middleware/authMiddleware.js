const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');



const authMiddleware = asyncHandler(async (req, res, next) => {

    let authHeader = req.headers['authorization']

    const token = authHeader && authHeader.split(' ')[1]
    // console.log(token, 'token')
    if (token == null) {
        return res.status(401).json({ msg: 'token is missing' });
    }

    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user) => {
        if (error) {
            return res.status(403).json({ msg: 'Invalid token' })
        }
        req.user = user;
        // console.log(req.user, "user token")
        next()

    })
});


const createNewToken = asyncHandler(async (req, res) => {
    const refreshToken = req.body.token.split(' ')[1];
    console.log(refreshToken, "refreshToken")

    if (!refreshToken) {
        return res.status(401).json({ msg: 'Refresh token is missing' })
    }

    // const token = await Token.findOne({ token: refreshToken });

    if (!refreshToken) {
        return res.status(404).json({ msg: 'Refresh token is not valid' });
    }

    jwt.verify(refreshToken.token, process.env.REFRESH_SECRET_KEY, (error, user) => {
        if (error) {
            res.status(500).json({ msg: 'invalid refresh token' });
        }

        const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' });
        return res.status(200).json({ accessToken: accessToken })
    })

})

module.exports = { authMiddleware, createNewToken }

