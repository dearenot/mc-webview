const express = require("express");
const app = express();
const path = require("path");
const mc = require("./mc");
const here = require("./here");
const ipstack = require("./ipstack");
const mustacheExpress = require("mustache-express");

// const htmlPage = path.join(__dirname, "index.html");

console.log("server started!");
let USER_LOCATION = null;

app.use(express.static("./"));
app.listen(process.env.PORT || 8081);
app.engine("html", mustacheExpress());
app.set("view engine", "html");

app.get("/webview", function(req, res) {
  const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const subscriber_id = req.query.subscriber_id;
  const cuf_id = req.query.cuf_id;
  console.log("r ", req.query);
  ipstack.getLocation(ip, loc => {
    USER_LOCATION = loc;

    res.render("index", {
      encodedJson: encodeURIComponent(
        JSON.stringify({
          userLocation: USER_LOCATION,
          subscriberId: subscriber_id || null,
          cufId: cuf_id || null
        })
      )
    });
  });
  console.log("@@ IP @@@ ", ip);
});

app.get("/getBotFields", function(req, res) {
  mc.getBotFields(data => {
    res.setHeader("Content-Type", "application/json");
    res.end(data);
  });
});

// add data here
app.post("/setCUF", function(req, res) {
  console.log("cuf req ", req.query, req.body);
  mc.setCUF(data => {
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
