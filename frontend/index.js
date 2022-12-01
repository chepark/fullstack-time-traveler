import { displayMap, addMapMarkers } from "./game.js";
import { fetchAllAirports } from "./api.js";

displayMap();

window.addEventListener("load", async () => {
  const airports = await fetchAllAirports();
  addMapMarkers(airports);
  console.log(airports);
});
