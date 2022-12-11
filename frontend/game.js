// Init the map
const map = L.map("map", { tap: false });

export const displayMap = () => {
  L.tileLayer("https://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}", {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }).addTo(map);

  map.setView([60, 24], 7);
};
var popup = L.popup(); // show pop up
const blueIcon = L.divIcon({ className: 'blue-icon' });
const greenIcon = L.divIcon({ className: 'green-icon' });

const airportMarkers = L.featureGroup().addTo(map);
airportMarkers.clearLayers();

export const addMapMarkers = (airports) => {
  airports.map((airport) => {
    const marker = L.marker([airport.latitude, airport.longitude]).addTo(map).setIcon(blueIcon).bindPopup(`<b>${airport.name}</b>`);
    marker.on('mouseover', function (e) {
        this.openPopup();
    });
    marker.on('mouseout', function (e) {
        this.closePopup();
    });
    marker.on('click', function(e) {
        if (confirm(`Do you want to fly to ${airport.name}`)){
            //alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng);
          
            changeGourpColor(blueIcon)
            this.setIcon(greenIcon);
        } else {
            txt = "You pressed Cancel!";
        }
    });
    airportMarkers.addLayer(marker);
  });
};

function changeGourpColor(colorIcon) {
    airportMarkers.eachLayer(function (layer) {
        layer.setIcon(colorIcon);
    });
}



