const express = require("express");
const app = express();
const path = require("path");
const mc = require("./mc");
const here = require("./here");

const htmlPage = path.join(__dirname, "index.html");

console.log("server started!");

app.use(express.static("./"));
app.get("/webview", function(req, res) {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

  console.log("@@ IP @@@ ", ip);
  res.sendFile(htmlPage);
});

app.listen(process.env.PORT || 8081);

app.get("/getBotFields", function(req, res) {
  mc.getBotFields(data => {
    res.setHeader("Content-Type", "application/json");
    res.end(data);
  });
});

app.get("/geocodeAdress", function(req, res) {
  const textQuery = req.query.searchtext;
  here.geocodeAdress(encodeURIComponent(textQuery), data => {
    res.setHeader("Content-Type", "application/json");
    res.end(data);
  });
});
