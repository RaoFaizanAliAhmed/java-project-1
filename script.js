const quizData = [
  { question: "Who invented Java?", options: ["Dennis Ritchie", "Bjarne Stroustrup", "James Gosling", "Guido van Rossum"], answer: 2 },
  { question: "What is the extension of Java files?", options: [".js", ".java", ".jav", ".class"], answer: 1 },
  { question: "Which company owns Java?", options: ["Google", "Microsoft", "Oracle", "IBM"], answer: 2 },
  { question: "Which of these is not a Java feature?", options: ["Object-Oriented", "Platform-Independent", "Use of Pointers", "Secure"], answer: 2 },
  { question: "What is the default value of a boolean variable in Java?", options: ["true", "false", "null", "undefined"], answer: 1 },
  { question: "Which keyword is used to define a class in Java?", options: ["class", "Class", "struct", "object"], answer: 0 },
  { question: "What is the size of an int in Java?", options: ["16 bits", "32 bits", "64 bits", "128 bits"], answer: 1 },
  { question: "Which of these is a valid data type in Java?", options: ["float", "decimal", "character", "real"], answer: 0 },
  { question: "Which method is the entry point of a Java program?", options: ["start()", "run()", "main()", "init()"], answer: 2 },
  { question: "What does JVM stand for?", options: ["Java Visual Machine", "Java Variable Model", "Java Virtual Machine", "Java Verified Method"], answer: 2 },
  { question: "Which of these is not a Java access modifier?", options: ["public", "protected", "private", "internal"], answer: 3 },
  { question: "What is the result of 10/3 in Java (integer division)?", options: ["3", "3.33", "10/3", "Error"], answer: 0 },
  { question: "Which package contains the String class?", options: ["java.io", "java.lang", "java.util", "java.string"], answer: 1 },
  { question: "What does the 'final' keyword do in Java?", options: ["Prevents overriding", "Makes a method abstract", "Makes a method virtual", "Enables inheritance"], answer: 0 },
  { question: "What is an array in Java?", options: ["A collection of variables of different types", "A single variable", "A collection of variables of the same type", "None of the above"], answer: 2 },
  { question: "How do you create a comment in Java?", options: ["# Comment", "// Comment", "<!-- Comment -->", "/* Comment */"], answer: 1 },
  { question: "Which method is used to get the length of a string in Java?", options: ["length()", "size()", "getSize()", "len()"], answer: 0 },
  { question: "Which of these is a valid loop in Java?", options: ["for", "while", "do-while", "All of the above"], answer: 3 },
  { question: "Which keyword is used to inherit a class in Java?", options: ["implements", "extends", "inherits", "super"], answer: 1 },
  { question: "What is a constructor in Java?", options: ["A method to destroy objects", "A special method to initialize objects", "A method to copy objects", "None of the above"], answer: 1 },
  { question: "Which of these is not a primitive type in Java?", options: ["int", "String", "boolean", "double"], answer: 1 },
  { question: "What is polymorphism in Java?", options: ["Same method name with different implementations", "Same variable name for all methods", "Multiple inheritances", "None of the above"], answer: 0 },
  { question: "What is the purpose of the 'this' keyword in Java?", options: ["Refer to the current object", "Refer to the parent class", "Refer to the static method", "None of the above"], answer: 0 },
  { question: "Which of these is a checked exception in Java?", options: ["NullPointerException", "ArrayIndexOutOfBoundsException", "IOException", "ArithmeticException"], answer: 2 },
  { question: "Which keyword is used to declare a constant in Java?", options: ["const", "final", "static", "volatile"], answer: 1 },
  { question: "What is encapsulation in Java?", options: ["Hiding implementation details", "Hiding data using methods", "Using multiple classes", "None of the above"], answer: 1 },
  { question: "What is an interface in Java?", options: ["A class with a constructor", "A collection of abstract methods", "A class that cannot be extended", "None of the above"], answer: 1 },
  { question: "Which class is the parent of all classes in Java?", options: ["Class", "Object", "Base", "Root"], answer: 1 },
  { question: "What does the 'break' statement do in Java?", options: ["Stops the current iteration", "Exits the loop", "Continues to the next iteration", "None of the above"], answer: 1 },
  { question: "What is the correct way to start a thread in Java?", options: ["start()", "run()", "execute()", "begin()"], answer: 0 }
];

let username = "";
let currentQuestion = 0;
let score = 0;
let timerInterval;
let timeLeft = 15; // Time in seconds

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultPopup = document.getElementById("result-popup");

const startButton = document.getElementById("start-button");
const usernameInput = document.getElementById("username");
const questionNumberEl = document.getElementById("question-number");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextButton = document.getElementById("next-button");

const resultTitle = document.getElementById("result-title");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-button");

const timerDisplay = document.createElement("div");
timerDisplay.id = "timer";
timerDisplay.style.marginTop = "10px";
quizScreen.appendChild(timerDisplay);

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", loadNextQuestion);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  username = usernameInput.value.trim();
  if (!username) {
    alert("Please enter your name to start the quiz.");
    return;
  }
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  loadQuestion();
}

function loadQuestion() {
  clearInterval(timerInterval); // Reset the timer for a new question
  timeLeft = 15; // Reset time for each question
  startTimer(); // Start the timer

  const quiz = quizData[currentQuestion];
  questionNumberEl.textContent = `Question ${currentQuestion + 1}`;
  questionEl.textContent = quiz.question;
  optionsEl.innerHTML = "";

  quiz.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option");
    button.addEventListener("click", () => selectOption(button, index));
    optionsEl.appendChild(button);
  });

  nextButton.disabled = true;
}

function selectOption(button, index) {
  clearInterval(timerInterval); // Stop the timer once the user selects an answer
  const allOptions = optionsEl.querySelectorAll(".option");
  allOptions.forEach((option) => option.classList.remove("selected"));
  button.classList.add("selected");
  nextButton.disabled = false;

  const correctAnswer = quizData[currentQuestion].answer;
  if (index === correctAnswer) {
    score++;
  }
}

function loadNextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    clearInterval(timerInterval); // Stop the timer when the quiz ends
    showResult();
  }
}

function showResult() {
  quizScreen.classList.add("hidden");
  resultPopup.classList.remove("hidden");

  const percentage = (score / quizData.length) * 100;
  let status = "";
  let color = "";

  if (percentage >= 70) {
    status = "Excellent!";
    color = "blue";
  } else if (percentage >= 50) {
    status = "Good!";
    color = "green";
  } else {
    status = "Fail!";
    color = "red";
  }

  resultTitle.textContent = status;
  resultTitle.className = color;
  resultMessage.innerHTML = `
    Name: ${username}<br>
    Score: ${score}/${quizData.length}<br>
    Percentage: ${percentage.toFixed(2)}%<br>
    Time Taken: ${15 * quizData.length - timeLeft} seconds
  `;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  timeLeft = 15;
  clearInterval(timerInterval);
  resultPopup.classList.add("hidden");
  startScreen.classList.remove("hidden");
}

function startTimer() {
  timerDisplay.textContent = `Time Left: ${timeLeft}s`;
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      loadNextQuestion();
    }
  }, 1000);
}
