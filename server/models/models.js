var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({


    img:
    {
        data: Buffer,
        contentType: String
    },
    postedAt: {
        type: Date,
        default: new Date()
    }
});


module.exports = new mongoose.model('Image', imageSchema);