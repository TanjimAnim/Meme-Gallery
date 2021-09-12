// post api for saving images from URL

const imageModel = require("../models/models.js");

var date = new Date();
var currentDate = date.toLocaleDateString();

const submitLink = async (req, res) => {
  let saveImageFromUrl = new imageModel();
  saveImageFromUrl.img.data = req.body.url;
  saveImageFromUrl.postedAt = currentDate;
  await saveImageFromUrl.save(function (err, result) {
    if (err) return console.error(err);
    else {
      res.sendStatus(202);
    }
  });
};

module.exports = submitLink;
