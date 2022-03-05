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
  height: {
    type: Number,
    default: 200,
  },
  width: {
    type: Number,
    default: 200,
  },
});

module.exports = new mongoose.model("Image", imageSchema);
