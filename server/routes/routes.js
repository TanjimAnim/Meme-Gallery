const express = require('express')
const imageModel = require('../models/models.js')
const router = express.Router()
const multer = require('multer')


var date = Date.now()

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
        cb(null, file.fieldname + '-' + date)
    }
});

var upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 3
    }
}).single('image');


router.post('/upload', upload, (req, res) => {
    console.log(req.file)


});




module.exports = router