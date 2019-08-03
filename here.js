const https = require("https");

const APP_CODE = "sRg9S57YeyhBvYf4nbGzaA";
const APP_ID = "wfRdljJqG8nbbFpiwMTn";

const getOptions = searchText => ({
  hostname: "geocoder.api.here.com",
  path: `/6.2/geocode.json?app_id=${APP_ID}&app_code=${APP_CODE}&searchtext=${searchText}`,
  method: "GET",
  headers: {
    accept: "application/json"
  }
});

function makeSearch(text) {
  return text
    .replace(/,/g, "")
    .split(" ")
    .join("+");
}

function geocodeAdress(searchString, cb) {
  var req = https.request(getOptions(makeSearch(searchString)));

  req.on("response", function(res) {
    res.on("data", function(data) {
      const response = data.toString("utf8");
      cb(response);
    });
  });

  req.end();
}

module.exports = {
  geocodeAdress
};
