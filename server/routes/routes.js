const express = require('express')
const { models } = require('mongoose')
const imageModel = require('/models.js')
const router = express.Router()


router.get('/', (req, res) => {
    res.send('this works')

})

router.post('/', upload.single('image'), (req, res, next) => {

});



module.exports = router