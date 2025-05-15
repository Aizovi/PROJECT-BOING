const body = document.querySelector("body"),
      modeSwitch = body.querySelector(".toggle-switch"),
      modeText = body.querySelector(".mode-text");

// Apply dark mode from saved setting
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark");
  modeText.innerText = "Light Mode";
}

modeSwitch.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    modeText.innerText = "Light Mode";
    localStorage.setItem("theme", "dark");
  } else {
    modeText.innerText = "Dark Mode";
    localStorage.setItem("theme", "light");
  }
});

window.addEventListener("load", () => {
  document.body.classList.remove("preload");
});

function showLessons() {
    // Show lessons section, hide others
    document.getElementById("lessons-page").style.display = "block";
    document.querySelector(".lessons-container").style.display = "none";
    document.getElementById("quiz-section").style.display = "none";
    document.getElementById("main-wrapper").style.display = "none";
  
  
    // Sidebar active state
    document.querySelectorAll(".nav-link").forEach(link => link.classList.remove("active"));
    document.querySelectorAll(".nav-link")[2].classList.add("active"); // Lessons link
  }

function showLessonMap() {
  // Hide all other views
  document.getElementById("lessons-page").style.display = "none";

  // Show the map
  document.getElementById("main-wrapper").style.display = "block";

  // Reset map visual state
  document.querySelector(".background").style.display = "block";
  document.querySelector(".buttons").style.display = "block";
  document.getElementById("quiz-section").style.display = "none";
  document.getElementById("quiz-section").innerHTML = `
    <h2>Physics Quiz</h2>
    <div id="quiz-box">Click a level to start!</div>
  `;

  // Sidebar highlight
  document.querySelectorAll(".nav-link").forEach(link => link.classList.remove("active"));
  document.querySelectorAll(".nav-link")[2].classList.add("active"); // Lessons

  renderStarsOnMap(); 
}

function goBackToLessonCards() {
  document.getElementById("main-wrapper").style.display = "none";
  document.getElementById("lessons-page").style.display = "block";
}

let questions = [];
let current = 0;
let score = 0;

async function startQuiz() {
  try {
    const response = await fetch('kinematics_questions.json');
    questions = await response.json();
    current = 0;
    score = 0;

    // Hide map
    document.querySelector(".background").style.display = "none";
    document.querySelector(".buttons").style.display = "none";

    // Show quiz
    document.getElementById("quiz-section").style.display = "block";
    document.getElementById("quiz-section").innerHTML = `
      <h2>Physics Quiz</h2>
      <div id="quiz-box">Loading questions...</div>
    `;

    showQuestion();
  } catch (err) {
    document.getElementById('quiz-box').innerText = '❌ Failed to load questions.';
    console.error(err);
  }
}

function showQuestion() {
  const q = questions[current];
  const box = document.getElementById('quiz-box');

  box.innerHTML = `
    <strong>Q${current + 1}:</strong> ${q.question}<br><br>
    ${q.options.map((opt, i) =>
      `<button onclick="checkAnswer('${opt}')">${String.fromCharCode(65 + i)}. ${opt}</button>`
    ).join('')}
  `;
}

function checkAnswer(selected) {
  const q = questions[current];
  const box = document.getElementById('quiz-box');
  let isCorrect = selected === q.answer;
  if (isCorrect) score++;

  box.innerHTML = `
    <strong>Q${current + 1}:</strong> ${q.question}<br><br>
    ${q.options.map((opt, i) =>
      `<button>${String.fromCharCode(65 + i)}. ${opt}</button>`
    ).join('')}
    <div class="feedback ${isCorrect ? "correct" : "wrong"}">
      ${isCorrect ? "CORRECT!" : `INCORRECT! Correct answer: ${q.answer}`}
    </div>
    <div class="solution-box">${q.explanation}</div>
    <br>
    <button onclick="nextQuestion()">Next</button>
  `;
}

function nextQuestion() {
  current++;
  if (current < questions.length) {
    showQuestion();
  } else {
    showFinalResult();
  }
}

function showFinalResult() {
  const quiz = document.getElementById("quiz-section");

  let stars = 1;
  if (score === questions.length) stars = 3;
  else if (score >= questions.length - 1) stars = 2;

  // ✅ Сохраняем звезды в localStorage
  localStorage.setItem("level1Stars", stars);

  const starsHTML = `
    <div class="stars-container">
      ${Array.from({ length: stars }, () =>
        `<img src="https://img.icons8.com/?size=100&id=tf9WJOzzs4Wo&format=png&color=FAB005" class="star" alt="star" />`
      ).join('')}
    </div>
  `;

  quiz.innerHTML = `
    <div class="result-full-clean">
      ${starsHTML}
      <h1>DONE!</h1>
      <p>Your score: ${score} / ${questions.length}</p>
      <button onclick="restartQuiz()">Try Again</button><br>
      <button onclick="goBackToLessonMap()">← Back to Map</button>
    </div>
  `;
}

function restartQuiz() {
  current = 0;
  score = 0;
  document.getElementById("quiz-section").innerHTML = `
    <h2>Physics Quiz</h2>
    <div id="quiz-box">Loading questions...</div>
  `;
  showQuestion();
}

function goBackToLessonMap() {
  document.getElementById("quiz-section").style.display = "none";
  document.querySelector(".background").style.display = "block";
  document.querySelector(".buttons").style.display = "block";

  // ✅ Render updated stars
  renderStarsOnMap();
}


function renderStarsOnMap() {
  const stars = parseInt(localStorage.getItem("level1Stars")) || 0;
  const container = document.getElementById("level1-stars-display");
  container.innerHTML = '';

  for (let i = 0; i < stars; i++) {
    const star = document.createElement("img");
    star.src = "https://img.icons8.com/?size=100&id=tf9WJOzzs4Wo&format=png&color=FAB005";
    star.alt = "star";
    star.classList.add("map-star");
    container.appendChild(star);
  }
}

const music = document.getElementById("bg-music");

function playMusic() {
  music.volume = 0.5;
  music.play().catch(e => {
    console.warn("Music play blocked by browser until interaction.");
  });
}

function pauseMusic() {
  music.pause();
}

let musicOn = true;
function toggleMusic() {
  if (musicOn) {
    pauseMusic();
  } else {
    playMusic();
  }
  musicOn = !musicOn;
}

let rabbitVisible = false;

function toggleRabbit() {
  const rabbit = document.getElementById("floating-rabbit");
  rabbitVisible = !rabbitVisible;
  rabbit.style.display = rabbitVisible ? "block" : "none";
}

const rabbitPhrases = [
  "Good luck! 🐰",
  "Wish u best luck!",
  "Get full score!",
  "You can do this!",
  "Stay calm & win 💪",
  "Big brain time 🧠"
];

function showRabbitThought() {
  const bubble = document.getElementById("rabbit-bubble");
  if (!bubble) return;

  // Pick a random phrase
  const text = rabbitPhrases[Math.floor(Math.random() * rabbitPhrases.length)];
  bubble.textContent = text;
  bubble.style.opacity = 1;

  // Hide after 4 seconds
  setTimeout(() => {
    bubble.style.opacity = 0;
  }, 4000);
}

// Show a new phrase every 8 seconds if rabbit is visible
setInterval(() => {
  const rabbit = document.getElementById("floating-rabbit");
  if (rabbit.style.display !== "none") {
    showRabbitThought();
  }
}, 8000);
