// Initialize the platform object:
var platform = new H.service.Platform({
  apikey: "eXZI9Adao_YxvIRKxYFxIF6WcqRnMdfYCTp-NTqha6c"
});

// Obtain the default map types from the platform object
var maptypes = platform.createDefaultLayers();

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

console.log(H);
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
var ui = H.ui.UI.createDefault(map, maptypes, "ru-RU");
