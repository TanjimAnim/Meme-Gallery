// post api for saving images from URL
const https = require("https");
const imageType = require("image-type");
// const got = require("got");
// const fileTypeFromStream = require("file-type");

const imageModel = require("../models/models.js");

var date = new Date();
var currentDate = date.toLocaleDateString();

const submitLink = async (req, res) => {
  const { url } = req.body;
  https.get(url, (response) => {
    const chunks = [];
    response.on("data", (chunk) => {
      chunks.push(chunk);
    });
    response.on("end", () => {
      const resultBuffer = Buffer.concat(chunks);
      const imageData = imageType(resultBuffer);
      console.log(imageData.mime);
    });
  });
  // https.get(url, (response) => {
  //   response.on("readable", () => {
  //     const chunk = response.read(imageType.minimumBytes);
  //     response.destroy();

  //     console.log(imageType(chunk));
  //   });
  // });
  // let saveImageFromUrl = new imageModel();
  // saveImageFromUrl.img.data = req.body.url;
  // saveImageFromUrl.postedAt = currentDate;
  // await saveImageFromUrl.save(function (err, result) {
  //   if (err) return console.error(err);
  //   else {
  //     res.sendStatus(202);
  //   }
  // });
};

module.exports = submitLink;
