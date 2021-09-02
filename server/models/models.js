var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({


    img:
    {
        data: Buffer,
        contentType: String
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});


module.exports = new mongoose.model('Image', imageSchema);