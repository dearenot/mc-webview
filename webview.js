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
    zoom: 10,
    center: { lng: 37.61, lat: 55.7 },
    pixelRatio: window.devicePixelRatio || 1
  }
);
window.addEventListener("resize", () => map.getViewPort().resize());

var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
var ui = H.ui.UI.createDefault(map, maptypes, "ru-RU");

var svgMarkup =
  '<svg width="24" height="24" ' +
  'xmlns="http://www.w3.org/2000/svg">' +
  '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
  'height="22" /><text x="12" y="18" font-size="12pt" ' +
  'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
  'fill="white">H</text></svg>';

// Create an icon, an object holding the latitude and longitude, and a marker:
var icon = new H.map.Icon(svgMarkup),
  coords = { lng: 37.61, lat: 55.7 },
  marker = new H.map.Marker(coords, { icon: icon });

// Add the marker to the map and center the map at the location of the marker:
map.addObject(marker);
map.setCenter(coords);
