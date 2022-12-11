import { displayMap, addMapMarkers } from "./game.js";
import { fetchAllAirports, getResult } from "./api.js";
import "./quiz.js";
import "./header.js";

displayMap();

window.addEventListener("load", async () => {
  const airports = await fetchAllAirports();
  addMapMarkers(airports);
  console.log(airports);
});

// Version2: Add functionality to check if the user already exist
// by adding message alert. ex) Is that you, (name)?
