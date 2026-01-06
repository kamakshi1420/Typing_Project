const sentences = [
  "The sun rises in the east.",
  "Practice improves any skill.",
  "Honesty builds strong trust.",
  "Time never waits for anyone.",
  "Hard work leads to success.",
  "Learning never truly stops.",
  "Mistakes help us grow.",
  "Health is real wealth.",
  "Kindness costs nothing.",
  "Knowledge gives confidence.",
  "Patience brings good results.",
  "Small steps matter daily.",
  "Consistency beats talent.",
  "Experience teaches lessons.",
  "Focus improves performance.",
  "Discipline creates freedom.",
  "Effort brings improvement.",
  "Respect earns respect.",
  "Change is part of life.",
  "Self belief builds strength."
];

const box = document.getElementById("box");
const inp = document.getElementById("inp");
const t = document.getElementById("t");
const w = document.getElementById("w");

let timeLeft = 60;
let timer = null;
let started = false;

function loadSentence() {
  const sentence = sentences[Math.floor(Math.random() * sentences.length)];

  box.innerHTML = "";
  inp.value = "";

  for (let i = 0; i < sentence.length; i++) {
    const span = document.createElement("span");
    span.innerText = sentence[i];
    span.style.color = "black";
    box.appendChild(span);
  }

  box.children[0].style.backgroundColor = "#ddd";

  timeLeft = 60;
  t.innerText = timeLeft;
  w.innerText = 0;
  started = false;

  clearInterval(timer);
  inp.disabled = false;
  inp.focus();
}

function typeCheck() {
  if (!started) {
    timer = setInterval(runTimer, 1000);
    started = true;
  }

  const letters = box.children;
  const typed = inp.value;

  let allCorrect = true;

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
    letters[typed.length].style.backgroundColor = "#ddd";
  }

  let correctCount = 0;
  for (let i = 0; i < letters.length; i++) {
    if (letters[i].style.color === "green") {
      correctCount++;
    }
  }

  const usedTime = 60 - timeLeft;
  if (usedTime > 0) {
    w.innerText = Math.round((correctCount / 5) / (usedTime / 60));
  }

  if (typed.length === letters.length && allCorrect) {
    loadSentence();
  }
}

function runTimer() {
  if (timeLeft > 0) {
    timeLeft--;
    t.innerText = timeLeft;
  } else {
    clearInterval(timer);
    inp.disabled = true;
  }
}

inp.addEventListener("input", typeCheck);
box.addEventListener("click", function () {
  inp.focus();
});

loadSentence();
