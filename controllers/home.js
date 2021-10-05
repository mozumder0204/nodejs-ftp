var express = require("express");
// var homeModel = require.main.require("./model/home-model");
var router = express.Router();
var formidable = require("formidable");
var fs = require("fs");
var path = require("path");

// ********************************************
// *************Index************************

// router.get('*', function(req, res, next){
// 	res.redirect('/login');
// });

router.get("/", (req, res) => {
  res.render("home/index");
});

// ********************************************
// *************View Content*******************
router.get("/viewContent", (req, res) => {
  fs.readdir("./data/", function (err, items) {
    Object.assign({}, items);
    var item = {
      qList: items,
    };
    res.render("home/viewContent", item);
  });
});
// *******************************************
// *************Upload Content****************
router.get("/uploadContent", (req, res) => {
  var item = {
    errorMsg: false,
  };
  res.render("home/uploadContent", item);
});

router.post("/uploadContent", (req, res) => {
  var form = new formidable.IncomingForm({
    multiples: true,
    maxFileSize: 2048 * 1024 * 1024,
  });
  form.parse(req);
  form.on("fileBegin", function (name, file) {
    // console.log(file);
    if (file.name !== "") {
      file.path = path.join(__dirname, "../data/", file.name);
    } else {
      var item = {
        errorMsg: true,
      };
      res.render("home/uploadContent", item);
    }
  });
  form.on("file", function (name, file) {
    if (file.name !== "") {
      console.log("Uploaded " + file.name);
      res.redirect("/home/viewContent");
    }
  });
});

// ********************************************
// *************Delete Content*******************
router.get("/deleteContent", (req, res) => {
  fs.readdir("./data/", function (err, items) {
    Object.assign({}, items);
    var item = {
      qList: items,
    };
    res.render("home/deleteContent", item);
  });
});

router.get("/deleteContent/:name", (req, res) => {
  fs.unlinkSync("./data/" + req.params.name);
  fs.readdir("./data/", function (err, items) {
    Object.assign({}, items);
    var item = {
      qList: items,
    };
    res.render("home/deleteContent", item);
  });
});
// ********************************************
//********************************************
// *************Download************************
router.get("/download/:name", (req, res) => {
  var file = "./data/" + req.params.name;
  var filename = path.basename(file);
  res.setHeader("Content-disposition", "attachment; filename=" + filename);
  var filestream = fs.createReadStream(file);
  filestream.pipe(res);
});

module.exports = router;
