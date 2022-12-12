import {
  fetchAllAirports,
  fetchNewGame,
  getResult,
  fetchNewGoal,
} from "./api.js";
import { Game } from "./classes.js";
import {
  closeMessage,
  successMessage,
  failureMessage,
  gameOverMessage,
} from "./message.js";

// Init the map
const map = L.map("map", { tap: false });

export const displayMap = () => {
  L.tileLayer("https://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}", {
    maxZoom: 20,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }).addTo(map);

  map.setView([60, 25], 7);
};

// const popup = L.popup(); // show pop up
const blueIcon = L.divIcon({ className: "blue-icon" });
const greenIcon = L.divIcon({ className: "green-icon" });

const airportMarkers = L.featureGroup().addTo(map);
airportMarkers.clearLayers();

export const addMapMarkers = (airports) => {
  airports.map((airport) => {
    const marker = L.marker([airport.latitude, airport.longitude])
      .addTo(map)
      .setIcon(blueIcon)
      .bindPopup(`<b>${airport.name}</b>`);

    marker.on("mouseover", function (e) {
      this.openPopup();
    });

    marker.on("mouseout", function (e) {
      this.closePopup();
    });

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

//CO2 INDICATOR
// function to update CO2 indicator
function updateCO2(CO2budget, CO2left) {
  let percentCalculator = (CO2left * 100) / CO2budget;
  let percentCO2Left = percentCalculator.toString() + "%";
  document.getElementById("budget").innerHTML =
    CO2left + " of " + CO2budget + " CO2 Budget";
  document.getElementById("co2-container").style.width = percentCO2Left;
}

//function to update current time in the right panel
function updateCurrentTime(currentLocation, currentTime) {
  let value = document.getElementById("currentTime");
  value.innerHTML = currentLocation + "<br>Current time <br><br>" + currentTime;
}

//function to update goal time in the right panel
export function updateGoalTime(goalTime) {
  let gtime = document.getElementById("goalTime");
  gtime.innerHTML = "Goal Time <br><br>" + goalTime;
}

//functions to update guide messages
function updateGuideLocation(currentAirport, currentCountry, currentTime) {
  let location = document.getElementById("timeTravelerLocation");
  location.innerHTML = `Time Traveler: <br>You are now in ${currentAirport} in ${currentCountry}. Local time is ${currentTime}.`;
}

function updateGuideGoal(goalTime) {
  let timeToFind = document.getElementById("timeTravelerGoal");
  timeToFind.innerHTML = `Time Traveler: <br>Please find the airport located in the goal time zone. The goal time is ${goalTime}.`;
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

  console.log(Game.currentLongitude, Game.currentLatitude);

  // setup frontend
  updateCO2(Game.co2budget, Game.co2left);
  updateCurrentTime(Game.currentAirport, Game.currentTime);
  updateGoalTime(Game.goalTime);
  updateGuideLocation(Game.currentAirport, "Finland", Game.currentTime);
  updateGuideGoal(Game.goalTime);
};

const runGame = async (airport) => {
  // transform airport name
  Game.setCurrerntAirport(airport);

  // fetch result
  const resultData = await getResult(Game.gameId, airport);
  const { current_time, co2budget, success, game_over } = resultData;

  // display message
  Game.setCurrerntAirport(airport);
  Game.setTime(current_time, "current");
  Game.setCo2(co2budget, "co2left");
  Game.setGameOver(game_over);

  updateCO2(5000, Game.co2left);
  updateCurrentTime(Game.currentAirport, Game.currentTime);

  if (game_over) {
    gameOverMessage();
    return;
  }

  if (success) {
    successMessage();
  } else if (!success) {
    failureMessage();
  }

  // if (game_over) {
  //   gameOverMessage();
  // }
};

//TESTING VALUES
updateCO2(5000, 5000);
updateCurrentTime("Helsinki Airport", "6:30");
updateGoalTime("4:30");
updateGuideLocation("Helsinki Airport", "Finland", "6:30");
updateGuideGoal("4:30");
