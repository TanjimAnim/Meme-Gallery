const express = require('express')
const { models } = require('mongoose')
const imageModel = require('/models.js')
const router = express.Router()
const multer = require('multer')


router.get('/', (req, res) => {
    res.send('this works')

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

var upload = multer({ storage: storage }).single('image');


router.post('/upload', upload, (req, res, next) => {

});




module.exports = router