const express = require('express')
const imageModel = require('../models/models.js')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')

var date = new Date()
var currentDate = date.toLocaleDateString()


//multer for storing uploaded files
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 3
    }
}).single('image');

//post api for saving image in database
router.post('/upload', upload, async (req, res) => {
    var saveImage = new imageModel()
    saveImage.img.data = req.file.filename;
    saveImage.img.contentType = req.file.mimetype;
    saveImage.postedAt = currentDate
    console.log(saveImage)
    await saveImage.save(function (err, result) {
        if (err) return console.error(err);
        else {
            console.log(result)
            res.sendStatus(202)
        }
    })



});

router.post('/submitlink', async (req, res) => {

    let saveImageFromUrl = new imageModel()
    saveImageFromUrl.img.data = req.body.url
    saveImageFromUrl.postedAt = currentDate
    await saveImageFromUrl.save(function (err, result) {
        if (err) return console.error(err);
        else {
            console.log(result)
            res.sendStatus(202)

        }
    })

})


//  the GET request handler that provides the images
router.get('/images', (req, res) => {
    imageModel.find({}, (err, img) => {
        if (err) {
            console.log(err);
            res.status(500).send('An error occurred', err);
        }
        else {
            console.log(img)
            res.contentType('json');
            res.send(img);
        }
    }).sort({ createdAt: 'desc' });
});

//delete image
router.post('/delete/:propertyId', (req, res) => {
    imageModel.findByIdAndRemove(req.params.propertyId, req.body, function (err, data) {
        if (!err) {
            console.log("Deleted");
            res.sendStatus(202)
        }
    });
})


module.exports = router