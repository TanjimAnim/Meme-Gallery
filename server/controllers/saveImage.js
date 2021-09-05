//post api for saving image in database

const imageModel = require("../models/models.js");

var date = new Date();
var currentDate = date.toLocaleDateString();

const postImage = async (req, res) => {
  var saveImage = new imageModel();
  saveImage.img.data = req.file.filename;
  saveImage.img.contentType = req.file.mimetype;
  saveImage.postedAt = currentDate;
  console.log(saveImage);
  await saveImage.save(function (err, result) {
    if (err) return console.error(err);
    else {
      console.log(result);
      res.sendStatus(202);
    }
  });
};

module.exports = postImage;
