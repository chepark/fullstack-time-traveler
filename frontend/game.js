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
//CO2 INDICATOR

//function to fetch data from API
async function getData(url){
  const response = await fetch(url);
  if (!response.ok) throw new Error ('Invalid server input!');
  const data = await response.json();
  return data
}
// function to update game status
function updateCO2(status) {
  document.querySelector('#player-name').innerHTML = `Player: ${status.name}`;
  document.querySelector('#consumed').innerHTML = status.co2.consumed;
  document.querySelector('#budget').innerHTML = status.co2.budget;
}

//start te game and calls the other functions
async function gameSetup(){
  try{
    const response = await fetch('');
    const data = await response.json();
    console.log(data);

  } catch (error) {
    console.log(error);
  }
}

