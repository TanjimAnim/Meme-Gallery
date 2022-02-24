// post api for saving images from URL
const https = require("https");
const imageType = require("image-type");
// const got = require("got");
// const fileTypeFromStream = require("file-type");

const imageModel = require("../models/models.js");

const submitLink = async (req, res) => {
  const { url } = req.body;
  var imageData;
  https.get(url, (response) => {
    const chunks = [];
    response.on("data", (chunk) => {
      chunks.push(chunk);
    });
    response.on("end", async () => {
      const resultBuffer = Buffer.concat(chunks);
      imageData = imageType(resultBuffer);
      if (
        imageData.mime === "image/jpeg" ||
        imageData.mime === "image/jpg" ||
        imageData.mime === "image/png"
      ) {
        let saveImageFromUrl = new imageModel();
        saveImageFromUrl.img.data = req.body.url;
        var date = new Date();
        var currentDate = date.toLocaleString();
        saveImageFromUrl.postedAt = currentDate;
        await saveImageFromUrl.save(function (err, result) {
          if (err) return console.error(err);
          else {
            res.sendStatus(202);
          }
        });
      } else {
        console.log("some error occured");
      }
    });
  });
};

module.exports = submitLink;
