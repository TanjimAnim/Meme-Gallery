const express = require('express')
const imageModel = require('../models/models.js')
const router = express.Router()
const multer = require('multer')



var date = new Date()
var currentDate = date.toLocaleDateString()

router.get('/', (req, res) => {
    res.send('this works')

})

router.post('/', (req, res) => {

    console.log("connected to React")
    res.redirect('/')

})

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


router.post('/upload', upload, async (req, res) => {
    console.log(req.file)
    var saveImage = new imageModel()
    saveImage.img.data = req.file.path;
    saveImage.img.contentType = req.file.mimetype;
    saveImage.postedAt = currentDate
    console.log(saveImage)
    await saveImage.save(function (err, result) {
        if (err) return console.error(err);
        else console.log(result)
    })


});




module.exports = router