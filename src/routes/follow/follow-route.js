const express = require('express');
const { authMiddleware } = require('../../middleware/authMiddleware');
const { followAPI, unfollowAPI, getFollowersAPI, getFollowingAPI } = require('../../controllers/follow/follow-controller');
const router = express.Router();

router.put('/follow-user/:username', authMiddleware, followAPI)
router.put('/unfollow-user/:username', authMiddleware, unfollowAPI);

// router.get('/get-followers/:userId', authMiddleware, getFollowersAPI);
// router.get('/get-following/:userId', authMiddleware, getFollowingAPI);


module.exports = router;