//delete an image
const imageModel = require("../models/models.js");

const deleteImage = (req, res) => {
  imageModel.findByIdAndRemove(
    req.params.propertyId,
    req.body,
    function (err, data) {
      if (!err) {
        console.log("Deleted");
        res.sendStatus(202);
      }
    }
  );
};

module.exports = deleteImage;
