const http = require("http");

const API_KEY = "04cba9430e1c59a168ad2c2c03373ecd";

const getOptions = ipAddress => ({
  hostname: "api.ipstack.com",
  path: `/${ipAddress}?access_key=${API_KEY}`,
  method: "GET",
  headers: {
    accept: "application/json"
  }
});

function getLocation(ipAddress, cb) {
  var req = http.request(getOptions(ipAddress));
  req.on("response", function(res) {
    res.on("data", function(data) {
      const response = JSON.parse(data.toString("utf8"));

      const { latitude, longitude } = response;
      cb({ latitude, longitude });
    });
  });

  req.end();
}

module.exports = {
  getLocation
};
