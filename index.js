const express = require("express");
const app = express();
const path = require("path");

const htmlPage = path.join(__dirname, "index.html");

console.log("server started!");

app.use(express.static("./"));
app.get("/webview", function(req, res) {
  res.sendFile(htmlPage);
});

app.listen(process.env.PORT || 8081);
