// === Quiz Data (dynamic question loading from this array) ===
const quizData = [
  {
    question: "Which language is used to add interactivity to web pages?",
    options: ["HTML", "CSS", "JavaScript", "SQL"],
    answer: 2,
    explanation: "JavaScript makes web pages interactive and dynamic."
  },
  {
    question: "Inside which HTML element do we put JavaScript code?",
    options: ["<javascript>", "<script>", "<js>", "<code>"],
    answer: 1,
    explanation: "JavaScript is placed inside the <script> tag."
  },
  {
    question: "How do you print a message in the browser console?",
    options: [
      "console.print('Hello')",
      "log.console('Hello')",
      "console.log('Hello')",
      "print.console('Hello')"
    ],
    answer: 2,
    explanation: "console.log() is used to display messages in the console."
  },
  {
    question: "Which symbol is used for single-line comments in JavaScript?",
    options: ["<!-- -->", "//", "#", "/* */"],
    answer: 1,
    explanation: "// is used for single-line comments."
  },
  {
    question: "Which keyword declares a block-scoped variable?",
    options: ["var", "let", "const", "both let and const"],
    answer: 3,
    explanation: "Both let and const are block-scoped."
  },
  {
    question: "Which keyword prevents variable reassignment?",
    options: ["var", "let", "static", "const"],
    answer: 3,
    explanation: "const makes variables constant (unchangeable)."
  },
  {
    question: "Which operator is used to compare value and type?",
    options: ["==", "=", "===", "!="],
    answer: 2,
    explanation: "=== checks both value and data type."
  },
  {
    question: "How do you create a function in JavaScript?",
    options: [
      "function = myFunc()",
      "function myFunc()",
      "def myFunc()",
      "create myFunc()"
    ],
    answer: 1,
    explanation: "Functions start with the keyword function."
  },
  {
    question: "What will typeof [] return?",
    options: ["array", "object", "list", "null"],
    answer: 1,
    explanation: "Arrays are treated as objects in JavaScript."
  },
  {
    question: "How do you write an IF statement in JavaScript?",
    options: [
      "if i == 5 then",
      "if (i == 5)",
      "if i = 5",
      "if i == 5 {}"
    ],
    answer: 1,
    explanation: "JavaScript uses parentheses in if statements."
  },
  {
    question: "Which event occurs when the user clicks on an element?",
    options: ["onchange", "onload", "onclick", "onmouseover"],
    answer: 2,
    explanation: "onclick is triggered by mouse clicks."
  },
  {
    question: "Which method removes the last element in an array?",
    options: ["pop()", "push()", "shift()", "delete()"],
    answer: 0,
    explanation: "pop() removes the last item."
  },
  {
    question: "Which method adds an element to the end of an array?",
    options: ["add()", "push()", "append()", "insert()"],
    answer: 1,
    explanation: "push() adds elements at the end."
  },
  {
    question: "Which operator assigns a value?",
    options: ["*", "==", "=", "==="],
    answer: 2,
    explanation: "= is the assignment operator."
  },
  {
    question: "Which method converts JSON to JavaScript object?",
    options: ["JSON.parse()", "JSON.stringify()", "JSON.convert()", "JSON.toObject()"],
    answer: 0,
    explanation: "JSON.parse() converts JSON to a JavaScript object."
  },
  {
    question: "Which method converts a JavaScript object to JSON?",
    options: ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.convert()"],
    answer: 1,
    explanation: "JSON.stringify() converts objects to JSON."
  },
  {
    question: "Which statement is used to stop a loop?",
    options: ["exit", "stop", "break", "end"],
    answer: 2,
    explanation: "break exits a loop immediately."
  },
  {
    question: "Which loop is best when the number of iterations is known?",
    options: ["while", "for", "do-while", "foreach"],
    answer: 1,
    explanation: "for loop is preferred when iterations are known."
  },
  {
    question: "What is NaN?",
    options: [
      "Not Allowed Name",
      "New Array Number",
      "Not a Number",
      "Null and Nothing"
    ],
    answer: 2,
    explanation: "NaN means Not a Number."
  },
  {
    question: "Which method selects an element by ID?",
    options: [
      "document.query()",
      "getElementByClass()",
      "document.getElementById()",
      "document.select()"
    ],
    answer: 2,
    explanation: "getElementById() is used to select elements by ID."
  }
];


// === State ===
let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let hasAnswered = false;

// Timer state
const TIMER_DURATION = 15; // seconds
let timeLeft = TIMER_DURATION;
let timerId = null;

// High score state
const HIGH_SCORE_KEY = "quizHighScore";
let highScore = { score: 0, total: 0, percentage: 0 };

// Review state
let userAnswers = [];

// === DOM Elements ===
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const progressText = document.getElementById("progress-text");
const scoreText = document.getElementById("score-text");
const progressBar = document.getElementById("progress-bar");
const timerText = document.getElementById("timer-text");
const highScoreText = document.getElementById("high-score-text");

