const express = require('express')
const { models } = require('mongoose')
const imageModel = require('/models.js')
const router = express.Router()


router.get('/', (req, res) => {
    res.send('this works')

})

router.post('/', upload.single('image'), (req, res, next) => {
    var img = fs.readFileSync(req.file.path);
    var encode_img = img.toString('base64');
    var final_img = {
        contentType: req.file.mimetype,
        image: new Buffer(encode_img, 'base64')
    };

});



module.exports = router