import { fetchAllAirports, fetchNewGame, getResult } from "./api.js";
import { Game } from "./classes.js";
import { successMessage, failureMessage, gameOverMessage } from "./message.js";

// init the map
const map = L.map("map", { tap: false });

export const displayMap = () => {
  L.tileLayer("https://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}", {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }).addTo(map);

  map.setView([60, 25], 7);
};

// green, blue markers on the map
const blueIcon = L.divIcon({ className: "blue-icon" });
const greenIcon = L.divIcon({ className: "green-icon" });
let initialMarker;

const airportMarkers = L.featureGroup().addTo(map);
airportMarkers.clearLayers();

const addMapMarkers = (airports) => {
  airports.map((airport) => {
    const marker = L.marker([airport.latitude, airport.longitude])
      .addTo(map)
      .setIcon(blueIcon)
      .bindPopup(`<b>${airport.name}</b>`);

    // show popup on mouseover
    marker.on("mouseover", function (e) {
      this.openPopup();
    });

    // hide popup on mouseout
    marker.on("mouseout", function (e) {
      this.closePopup();
    });

    // change marker color on click
    marker.on("click", function (e) {
      if (confirm(`Do you want to fly to ${airport.name}`)) {
        changeGourpColor(blueIcon);
        this.setIcon(greenIcon);
        // run game
        runGame(airport.name);
      } else {
        return;
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

// const showInitialMarker = (lat, lng) => {
//   const marker = L.marker([lat, lng], { icon: greenIcon });

//   initialMarker = marker;
//   initialMarker.addTo(map);
// };

// const hideInitialMarker = () => {
//   map.removeLayer(initialMarker);
// };

//CO2 INDICATOR
// function to update CO2 indicator
export function updateCO2(CO2budget, CO2left) {
  let percentCalculator = (CO2left * 100) / CO2budget;
  let percentCO2Left = percentCalculator.toString() + "%";
  document.getElementById("budget").innerHTML =
    CO2left + " of " + CO2budget + " CO2 Budget";
  document.getElementById("co2-container").style.width = percentCO2Left;
}

//function to update current time in the right panel
export function updateCurrentTime(currentLocation, currentTime) {
  let value = document.getElementById("currentTime");
  value.innerHTML = currentLocation + "<br>Current time <br><br>" + currentTime;
}

//function to update goal time in the right panel
export function updateGoalTime(goalTime) {
  let gtime = document.getElementById("goalTime");
  gtime.innerHTML = "<br>Goal Time <br><br>" + goalTime;
}

//functions to update guide messages
function updateGuideLocation(currentAirport, currentCountry, currentTime) {
  let location = document.getElementById("timeTravelerLocation");
  location.innerHTML = `Time Traveler: <br>You are now in ${currentAirport} in ${currentCountry}. Local time is ${currentTime}.`;
}

export function updateGuideGoal(goalTime) {
  let timeToFind = document.getElementById("timeTravelerGoal");
  timeToFind.innerHTML = `Time Traveler: <br>Please find the airport located in the goal time zone. The goal time is ${goalTime}.`;
}

export function controlGuideInitDislay(status) {
  let init = document.getElementById("timeTravlerInit");
  init.style.display = status;
}

export function controlHelpGuideDisplay(status) {
  let helpGuide = document.getElementById("timeTravelHelp");
  helpGuide.style.display = status;
}

export function controlGuideLocationGoal(status) {
  let location = document.getElementById("timeTravelerLocation");
  let timeToFind = document.getElementById("timeTravelerGoal");

  location.style.display = status;
  timeToFind.style.display = status;
}

export const setupNewGame = async () => {
  // fetch data
  const airports = await fetchAllAirports();
  const data = await fetchNewGame(Game.gameId, Game.co2benefit);

  // setup data on frontend
  Game.setGameData(data);

  // draw map
  addMapMarkers(airports);
  map.setView([Game.currentLatitude, Game.currentLongitude], 14);
  // showInitialMarker(Game.currentLatitude, Game.currentLongitude);

  // setup frontend
  controlGuideInitDislay("none");
  controlHelpGuideDisplay("block");
  updateCO2(Game.co2budget, Game.co2left);
  updateCurrentTime(Game.currentAirport, Game.currentTime);
  updateGoalTime(Game.goalTime);
  updateGuideLocation(Game.currentAirport, Game.country, Game.currentTime);
  updateGuideGoal(Game.goalTime);
};

//
let selectedFirstAirport = false;

const runGame = async (airport) => {
  if (!selectedFirstAirport) {
    // hideInitialMarker();
    selectedFirstAirport = true;
  }

  // transform airport name
  Game.setCurrerntAirport(airport);

  // fetch result
  const resultData = await getResult(Game.gameId, airport);
  const { current_time, co2budget, success, game_over, country } = resultData;

  // display message
  Game.setCurrerntAirport(airport);
  // Game.setCountry(country);
  Game.setTime(current_time, "current");
  Game.setCo2(co2budget, "co2left");
  Game.setGameOver(game_over);
  Game.setCountry(country);

  updateCO2(5000, Game.co2left);
  updateCurrentTime(Game.currentAirport, Game.currentTime);
  updateGuideLocation(Game.currentAirport, Game.country, Game.currentTime);

  if (game_over) {
    gameOverMessage();
    return;
  }

  if (success) {
    successMessage();
  } else if (!success) {
    failureMessage();
  }
};

export const logOut = () => {
  const userProfile = document.getElementById("user-profile");
  const logIn = document.querySelector(".textarea_container");

  // off user name
  userProfile.style.display = "none";
  // on user input
  logIn.style.display = "block";
  logIn.firstElementChild.value = "";
};

// Initial frontend setup
updateCO2(5000, 5000);
updateCurrentTime("", "-");
updateGoalTime("-");
controlGuideInitDislay("block");
controlHelpGuideDisplay("none");
