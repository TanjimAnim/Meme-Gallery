//post api for saving image in database

const imageModel = require("../models/models.js");
const sizeOf = require("image-size");

const postImage = async (req, res) => {
  var date = new Date();
  var currentDate = date.toLocaleString();
  var saveImage = new imageModel();
  const dimensions = sizeOf(req.file.path);
  saveImage.img.data = req.file.filename;
  saveImage.img.contentType = req.file.mimetype;
  saveImage.postedAt = currentDate;
  saveImage.height = dimensions.height;
  saveImage.width = dimensions.width;
  await saveImage.save(function (err, result) {
    if (err) return console.error(err);
    else {
      res.sendStatus(202);
    }
  });
};

module.exports = postImage;
