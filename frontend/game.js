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

// function to update CO2 indicator
function updateCO2(CO2budget, CO2left) { //change to status? line 38 example code
  let percentCalculator = (CO2left*100)/CO2budget;
  let percentCO2Left = percentCalculator.toString() +'%';
  document.getElementById('budget').innerHTML = CO2left+ ' of ' + CO2budget + ' CO2 Budget';
  document.getElementById('co2-container').style.width = percentCO2Left;
}

//function to update current time in the right panel
function updateCurrentTime(currentLocation, currentTime){//change to status?
  let value = document.getElementById('currentTime');
  value.innerHTML = currentLocation + ' Current time <br><br>' + currentTime;
}

//function to update goal time in the right panel
function updateGoalTime(goalTime){
  let gtime = document.getElementById('goalTime');
  gtime.innerHTML = 'Goal time <br><br>' + goalTime;
}

//functions to update guide messages
function updateGuideLocation(currentAirport, currentCountry, currentTime){
  let location = document.getElementById('timeTravelerLocation');
  location.innerHTML = `Time Traveler: You are now in ${currentAirport} in ${currentCountry}. Local time is ${currentTime}.`

}

function updateGuideGoal(goalTime) {
  let timeToFind = document.getElementById('timeTravelerGoal');
  timeToFind.innerHTML = `Time Traveler: Please find the airport located in the goal time zone. The goal time is ${goalTime}.`
}


//TESTING VALUES
updateCO2(5000, 2000);
updateCurrentTime('Helsinki Airport','6:30');
updateGoalTime('4:30');
updateGuideLocation('Helsinki Airport', 'Finland', '6:30');
updateGuideGoal('4:30');

//Help button color change on hover
const svgImage = document.getElementById('svgButton');

helpButton.addEventListener("mouseover", ()=>{
  changeColor();
});
helpButton.addEventListener("mouseout", ()=>{
  noHoverColor();
})
function changeColor(){
  svgImage.style.fill = '#58db8f';
};
function noHoverColor(){
  svgImage.style.fill = '#e7f4e9';
}
