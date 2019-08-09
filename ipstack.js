const { getRequest, DEFAULT_GET_OPTIONS } = require("./utils/request");

const API_KEY = "04cba9430e1c59a168ad2c2c03373ecd";

function prepareLocationData(data) {
  const { latitude, longitude } = data;
  return { latitude, longitude };
}

function getLocation(ipAddress) {
  return getRequest({
    ...DEFAULT_GET_OPTIONS,
    hostname: "api.ipstack.com",
    path: `/${ipAddress}?access_key=${API_KEY}`
  });
}

module.exports = {
  getLocation,
  prepareLocationData
};
