//  the GET request handler that provides the images

const imageModel = require("../models/models.js");

const getImages = (req, res) => {
  imageModel
    .find({}, (err, img) => {
      if (err) {
        console.log(err);
        res.status(500).send("An error occurred", err);
      } else {
        res.contentType("json");
        res.send(img);
      }
    })
    .sort({ createdAt: "desc" });
};

module.exports = getImages;
