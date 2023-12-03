
const express = require('express');
const upload = require('../../middleware/upload');
const { fileUpload, getImage } = require('../../controllers/blogs/file-upload');
const router = express.Router();

router.post('/file-upload', upload.single('file'), fileUpload)
router.get('/file/:filename', getImage)

module.exports = router;
