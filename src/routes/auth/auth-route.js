const express = require('express');
const router = express.Router();
const { showAuth, register, login, logoutUser, forgotPasswordAPI, resetPasswordAPI, contactUsAPI } = require('../../controllers/auth/auth-controller');
const { authMiddleware } = require('../../middleware/authMiddleware');

router.get('/all-users', authMiddleware, showAuth);

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logoutUser);
router.post('/forget-password', forgotPasswordAPI);
router.post('/reset-password', resetPasswordAPI);
router.post('/contact-us', authMiddleware, contactUsAPI);
module.exports = router;

