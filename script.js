const sentences = [
  "Believe in yourself every day",
  "Small efforts lead to big success",
  "Practice makes you better",
  "Never give up on your goals",
  "Hard work always pays off",
  "Learn from your mistakes",
  "Stay focused on your path",
  "Consistency brings great results",
  "Keep moving forward slowly",
  "Success comes with patience",
  "Do your best every day",
  "Challenges make you stronger",
  "Stay positive in difficult times",
  "Dream big and work hard",
  "Progress is better than perfection",
  "Discipline builds a strong future",
  "Confidence grows with effort",
  "Failure is a step to success",
  "Believe and achieve your goals",
  "Your effort matters every day"
];


const box = document.getElementById("box");
const input = document.getElementById("inp");
const timeDisplay = document.getElementById("time");
const wpmDisplay = document.getElementById("result");
const accuracyDisplay = document.getElementById("accuracy");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

let timer = null;
let timeLeft = 60;
let testStarted = false;
let correctCount = 0;
let totalTyped = 0;

function loadSentence() {
  box.innerHTML = "";
  input.value = "";

  const sentence = sentences[Math.floor(Math.random() * sentences.length)];

  for (let i = 0; i < sentence.length; i++) {
    const span = document.createElement("span");
    span.innerText = sentence[i];
    box.appendChild(span);
  }

  box.children[0].style.backgroundColor = "#eee";
}

function startTest() {
  if (testStarted) return;

  testStarted = true;
  timeLeft = 60;
  correctCount = 0;
  totalTyped = 0;

  timeDisplay.innerText = timeLeft;
  wpmDisplay.innerText = 0;
  accuracyDisplay.innerText = "0%";

  input.disabled = false;
  input.focus();

  loadSentence();

  timer = setInterval(() => {
    timeLeft--;
    timeDisplay.innerText = timeLeft;
    if (timeLeft <= 0) stopTest();
  }, 1000);
}

function stopTest() {
  testStarted = false;
  clearInterval(timer);
  input.disabled = true;

  const minutes = (60 - timeLeft) / 60;
  const words = correctCount / 5;
  const wpm = minutes > 0 ? Math.round(words / minutes) : 0;

  const accuracy =
    totalTyped > 0
      ? Math.round((correctCount / totalTyped) * 100)
      : 0;

  wpmDisplay.innerText = wpm;
  accuracyDisplay.innerText = accuracy + "%";
}

function checkTyping() {
  if (!testStarted) return;

  const letters = box.children;
  const typed = input.value;
  let allCorrect = true;

  totalTyped = typed.length;

  for (let i = 0; i < letters.length; i++) {
    letters[i].style.backgroundColor = "transparent";

    if (typed[i] == null) {
      letters[i].style.color = "black";
      allCorrect = false;
      continue;
    }

    if (typed[i] === letters[i].innerText) {
      letters[i].style.color = "green";
    } else {
      letters[i].style.color = "red";
      allCorrect = false;
    }
  }

  if (typed.length < letters.length) {
    letters[typed.length].style.backgroundColor = "#eee";
  }

  if (typed.length === letters.length && allCorrect) {
    correctCount += letters.length;
    loadSentence();
  }
}

input.addEventListener("input", checkTyping);
startBtn.addEventListener("click", startTest);
stopBtn.addEventListener("click", stopTest);

input.disabled = true;
