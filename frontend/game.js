// Init the map
const map = L.map("map", { tap: false });

export const displayMap = () => {
  L.tileLayer("https://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}", {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }).addTo(map);

  map.setView([60, 24], 7);
};

export const addMapMarkers = (airports) => {
  airports.map((airport) => {
    return L.marker([airport.latitude, airport.longitude]).addTo(map);
  });
};

//TIMEZONE MAP AND HELP BUTTON
let helpButton = document.getElementById("helpButton");
let timezonemap = document.getElementById("timezoneMap");
let closeButton = document.getElementById("closeButton");

helpButton.addEventListener('click', ()=>{
  showMap();
})

closeButton.addEventListener('click', ()=>{
  closeMap();
})

function showMap() {
  timezonemap.show();
}

function closeMap() {
  timezonemap.close();
}
