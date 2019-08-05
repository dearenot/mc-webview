const API = {
  getBotFields: "/getBotFields",
  setCUF: "/setCUF",
  geocodeAdress: "/geocodeAdress"
};

// Initialize the platform object:
var platform = new H.service.Platform({
  apikey: "eXZI9Adao_YxvIRKxYFxIF6WcqRnMdfYCTp-NTqha6c"
});

// Obtain the default map types from the platform object
var maptypes = platform.createDefaultLayers({ lg: "RU" });

// Instantiate (and display) a map object:
var map = new H.Map(
  document.getElementById("mapContainer"),
  maptypes.vector.normal.map,
  {
    zoom: 12,
    center: convertLatLang(window.appData.userLocation),
    pixelRatio: window.devicePixelRatio || 1
  }
);
window.addEventListener("resize", () => map.getViewPort().resize());

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
var ui = H.ui.UI.createDefault(map, maptypes, "ru-RU");

window.webviewOnLoad = function() {
  makeRequest(API.getBotFields, null, data => {
    console.log(window.appData, convertLatLang(window.appData.userLocation));
    map.setCenter(convertLatLang(window.appData.userLocation));

    createMarkers(data.data);
  });
};

function makePostRequest(url, data, cb) {
  var request = new XMLHttpRequest();

  request.open("POST", url, true);

  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      // Success!
      var resp = this.response;
      cb(JSON.parse(resp));
    } else {
      // We reached our target server, but it returned an error
    }
  };
  request.setRequestHeader("Content-Type", "application/json");
  request.onerror = function() {
    // There was a connection error of some sort
  };

  request.send(JSON.stringify(data));
}

function makeRequest(url, params, cb) {
  var request = new XMLHttpRequest();
  if (params) {
    url = `${url}?${buildURL(params)}`;
  }
  request.open("GET", url, true);

  request.onload = function() {
    if (this.status >= 200 && this.status < 400) {
      // Success!
      var resp = this.response;
      cb(JSON.parse(resp));
    } else {
      // We reached our target server, but it returned an error
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
  };

  request.send();
}

var svgMarkup =
  '<svg width="24" height="24" ' +
  'xmlns="http://www.w3.org/2000/svg">' +
  '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
  'height="22" /><text x="12" y="18" font-size="12pt" ' +
  'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
  'fill="white">H</text></svg>';

// Create an icon, an object holding the latitude and longitude, and a marker:
var icon = new H.map.Icon(svgMarkup);

function createMarkers(data) {
  console.log("mark ", data);
  const group = new H.map.Group();
  map.addObject(group);
  data.forEach(botField => {
    makeRequest(API.geocodeAdress, { searchtext: botField.value }, d => {
      // console.log(d.Response.View[0].Result[0].Location.DisplayPosition);
      const location = d.Response.View[0].Result[0].Location.DisplayPosition;
      const position = convertLatLang(location);
      var marker = new H.map.Marker(position, { icon: icon });
      // map.addObject(marker);
      group.addObject(marker);
      console.log("@ S ", botField.value);
      marker.addEventListener("tap", e => {
        console.log(e, botField.value);
        makePostRequest(API.setCUF, {
          subscriber_id: window.appData.subscriberId,
          field_id: window.appData.cufId,
          field_value: botField.value
        });
      });
    });
  });
}

const buildURL = data =>
  Object.entries(data)
    .map(pair => pair.map(encodeURIComponent).join("="))
    .join("&");

function convertLatLang({ Latitude, Longitude }) {
  return {
    lat: Latitude || 55.7,
    lng: Longitude || 37.61
  };
}
