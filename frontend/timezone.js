//TIMEZONE MAP AND HELP BUTTON
let helpButton = document.getElementById("helpButton");
let timezonemap = document.getElementById("timezoneMap");
let closeButton = document.getElementById("closeButton");

//Help button color change on hover
const svgImage = document.getElementById("svgButton");
const helpText = document.getElementById("helpButtonText");

helpButton.addEventListener("click", () => {
  showMap();
});

closeButton.addEventListener("click", () => {
  closeMap();
});

function showMap() {
  timezonemap.show();
}

function closeMap() {
  timezonemap.close();
}

helpButton.addEventListener("mouseover", () => {
  changeColor();
});

helpButton.addEventListener("mouseout", () => {
  noHoverColor();
});

function changeColor() {
  svgImage.style.fill = "#58db8f";
  helpText.style.color = "#58db8f";
}

function noHoverColor() {
  svgImage.style.fill = "#8bcca6";
  helpText.style.color = "#8bcca6";
}
