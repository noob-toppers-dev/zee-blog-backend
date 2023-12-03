

const asyncHandler = require('express-async-handler');
const User = require('../../models/auth-model');






// const followAPI2 = asyncHandler(async (req, res) => {
//     try {
//         const { username } = req.params; // Username of the user to follow
//         const followerId = req.user._id; // Current user (the one who is following)

//         const userToFollow = await User.findOne({ username: username });
//         const userToFollowing = await User.findOne({ _id: followerId });

//         if (!userToFollow) {
//             return res.status(404).json({ message: 'User not found' });
//         }
//         if (req.user.following.includes(userToFollow._id)) {
//             return res.status(404).json({ message: "You are already followed" })
//         }
//         userToFollow.followers.push(followerId);
//         await userToFollow.save();

//         userToFollowing.following.push(userToFollow._id);
//         await userToFollowing.save();

//         res.json({ message: 'Followed user successfully' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

const followAPI = asyncHandler(async (req, res) => {
    try {

        const { username } = req.params; // Username of the user to follow
        const userToFollow = await User.findOne({ username: username });

        if (!userToFollow) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updatedFollower = await User.findByIdAndUpdate(userToFollow._id,
            { $push: { followers: req.user._id } },
            { new: true });

        const updatedCurrentUser = await User.findByIdAndUpdate(req.user._id,
            {
                $push: { following: userToFollow._id }
            }, { new: true });

        if (!updatedFollower || !updatedCurrentUser) {
            return res.status(500).json({ message: 'Failed to update users' });
        }


        res.status(200).json({ message: 'Successfully followed user' });

    } catch (error) {
        return res.status(500).json({ message: error })
    }
})


// const d = asyncHandler(async(req,res)=>{
//     User.findByIdAndUpdate(req.body)
// })





//unfollow API

const unfollowAPI = asyncHandler(async (req, res) => {
    try {

        const { username } = req.params; // Username of the user to follow
        const userToUnFollow = await User.findOne({ username: username });

        if (!userToUnFollow) {
            return res.status(404).json({ message: 'User not found' });
        }

        const updatedUnFollower = await User.findByIdAndUpdate(userToUnFollow._id,
            { $pull: { followers: req.user._id } },
            { new: true });

        const updatedCurrentUser = await User.findByIdAndUpdate(req.user._id,
            {
                $pull: { following: userToUnFollow._id }
            }, { new: true });

        if (!updatedUnFollower || !updatedCurrentUser) {
            return res.status(500).json({ message: 'Failed to update users' });
        }

        res.status(200).json({ message: 'Successfully Unfollowed user' });

    } catch (error) {
        return res.status(500).json({ message: error })
    }
})





module.exports = { followAPI, unfollowAPI }