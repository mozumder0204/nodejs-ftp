//DECLARATION
var express = require("express");
var login = require("./controllers/login");
var home = require("./controllers/home");
var app = express();
var port = process.env.PORT || 3000;

//CONFIGURATION
app.set("view engine", "ejs");

app.use("/login", login);
app.use("/home", home);
app.use("/assets", express.static("ext"));
app.use("/pictures", express.static("images"));
app.use("/content", express.static("data"));
app.use("/", express.static("data"));

//ROUTES
app.get("/", (req, res) => {
  res.render("home/index");
});

//SERVER STARTUP
app.listen(port, () => console.log("Server running on port " + port + " ..."));
