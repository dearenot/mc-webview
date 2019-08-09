const { postRequest, DEFAULT_POST_OPTIONS } = require("./utils/request");

const API_KEY = "AIzaSyAbEICP-Z_kXpGhTu9c0Ya0i8qUNOZcARc";

function getLocation() {
  return postRequest({
    ...DEFAULT_POST_OPTIONS,
    hostname: `www.googleapis.com`,
    path: `/geolocation/v1/geolocate?key=${API_KEY}`
  });
}

module.exports = {
  getLocation
};
