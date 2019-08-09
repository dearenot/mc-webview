const http = require("http");
const https = require("https");

const querystring = require("querystring");

const GET_DEFAULT_HEADERS = {
  accept: "application/json"
};

const POST_DEFAULT_HEADERS = {
  accept: "application/json",
  "Content-Type": "application/json",
  "Content-Type": "application/x-www-form-urlencoded"
};

const DEFAULT_GET_OPTIONS = {
  hostname: "",
  path: "",
  method: "GET",
  headers: {
    ...GET_DEFAULT_HEADERS
  }
};

const DEFAULT_POST_OPTIONS = {
  hostname: "",
  path: "",
  method: "POST",
  headers: {
    ...POST_DEFAULT_HEADERS
  }
};

function getRequest(options = DEFAULT_GET_OPTIONS) {
  var req = https.request(options);

  return new Promise((resolve, reject) => {
    req.on("response", function(res) {
      res.on("data", function(data) {
        const response = data.toString("utf8");
        resolve(response);
      });
    });

    req.on("error", er => {
      reject(er);
    });

    req.end();
  });
}

function postRequest(options = DEFAULT_POST_OPTIONS, body = {}) {
  var req = https.request(options);

  return new Promise((resolve, reject) => {
    req.on("response", function(res) {
      res.on("data", function(data) {
        const response = data.toString("utf8");
        resolve(response);
      });
    });

    req.on("error", er => {
      reject(er);
    });

    req.write(querystring.stringify(body));
    req.end();
  });
}

module.exports = {
  getRequest,
  postRequest,
  DEFAULT_GET_OPTIONS,
  DEFAULT_POST_OPTIONS,
  GET_DEFAULT_HEADERS,
  POST_DEFAULT_HEADERS
};
