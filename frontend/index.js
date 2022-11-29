import { displayMap, addMapMarkers } from "./game.js";
import { fetchAllAirports } from "./api.js";

const mapDisplay = document.getElementById("map");

displayMap();

mapDisplay.addEventListener("click", async () => {});

window.addEventListener("load", async () => {
  const airports = await fetchAllAirports("/airport/all");
  addMapMarkers(airports);
});
