const https = require("https");

const API_KEY = "969729166560529:468893071986771c13db4d7f68558290";
const TOKEN = `Bearer ${API_KEY}`;
const API_HOST = "api.manychat.com";

const GET_BOT_FIELDS = "/fb/page/getBotFields";
const SET_CUF = "";

const options = {
  hostname: API_HOST,
  path: "/fb/page/getBotFields",
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: TOKEN
  }
};

function getBotFields(cb) {
  var req = https.request(options);

  req.on("response", function(res) {
    res.on("data", function(data) {
      const response = data.toString("utf8");
      cb(response);
    });
  });

  req.end();
}

module.exports = {
  getBotFields
};
