import { Game } from "./classes.js";
import { getUser } from "./api.js";
import { quizModal } from "./quiz.js";

const nameSubmitBtn = document.getElementById("name-submit");
const nameInput = document.getElementById("userName");
const alertMessage = document.querySelector(".alert");
const inputContainer = document.querySelector(".textarea_container");
const userNameDisplay = document.getElementById("user-profile");

nameSubmitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const userName = nameInput.value;

  // check user name exists
  if (!userName) {
    // show alert message
    alertMessage.style.display = "block";
    setTimeout(() => {
      alertMessage.style.display = "none";
    }, "2500");
    return;
  }

  // send name data to backend and get response
  let { game_id, is_new_user, max_score } = await getUser(userName);
  Game.setGameId(game_id);
  Game.setUserName(userName);

  // turn off name input field.
  inputContainer.style.display = "none";

  // display greeting
  userNameDisplay.textContent = `${Game.userName}`;

  // open quiz model
  const quizPermission = document.getElementById("quiz-permission");
  const quizResult = document.getElementById("quiz-result");

  quizModal.style.display = "block";
  // turn of the previous screen
  if (quizResult.style.display !== "none") quizResult.style.display = "none";

  quizPermission.style.display = "block";

  // display greeting on quiz modal
  const greeting = document.getElementById("greeting");
  greeting.textContent = `Hello, ${Game.userName}!`;
});
