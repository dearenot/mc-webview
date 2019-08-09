const express = require("express");
const app = express();
const path = require("path");
const mc = require("./mc");
const here = require("./here");
const ipstack = require("./ipstack");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");

console.log("server started!");
let USER_LOCATION = null;

app.use(express.static("./"));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(express.json());
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

    console.log(USER_LOCATION);
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

app.get("/getBotFields", async function(_, res) {
  const responseData = await mc.getBotFields();
  console.log(responseData);
  res.setHeader("Content-Type", "application/json");
  res.end(responseData);
});

app.post("/setCUF", async function(req, res) {
  const data = req.body;
  const responseData = await mc.setCustomField(data);
  res.setHeader("Content-Type", "application/json");
  res.end(responseData);
});

app.get("/geocodeAdress", function(req, res) {
  const textQuery = req.query.searchtext;
  here.geocodeAdress(encodeURIComponent(textQuery), data => {
    res.setHeader("Content-Type", "application/json");
    res.end(data);
  });
});
