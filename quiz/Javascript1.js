const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-Indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

//push the questions into availableQuestions array
function setAvailableQuestions() {
  const totalQuestion = quiz.length;
  for (let i = 0; i < totalQuestion; i++) {
    availableQuestions.push(quiz[i]);
  }
}

//set question number and question and options
function getNewQuestion() {
  //set question number
  questionNumber.innerHTML =
    "Question" + (questionCounter + 1) + " of " + quiz.length;
  // set question text
  // get random question
  const questionIndex =
    availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
  currentQuestion = questionIndex;
  questionText.innerHTML = currentQuestion.question;
  // get the position of 'questionIndex' from the availableQuestion Array;
  const index1 = availableQuestions.indexOf(questionIndex);
  //remove the 'questionIndex'  from the availableQuestion Array, so that the question does not repeat
  availableQuestions.splice(index1, 1);

  //set options
  //get the length of options
  const optionLen = currentQuestion.options.length;
  // push options into availableOptions Array
  for (let i = 0; i < optionLen; i++) {
    availableOptions.push(i);
  }

  optionContainer.innerHTML = "";
  //create options in html
  for (let i = 0; i < optionLen; i++) {
    //random option
    const optonIndex =
      availableOptions[Math.floor(Math.random() * availableOptions.length)];
    //get the position of 'optonIndex'
    const index2 = availableOptions.indexOf(optonIndex);
    availableQuestions.splice(index2, 1);
    const option = document.createElement("div");
    option.innerHTML = currentQuestion.options[optonIndex];
    option.id = optonIndex;
    option.className = "option";
    optionContainer.appendChild(option);
    option.setAttribute("onclick", "getResult(this)");
  }

  questionCounter++;
}

//get the result of current attempt question
function getResult(element) {
  const id = parseInt(element.id);
  // get the answer by comparing the id of clicked option
  if (id === currentQuestion.answer) {
    element.classList.add("correct");
    // add indicator to correct mark
    updateAnswerIndicator("correct");
    correctAnswers++;
  } else {
    element.classList.add("wrong");
    // add indicator to wrong mark
    updateAnswerIndicator("wrong");
  }
}
attempt++;

function answerIndicator() {
  answersIndicatorContainer.innerHTML = "";
  const totalQuestion = quiz.length;
  for (let i = 0; i < totalQuestion; i++) {
    const indicator = document.createElement("div");
    answersIndicatorContainer.appendChild(indicator);
  }
}

function updateAnswerIndicator(markType) {
  answersIndicatorContainer.children[questionCounter - 1].classlist.add(
    markType
  );
}

function next() {
  if (questionCounter === quiz.length) {
    quizOver();
  } else {
    getNewQuestion();
  }
}

function quizOver() {
  //hide quizBox
  quizBox.classList.add("hide");
  //show resultBox
  resultBox.classList.remove("hide");
  quizResult();

  //get the quiz result
  function quizResult() {
    resultBox.querySelector(".total-question").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML =
      attempt - correctAnswers;
    const percentage = (correctAnswers / quiz.length) * 100;
    resultBox.querySelector(".percentage").innerHTML =
      percentage.toFixed(2) + "%";
    resultBox.querySelector(".total-score").innerHTML =
      correctAnswers + "/" + quiz.length;
  }

  function resetQuiz() {
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
  }

  function tryAgainQuiz() {
    //hide the resultBox
    resultBox.classList.add("hide");
    //show the quizBox
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();
  }

  function startGame() {
    resultBox.classList.add("hide");
    homeBox.classList.remove("hide");
  }

  // ####STARTING POINT####
  function startQuiz() {
    // hide home box
    homeBox.classList.add("hide");
    // show quiz Box
    homeBox.classList.remove("hide");

    // first we set all questions in availableQuestions array
    setAvailableQuestions();
    //second we will call getNewQuestion(); function
    getNewQuestion();
    //to create indicator of answers
    answerIndicator();
  }

  window.onload = function () {
    homeBox.querySelector(".total-question").innerHTML = quiz.length;
  };
}