const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const finalScoreEl = document.getElementById("final-score");
const totalQuestionsEl = document.getElementById("total-questions");
const resultMessageEl = document.getElementById("result-message");
const resultBadgeEl = document.getElementById("result-badge");
const playAgainBtn = document.getElementById("play-again-btn");
const reviewContainer = document.getElementById("review-container");

// === Utility: Shuffle array (Fisher–Yates) ===
function shuffleArray(arr) {
  const copy = arr.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// === High score helpers ===
function loadHighScore() {
  try {
    const stored = localStorage.getItem(HIGH_SCORE_KEY);
    if (stored) {
      highScore = JSON.parse(stored);
    }
  } catch (e) {
    // ignore if localStorage is blocked
  }
  updateHighScoreDisplay();
}

function saveHighScoreIfNeeded(currentScore, total) {
  const percentage = Math.round((currentScore / total) * 100);
  if (percentage > (highScore.percentage || 0)) {
    highScore = { score: currentScore, total, percentage };
    try {
      localStorage.setItem(HIGH_SCORE_KEY, JSON.stringify(highScore));
    } catch (e) {
      // ignore storage errors
    }
  }
  updateHighScoreDisplay();
}

function updateHighScoreDisplay() {
  if (!highScore.total) {
    highScoreText.textContent = "Best: 0 / 0 (0%)";
  } else {
    highScoreText.textContent = `Best: ${highScore.score} / ${highScore.total} (${highScore.percentage}%)`;
  }
}

// === Timer helpers ===
function startTimer() {
  clearTimer();
  timeLeft = TIMER_DURATION;
  updateTimerDisplay();

  timerId = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      timeLeft = 0;
      updateTimerDisplay();
      clearTimer();
      handleTimeUp();
    } else {
      updateTimerDisplay();
    }
  }, 1000);
}

function clearTimer() {
  if (timerId !== null) {
    clearInterval(timerId);
    timerId = null;
  }
}

function updateTimerDisplay() {
  timerText.textContent = `⏱ ${timeLeft}s`;
  timerText.classList.toggle("timer-safe", timeLeft >= 6);
  if (timeLeft <= 5) {
    timerText.classList.remove("timer-safe");
  }
}

// === Initialize quiz ===
function startQuiz() {
  shuffledQuestions = shuffleArray(quizData);
  currentQuestionIndex = 0;
  score = 0;
  hasAnswered = false;
  userAnswers = [];

  quizScreen.style.display = "block";
  resultScreen.style.display = "none";
  restartBtn.style.display = "inline-flex";
  nextBtn.disabled = true;
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";

  updateScoreDisplay();
  renderQuestion();
}

// === Render current question ===
function renderQuestion() {
  hasAnswered = false;
  nextBtn.disabled = true;
  feedbackEl.textContent = "";
  feedbackEl.className = "feedback";

  const current = shuffledQuestions[currentQuestionIndex];

  questionText.textContent = current.question;

  // Update progress text and bar
  const currentNumber = currentQuestionIndex + 1;
  const total = shuffledQuestions.length;
  progressText.textContent = `Question ${currentNumber} / ${total}`;
  progressBar.style.width = `${(currentNumber / total) * 100}%`;

  // Update score display
  updateScoreDisplay();

  // Render options
  optionsContainer.innerHTML = "";
  const labels = ["A", "B", "C", "D", "E", "F"];
  current.options.forEach((optionText, index) => {
    const button = document.createElement("button");
    button.className = "option-btn";
    button.setAttribute("data-index", index);

    const labelSpan = document.createElement("span");
    labelSpan.className = "option-label";
    labelSpan.textContent = labels[index] || "";

    const textSpan = document.createElement("span");
    textSpan.className = "option-text";
    textSpan.textContent = optionText;

    button.appendChild(labelSpan);
    button.appendChild(textSpan);

    button.addEventListener("click", handleOptionClick);
    optionsContainer.appendChild(button);
  });

  // Start timer for this question
  startTimer();
}

// === Handle option selection ===
function handleOptionClick(e) {
  if (hasAnswered) return; // prevent multiple answers

  hasAnswered = true;
  clearTimer();

  const selectedBtn = e.currentTarget;
  const selectedIndex = Number(selectedBtn.getAttribute("data-index"));
  const current = shuffledQuestions[currentQuestionIndex];
  const correctIndex = current.answer;

  const optionButtons = optionsContainer.querySelectorAll(".option-btn");
  const isCorrect = selectedIndex === correctIndex;

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
    feedbackEl.classList.add("correct");
    feedbackEl.innerHTML =
      `<span class="status">✅ Correct!</span> ` +
      `<span class="explanation">${current.explanation}</span>`;
  } else {
    selectedBtn.classList.add("wrong");
    feedbackEl.classList.add("wrong");
    feedbackEl.innerHTML =
      `<span class="status">❌ Not quite.</span> ` +
      `<span class="explanation">${current.explanation}</span>`;
    // Highlight correct option
    optionButtons.forEach(btn => {
      const idx = Number(btn.getAttribute("data-index"));
      if (idx === correctIndex) {
        btn.classList.add("correct");
      }
    });
  }

  // Disable all buttons after answer
  optionButtons.forEach(btn => {
    btn.disabled = true;
  });

  // Store for review
  userAnswers.push({
    question: current.question,
    options: current.options,
    correctIndex,
    selectedIndex,
    isCorrect,
    timedOut: false
  });

  updateScoreDisplay();
  nextBtn.disabled = false;
}

