// const asyncHandler = require("express-async-handler");
// const { gfs ,gridfsBucket} = require("./file-upload");



// const getImage = asyncHandler(async (req, res) => {
//     try {
//         const file = await gfs.files.findOne({ filename: req.params.filename });
//         const readStream = gridfsBucket.openDownloadStream(file._id);
//         readStream.pipe(res);
//     } catch (error) {
//         res.status(500).json({ msg: "error.message" })
//     }
// })

// module.exports = { getImage };