import quizData from "./data/quiz.json" assert { type: "json" };
import { red, green } from "./utils.js";
import { Game } from "./classes.js";
import { setupNewGame } from "./game.js";

// All logics regarding quiz
export const quizModal = document.getElementById("quiz-modal");
const quizPermission = document.getElementById("quiz-permission");
const quiz = document.getElementById("quiz");
const rejectBtn = document.getElementById("reject-quiz");
const startBtn = document.getElementById("try-quiz");

let selectedQuiz = [];
let selectedQuizHtml = [];
let quizCounter = 0;
let correctAnswers = 0;
let userChoice;

const handleReject = () => {
  quizModal.style.display = "none";
};

const selectRandomQuiz = () => {
  for (let i = 0; i < 5; i++) {
    let index = Math.floor(Math.random() * 10);
    selectedQuiz.push(quizData[index]);
  }
};

const formatQuizInHtml = () => {
  selectedQuiz.map((quiz, index) => {
    const quizNumber = index + 1;
    const quizInHtml = `
    <div class="quiz-status text-sub">QUESTION ${quizNumber} OUT OF 5</div>
    <div class="text-main text-main__normal">${quiz.question}</div>
    <fieldset class="quiz-options" data-answer="${quiz.options[quiz.answer]}">
        <label class="option-wrapper hover">${quiz.options[0]}
            <input class="quiz-option" type="radio" value="${
              quiz.options[0]
            }" name="choice">
            <span class="checkmark"></span>
        </label>
        <label class="option-wrapper hover">${quiz.options[1]}
            <input class="quiz-option" type="radio" value="${
              quiz.options[1]
            }" name="choice">
            <span class="checkmark"></span>
        </label>
        <label class="option-wrapper hover">${quiz.options[2]}
            <input class="quiz-option" type="radio" value="${
              quiz.options[2]
            }" name="choice">
            <span class="checkmark"></span>
        </label>
        <label class="option-wrapper hover">${quiz.options[3]}
            <input class="quiz-option" type="radio" value="${
              quiz.options[3]
            }" name="choice">
            <span class="checkmark"></span>
        </label>
    </fieldset>
    <div class="quiz-btns" data-submitted="false">
        <button id="quiz-submit" class="btn-bg__grey">SUBMIT</button>
        <button id="quiz-next" class="btn-bg__grey">NEXT QUIZ</button>
    </div>
    `;
    selectedQuizHtml.push(quizInHtml);
  });
};

const displayQuiz = () => {
  // turn off quiz-permission
  quizPermission.style.display = "none";

  // turn on quiz
  quiz.style.display = "block";

  const index = quizCounter;
  const quizOnStage = selectedQuizHtml[index];
  quiz.innerHTML = quizOnStage;
};

const handleQuiz = () => {
  // add eventlistener to each option.
  const options = document.querySelectorAll("input.quiz-option");
  options.forEach((option) => {
    option.addEventListener("click", () => {
      userChoice = option;
    });
  });

  handleAnswerSubmit();
};

const handleAnswerSubmit = () => {
  const submitBtn = document.getElementById("quiz-submit");
  const nextBtn = document.getElementById("quiz-next");

  submitBtn.addEventListener("click", () => {
    quizCounter += 1;

    // check user selected option
    if (!userChoice.value) return;

    const optionList = document.querySelector(".quiz-options");
    const answer = optionList.dataset.answer;

    // hide submit button, show next button
    submitBtn.style.display = "none";
    nextBtn.style.display = "block";

    // mark results
    if (userChoice.value !== answer) {
      // red on wrong choice
      userChoice.parentElement.style.backgroundColor = red;
      const radioMarker = userChoice.nextElementSibling;
      radioMarker.classList.add("wrong");

      // green on answer
      const options = document.querySelectorAll("input.quiz-option");
      options.forEach((option) => {
        if (option.value == answer) {
          option.parentElement.style.backgroundColor = green;
          option.parentElement.style.color = "white";
          option.nextElementSibling.classList.add("answer");
        }
      });
    } else {
      correctAnswers += 1;
    }
  });
};

const runQuiz = () => {
  displayQuiz();
  handleQuiz();
  handleNextQuiz();
};

const handleNextQuiz = () => {
  const nextBtn = document.getElementById("quiz-next");
  nextBtn.addEventListener("click", () => {
    if (quizCounter < 5) runQuiz();
    else {
      displayResult();
      handleStartGame();
    }
  });
};

const displayResult = () => {
  // Turn off quiz
  quiz.style.display = "none";

  const quizResult = document.getElementById("quiz-result");
  quizResult.style.display = "block";
  quizResult.innerHTML = `
  <div class="modal-content">
      <div class="text-main text-main__medium">
          Congratulations!
      </div>
      <img class="confetti" src="./assets/img/confetti.svg" alt="confetti">
      <div id="quiz-score" class="text-main text-main__normal">You've got ${correctAnswers} points out of 5.</div>
      <div class="text-main text-main__normal text-yellow">You earned a low-emission flight.</div>
      <button id="start-game" class="btn__green">START GAME</button>
  </div>
  `;
};

const handleStartGame = () => {
  const quizResult = document.getElementById("quiz-result");
  const startBtn = document.getElementById("start-game");

  startBtn.addEventListener("click", async () => {
    Game.setCo2Benefit(correctAnswers);
    quizModal.style.display = "none";

    // fetchNewGame
    await setupNewGame();
  });
};

// event listeners
rejectBtn.addEventListener("click", () => {
  handleReject();
});

startBtn.addEventListener("click", () => {
  selectRandomQuiz();
  formatQuizInHtml();

  runQuiz();
});
