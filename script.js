const questions = [
  {
    question: "What is the largest lake in the world?",
    answers: [
      { text: "Caspian Sea", correct: false },
      { text: "Baikal", correct: true },
      { text: "Lake Superior", correct: false },
      { text: "Ontario", correct: false },
    ],
  },
  {
    question: "Which planet in the solar system is known as the 'Red Planet'?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Earth", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
    ],
  },
  {
    question: "Which river is the longest in the world?",
    answers: [
      { text: "Amazon", correct: false },
      { text: "Mississippi", correct: false },
      { text: "Nile", correct: true },
      { text: "Yangtze", correct: false },
    ],
  },
  {
    question: "What gas is used to extinguish fires?",
    answers: [
      { text: "Oxygen", correct: false },
      { text: "Nitrogen", correct: true },
      { text: "Carbon dioxide", correct: false },
      { text: "Hydrogen", correct: false },
    ],
  },
  {
    question: "Which of the following planets is not a gas giant?",
    answers: [
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
      { text: "Uranus", correct: false },
    ],
  },
];

const questionElement = document.querySelector(".question");
const answerButton = document.querySelector(".answer-buttons");
const nextButton = document.querySelector("#next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestions();
  console.log('"start quiz works');
}

function showQuestions() {
  resetState();
  let currQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currQuestion.question;

  currQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const isCorrect=selectedButton.dataset.correct === "true"
  if (isCorrect) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function handleNextQuestion(){
  currentQuestionIndex++;
  if(currentQuestionIndex<questions.length){
    showQuestions();
  }
  else{
    showScore();
  }
}

function showScore(){
  resetState();
  questionElement.innerHTML=`You Scored ${score} Out of ${questions.length}`;
  nextButton.innerHTML="Play Again"
  nextButton.style.display="block"
}

nextButton.addEventListener("click",()=>{
  if(currentQuestionIndex<questions.length){
    handleNextQuestion();
  }else{
    startQuiz();
  }
})
startQuiz();
