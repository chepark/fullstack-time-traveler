import { resizeContainer } from "./utils/index.js";
const container = document.querySelector(".container");

const submitButton = document.getElementById("submit-btn");
submitButton.addEventListener("click", () => {
  // when submit button is clicked
  // moves to the quiz page.
  location.replace("./quiz.html");
});

window.addEventListener("load", resizeContainer(container));
window.addEventListener("resize", resizeContainer(container));
