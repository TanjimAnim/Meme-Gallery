var mongoose = require('mongoose');

var imageSchema = new mongoose.Schema({
    name: String,
    desc: String,
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

//Image is a model which has a schema imageSchema

var Image = new mongoose.model('Image', imageSchema);

module.exports = Image