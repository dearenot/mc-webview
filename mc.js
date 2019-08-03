const https = require("https");

const API_KEY = "969729166560529:468893071986771c13db4d7f68558290";
const TOKEN = `Bearer ${API_KEY}`;
const API_HOST = "api.manychat.com";

const GET_BOT_FIELDS = "/fb/page/getBotFields";
const SET_CUF = "";

const options = {
  hostname: "api.manychat.com",
  path: "/fb/page/getBotFields",
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: TOKEN
  }
};

function getBotFields() {
  var req = https.request(options);
  console.log(options);

  req.on("response", function(res) {
    res.on("data", function(data) {
      console.log("data has arrived ", data.toString("utf8"));
    });

    console.log("response");
    console.log(res.statusCode);
    console.log(res.statusMessage);
  });

  req.end();
}

module.exports = {
  getBotFields
};
