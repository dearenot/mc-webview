const { getRequest, DEFAULT_GET_OPTIONS } = require("./utils/request");
// TODO get from ENV
const APP_CODE = "sRg9S57YeyhBvYf4nbGzaA";
const APP_ID = "wfRdljJqG8nbbFpiwMTn";

function makeSearch(text) {
  return text
    .replace(/,/g, "")
    .split(" ")
    .join("+");
}

function geocodeAdress(searchString) {
  const searchText = makeSearch(encodeURIComponent(searchString));
  return getRequest({
    ...DEFAULT_GET_OPTIONS,
    hostname: "geocoder.api.here.com",
    path: `/6.2/geocode.json?app_id=${APP_ID}&app_code=${APP_CODE}&searchtext=${searchText}`
  });
}

module.exports = {
  geocodeAdress
};
