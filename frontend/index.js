import { displayMap, addMapMarkers } from "./game.js";
import { fetchAllAirports, getResult } from "./api.js";

displayMap();

window.addEventListener("load", async () => {
  const airports = await fetchAllAirports();
  addMapMarkers(airports);
  console.log(airports);
});

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
// Version2: Add functionality to check if the user already exist
// by adding message alert. ex) Is that you, (name)?


