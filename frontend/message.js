import { fetchNewGoal } from "./api.js";
import { displayMap, updateGoalTime } from "./game.js";
import { Game } from "./classes.js";

export function closeMessage() {
  popup.close();
}

export function successMessage() {
  console.log("success");
  let message = document.getElementById("popupMessage");
  // let leftButton = document.getElementById("leftButton");
  let playNextBtn = document.getElementById("rightButton");

  message.innerHTML = `Congratulations! <br> You found a right timezones`;
  // leftButton.innerHTML = `Exit`;
  playNextBtn.innerHTML = `Play Next`;

  const popup = document.getElementById("popup");
  popup.show();

  // eventlistner
  playNextBtn.addEventListener("click", async () => {
    // fetch new goal
    const buttonText = playNextBtn.textContent;

    if (buttonText == "Play Next") {
      const data = await fetchNewGoal(Game.gameId, Game.currentAirport);
      const { new_goal } = data;

      Game.setNewGoal(new_goal);
      updateGoalTime(Game.goalTime);
      closeMessage();
    }
  });
}

export function failureMessage() {
  const popup = document.getElementById("popup");
  popup.show();
  let message = document.getElementById("popupMessage");
  // let leftButton = document.getElementById("leftButton");
  let tryAgainBtn = document.getElementById("rightButton");

  message.innerHTML = `Oops!!! <br> You are in wrong timezones.`;
  // leftButton.innerHTML = `Exit`;
  tryAgainBtn.innerHTML = `Try Again`;

  tryAgainBtn.addEventListener("click", () => {
    // try the same goal again.
    closeMessage();
    return;
  });
}

export function gameOverMessage() {
  const popup = document.getElementById("popup");
  popup.show();
  let message = document.getElementById("popupMessage");
  // let leftButton = document.getElementById("leftButton");
  let endBtn = document.getElementById("rightButton");

  message.innerHTML = `Game over.<br>Your CO2 budget is over.`;
  // leftButton.innerHTML = `Exit`;
  endBtn.innerHTML = `END GAME`;

  endBtn.addEventListener("click", () => {
    console.log("gameover");
    displayMap();
    closeMessage();
  });
}
