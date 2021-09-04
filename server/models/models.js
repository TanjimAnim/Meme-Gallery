var mongoose = require("mongoose");

var imageSchema = new mongoose.Schema({
  img: {
    data: String,
    contentType: String,
  },
  postedAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = new mongoose.model("Image", imageSchema);
