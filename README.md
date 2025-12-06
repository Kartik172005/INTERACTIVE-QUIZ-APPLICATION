# INTERACTIVE-QUIZ-APPLICATION

COMPANY: CODTECH IT SOLUTION 

NAME: Kartik Pundalik Gawade 

INTERN ID: CT04DR2452

DOMAIN: FRONT END DEVELOPMENT 

DURATION: 4 WEEKS

MENTOR: NEELA SANTOSH

# JavaScript Quiz Application
This repository contains a fully responsive, browser-based **JavaScript Quiz Application** built using plain HTML, CSS, and JavaScript. The project is designed as a learning-focused mini app where users can practice JavaScript multiple-choice questions, receive instant feedback, and review their performance at the end of the quiz. It is a great example of how to combine DOM manipulation, basic game logic, and UI design without using any external frameworks.

## Project Overview
The quiz contains a series of questions with choices regarding core JavaScript variables, operators, functions, loops, arrays, JSON, DOM methods, and events. Each question offers four choices. Immediately upon choosing one of those options, the user sees if their answer was right or wrong, based on the correct answer checked, with a brief explanation.
The app includes a countdown timer for each of the questions. If the user doesn't manage to answer, a timeout automatically occurs; the correct answer is highlighted, and its explanation is shown. This creates a more realistic and engaging quiz experience.

After the quiz, the app shows a result screen that displays the final score, the total number of questions, a performance message-for example, "Awesome", "Good", or "Keep Practicing"-and a review section where each question is listed with the correct answer and the user's answer. This way, the user can learn from their mistakes and revise the important topics.

The project is organized in three main files:

- `index.html` – HTML structure for the quiz interface.
- `style.css` – All styles for layout, colors, and responsiveness.

- `script.js` – All quiz logic, timer, scoring, and DOM updates.

## Tools, Technologies, and Platforms
This project is built entirely with **front-end web technologies:
- **HTML5** for page structure and semantic layout.
- **CSS3** for styling, layout, responsive design, and interactive states such as hover, correct, and wrong answers.
Vanilla JavaScript with ES6 syntax to implement all logic of quizzes, handling events, timers, high scores, and dynamic DOM manipulation.
- **LocalStorage API** to store and retrieve the user’s best score (high score) in the browser.
- Any modern **web browser** (Chrome, Edge, Firefox, etc.) will suffice to run and test the app.

- Code can be edited and developed using popular editors such as **Visual Studio Code**, Sublime Text, or any other code editor that is able to support HTML, CSS, and JavaScript.

- Due to its structure, the project does not need a backend server or database and thus can easily be deployed on **GitHub Pages**, Netlify, Vercel, or any static hosting platform.

No external libraries or frameworks, like React, Angular, jQuery, or Bootstrap, are used. The project is kept simple, lightweight, and perfect for beginners who would like to understand clearly how everything works under the hood.

## Key Features
- Dynamic loading of quiz questions from a JavaScript array (quizData).
-Multiple-choice questions: the system provides immediate correct/wrong feedback.
Per-question countdown timer with a visual timer badge.
Real-time score tracking, progress bar showing current question / total.
Saved high score in browser using `localStorage`, displayed as "Best" score.
- Screen of final result: Total score, total questions, and percentage-based feedback message.

- Detailed answer review section listing each question, the correct answer, and the user's selected answer or time-out.

Modern card-style UI with gradients, shadows, rounded corners, and subtle hover animations.

- Full client-side one pager-no need for a backend or database.

## How It Works
All questions are held within the `quizData` array in `script.js`. Upon the start of the quiz, the questions are shuffled via the Fisher–Yates shuffle algorithm to give a different order each time the user plays. This script will dynamically generate option buttons for every question, add click event listeners, and update the DOM with the answer selected.
The timer is implemented using `setInterval`. Each second, the remaining time is updated on screen. The time having reached zero, the app handles automatically the “time’s up” case: it disables the options, highlights the correct one, shows an explanation, and stores the result as a timed-out attempt.
During the quiz, the script refreshes:

- The **score** and “Score: X / Total” text.

- The **progress text** (“Question N / Total”).

- The **progress bar** width.

- The **high score** display using values saved in `localStorage`.

Once the last question is complete, the main quiz screen is replaced by a results screen. It includes the final score, one of three percentage-based messages, and a review list. The “Play Again” button resets the state and begins another quiz with questions in a shuffled order.


## Where This Project Can Be Used
This quiz application can be used as an 
- A **learning tool** for students who are preparing for JavaScript exams, interviews, or online tests.
- A **practice project** to showcase in a web development portfolio or GitHub profile.
- A mini assignment or college project showcasing an understanding of HTML, CSS, JavaScript, timers, `localStorage`, and manipulation of the DOM.
- A reusable **template** that can be readily adapted for other subjects such as HTML, CSS, general knowledge, aptitude, or any other programming language. You can further extend it by adding question categories, difficulty levels, a question bank loaded from JSON, or even connect it to a backend if you want to store user results online.

## Output
<img width="1916" height="867" alt="Image" src="https://github.com/user-attachments/assets/7b5845fa-af93-4688-83b7-728b8b79f152" />
<img width="1916" height="870" alt="Image" src="https://github.com/user-attachments/assets/eda0951d-bb7b-4c96-8354-bc07456200d2" />
