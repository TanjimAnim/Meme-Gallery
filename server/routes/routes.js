const express = require("express");
const imageModel = require("../models/models.js");
const router = express.Router();
const multer = require("multer");

// import controllers
const postImage = require("../controllers/saveImage.js");
const submitLink = require("../controllers/submitLink.js");
const getImages = require("../controllers/getImage.js");
const deleteImage = require("../controllers/deleteImage.js");
var date = new Date();

//multer for storing uploaded files
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});

var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 3,
  },
  onError: function (err, next) {
    console.log("error", err);
    next(err);
  },
}).single("image");

//post api for saving image in database
router.post("/upload", upload, postImage);

// post api for saving images from URL
router.post("/submitlink", submitLink);

//  the GET request handler that provides the images
router.get("/images", getImages);

//delete an image
router.post("/delete/:propertyId", deleteImage);

module.exports = router;
