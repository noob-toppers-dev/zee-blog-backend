const grid = require('gridfs-stream');
const mongoose = require('mongoose');
const url = 'http://localhost:8000/api';

const conn = mongoose.connection

let gfs;
let gridfsBucket;

conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'fs'
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('fs');
})

const fileUpload = (req, res) => {
    if (!req.file) {
        return res.status(404).json({ msg: "file not found" });
    }
    const imageUrl = `${url}/file/${req.file.filename}`;
    return res.status(200).json(imageUrl);
}


const getImage = async (req, res) => {
    // console.log(req.params.filename, "req.params.filename")
    try {
        const file = await gfs.files.findOne({ filename: req.params.filename });
        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(res);
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}

module.exports = { fileUpload, getImage }