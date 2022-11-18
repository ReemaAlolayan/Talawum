require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
const arr = [];

app.get("/", function(req, res) {
  res.render("home");
});

app.get("/Leader", function(req, res) {
  res.render("Leader");
});

app.post("/Leader", function(req, res) {

  const theName = req.body.theName;
  const thePass = req.body.thePass;

  if (theName === process.env.UNAME && thePass === process.env.PASS) {
    res.redirect("info");
  } else {
    res.redirect("fail");
  }

  //aa



});

app.get("/fail", function(req, res) {
  res.render("fail");
});

app.post("/fail", function(req, res) {

  res.redirect("Leader");

});

app.get("/Members", function(req, res) {
  res.render("Members");
});


app.post("/Members", function(req, res) {

  const infos = {
    selection: req.body.selection,
    did: req.body.Do,
    time: req.body.Time,
    discription: req.body.discription,
    name: req.body.Name
  };

  arr.push(infos);
  res.redirect("success");

});

app.get("/info", function(req, res) {
  res.render("info", {
    array: arr
  });
});

app.post("/info", function(req, res) {

  arr.forEach(function(info) {
    arr.pop();
  });
  res.redirect("info");
});

app.get("/success", function(req, res) {
  res.render("success");
});
app.post("/success", function(req, res) {

  res.redirect("Members");

});







let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function() {
  console.log("Server started succesfully");
});
