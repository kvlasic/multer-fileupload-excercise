// call all the required packages
const express = require("express");
const multer = require("multer");
var path = require("path");

// DESTINATION TO UPLOAD FILES TO
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

//CREATE EXPRESS APP / INITIALIZE THE SERVER
const app = express();

app.use(express.static("uploads"));

//GET REUQEST THAT RETURNS index.html FILE (WITH UPLOAD FILE FORM)
app.get("/", (req, res) => {
  console.log(req.method + " " + req.url + " request received");
  res.sendFile(__dirname + "/index.html");
});

// POST REUQEST TO UPLOAD PROFILE PIC
app.post(
  "/upload-profile-pic",
  upload.single("profile_pic"),
  function (req, res, next) {
    if (!req.file) {
      res.send("No file selected!");
    }
    console.log(req.method + " " + req.url + " request received");
    console.log("file: " + req.file);
    res.send(
      `<h2>Here is the picture:</h2><img src=${req.file.filename} alt="picture"/>`
    );
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
  }
);

// LISTEN FOR REQUESTS
app.listen(3000, () => console.log("Server started on port 3000"));
