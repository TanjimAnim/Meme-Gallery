const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const routes = require("./routes/routes.js");
const multer = require("multer");

dotenv.config({ path: "./.env" });

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: "50mb" }));
app.use("/", routes);
//app.use('/upload', routes)
app.use(express.static("./uploads")); //serves static file to path
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    res.status(400).json({ error: "file too large" });
  } else if (error) {
    next(error);
  }
});

//connection to mongoDB
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    retryWrites: true,
    w: "majority",
  })
  .then(() => console.log("Connected to database"))
  .catch((error) => console.log(error.message));

//app listening
app.listen(process.env.PORT || 5000);
