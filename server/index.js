const express = require('express')
const mongoose = require('mongoose')
const dotenv = require("dotenv");
const multer = require('multer')
const routes = require('./routes/routes.js')
var imgModel = require('./models.js');

dotenv.config({ path: "./.env" });


const app = express()

app.use(express.urlencoded({ extended: false }))
app.use(express.json({ limit: '50mb' }));
app.use('/', routes)

//connection to mongoDB
mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    retryWrites: true,
    w: "majority",
})
    .then(() => console.log('Connected to database'))
    .catch((error) => console.log(error.message))

//multer for storing uploaded files

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage }).single('image');



//app listening
app.listen(5000, () => { console.log("app is listening through port 5000") })