import { fetchNewGoal } from "./api.js";
import { displayMap, updateGoalTime, logOut } from "./game.js";
import { Game } from "./classes.js";

export function closeMessage() {
  popup.close();
}

export function successMessage() {
  let message = document.getElementById("popupMessage");
  let playNextBtn = document.getElementById("rightButton");

  message.innerHTML = `Congratulations! <br> You found a right timezones`;
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
  let tryAgainBtn = document.getElementById("rightButton");

  message.innerHTML = `Oops!!! <br> You are in wrong timezones.`;
  tryAgainBtn.innerHTML = `Try Again`;

  tryAgainBtn.addEventListener("click", () => {
    closeMessage();
    return;
  });
}

export function gameOverMessage() {
  const popup = document.getElementById("popup");
  popup.show();

  let message = document.getElementById("popupMessage");
  let endBtn = document.getElementById("rightButton");

  message.innerHTML = `Game over.<br>Your CO2 budget is over.`;
  endBtn.innerHTML = `END GAME`;

  endBtn.addEventListener("click", () => {
    displayMap();
    closeMessage();
    logOut();
    // change greeting
  });
}