// === Handle time up ===
function handleTimeUp() {
  if (hasAnswered) return;
  hasAnswered = true;

  const current = shuffledQuestions[currentQuestionIndex];
  const correctIndex = current.answer;
  const optionButtons = optionsContainer.querySelectorAll(".option-btn");

  optionButtons.forEach(btn => {
    const idx = Number(btn.getAttribute("data-index"));
    if (idx === correctIndex) {
      btn.classList.add("correct");
    }
    btn.disabled = true;
  });

  feedbackEl.classList.add("wrong");
  feedbackEl.innerHTML =
    `<span class="status">⏰ Time's up!</span> ` +
    `<span class="explanation">${current.explanation}</span>`;

  // Store for review (no selection)
  userAnswers.push({
    question: current.question,
    options: current.options,
    correctIndex,
    selectedIndex: null,
    isCorrect: false,
    timedOut: true
  });

  updateScoreDisplay();
  nextBtn.disabled = false;
}

// === Update score display text ===
function updateScoreDisplay() {
  const total = shuffledQuestions.length || quizData.length;
  scoreText.textContent = `Score: ${score} / ${total}`;
}

// === Render review list ===
function renderReview() {
  const labels = ["A", "B", "C", "D", "E", "F"];
  reviewContainer.innerHTML = "";

  userAnswers.forEach((entry, index) => {
    const item = document.createElement("div");
    item.className = "review-item";

    const qEl = document.createElement("div");
    qEl.className = "review-q";
    qEl.textContent = `${index + 1}. ${entry.question}`;
    item.appendChild(qEl);

    const correctLine = document.createElement("div");
    correctLine.className = "review-line correct";
    const correctText = entry.options[entry.correctIndex];
    correctLine.textContent = `Correct: ${labels[entry.correctIndex]}. ${correctText}`;
    item.appendChild(correctLine);

    const yourLine = document.createElement("div");
    yourLine.className = "review-line";
    if (entry.selectedIndex === null) {
      yourLine.textContent = "Your answer: (none, time's up)";
      yourLine.classList.add("wrong");
    } else {
      const yourText = entry.options[entry.selectedIndex];
      yourLine.textContent = `Your answer: ${labels[entry.selectedIndex]}. ${yourText}`;
      if (entry.isCorrect) {
        yourLine.classList.add("correct");
      } else {
        yourLine.classList.add("wrong");
      }
    }
    item.appendChild(yourLine);

    reviewContainer.appendChild(item);
  });
}

// === Show result screen ===
function showResult() {
  clearTimer();

  quizScreen.style.display = "none";
  resultScreen.style.display = "block";

  const total = shuffledQuestions.length;
  const percentage = Math.round((score / total) * 100);

  finalScoreEl.textContent = score;
  totalQuestionsEl.textContent = total;

  let message;
  let badgeText;
  let badgeClass;

  if (percentage >= 80) {
    badgeText = "Awesome 🎉";
    badgeClass = "badge-great";
    message = "Great job! You really know your basics.";
  } else if (percentage >= 50) {
    badgeText = "Good 👍";
    badgeClass = "badge-ok";
    message = "Nice effort! Review a bit more and try again.";
  } else {
    badgeText = "Keep Practicing 💪";
    badgeClass = "badge-bad";
    message = "Don't worry! Practice will make you better.";
  }

  resultBadgeEl.textContent = badgeText;
  resultBadgeEl.className = `badge ${badgeClass}`;
  resultMessageEl.textContent = `${message} You scored ${percentage}% overall.`;

  // Save high score
  saveHighScoreIfNeeded(score, total);

  // Render review
  renderReview();
}

// === Event listeners ===
nextBtn.addEventListener("click", () => {
  const lastIndex = shuffledQuestions.length - 1;
  if (currentQuestionIndex >= lastIndex) {
    showResult();
  } else {
    currentQuestionIndex++;
    renderQuestion();
  }
});

restartBtn.addEventListener("click", () => {
  startQuiz();
});

playAgainBtn.addEventListener("click", () => {
  startQuiz();
});

// Load high score and start quiz on load
loadHighScore();
startQuiz();
