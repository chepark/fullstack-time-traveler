import { displayMap } from "./game.js";
import { fetchAllAirports } from "./api.js";

const mapDisplay = document.getElementById("map");

displayMap();

mapDisplay.addEventListener("click", async () => {
  await fetchAllAirports("/airport/all");
});
