const express = require("express");
const app = express();
const path = require("path");

const htmlPage = path.join(__dirname, "index.html");

console.log("server started!");

app.use(express.static("./"));
app.get("/", function(req, res) {
  res.sendFile(htmlPage);
});

app.listen(3000);
