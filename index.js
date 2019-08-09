const express = require("express");
const mc = require("./mc");
const here = require("./here");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");

console.log("server started!");

const app = express();
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

app.get("/webview", async function(req, res) {
  // const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  const subscriber_id = req.query.subscriber_id;
  const cuf_id = req.query.cuf_id;
  console.log("r ", req.query);

  res.render("index", {
    encodedJson: encodeURIComponent(
      JSON.stringify({
        userLocation: { Latitude: null, Longitude: null },
        subscriberId: subscriber_id || null,
        cufId: cuf_id || null
      })
    )
  });
});

app.get("/getBotFields", async function(_, res) {
  const responseData = await mc.getBotFields();
  res.setHeader("Content-Type", "application/json");
  res.end(responseData);
});

app.post("/setCUF", async function(req, res) {
  const data = req.body;
  const responseData = await mc.setCustomField(data);
  res.setHeader("Content-Type", "application/json");
  res.end(responseData);
});

app.get("/geocodeAdress", async function(req, res) {
  const textQuery = req.query.searchtext;
  const responseData = await here.geocodeAdress(textQuery);
  res.setHeader("Content-Type", "application/json");
  res.end(responseData);
});
