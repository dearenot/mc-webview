const express = require("express");
const app = express();
const path = require("path");
const mc = require("./mc");

const htmlPage = path.join(__dirname, "index.html");

console.log("server started!");

app.use(express.static("./"));
app.get("/webview", function(req, res) {
  res.sendFile(htmlPage);
});

app.listen(process.env.PORT || 8081);

app.get("/getBotFields", function(req, res) {
  console.log("get bot fields!");
  mc.getBotFields();
});
