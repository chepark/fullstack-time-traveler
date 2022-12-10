import quizData from "./data/quiz.json" assert { type: "json" };

// All logics regarding quiz
const quizModal = document.getElementById("quiz-modal");
const quizPermission = document.getElementById("quiz-permission");
const quiz = document.getElementById("quiz");
const closeBtn = document.querySelector(".modal-close");
const rejectBtn = document.getElementById("reject-quiz");
const startBtn = document.getElementById("try-quiz");

let selectedQuiz = [];
let selectedQuizHtml = [];
let quizCounter = 0;
let correctAnswers = 0;
let userChoice;

const red = "#e2393e";
const green = "#58db8f";

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
          console.log(option);
          option.parentElement.style.backgroundColor = green;
          option.parentElement.style.color = "white";
          option.nextElementSibling.classList.add("answer");
        }
      });
    } else {
      correctAnswers += 1;
    }
    // check user answer
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
      console.log("show result");
      console.log("correct answer counter", correctAnswers);
    }
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
  // handleNextQuiz();
});
