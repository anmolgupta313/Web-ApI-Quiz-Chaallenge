//Cretaed a variable and created a array with objects inside.
var questions = [{
    q: "Commonly used data types DO NOT include:",
    a: "1. Strings",
    b: "2. Booleans",
    c: "3. Alerts",
    d: "4. Numbers",
    correct: "3. Alerts",
},
{
    q: "The condition in an if/else statement is enclosed with ____.",
    a: "1. Quotes",
    b: "2. Curly brackets",
    c: "3. Parentheses",
    d: "4. Square brackets",
    correct: "3. Parentheses",
},
{
    q: "Arrays in JavaScript can be used to store ____.",
    a: "1. Numbers and strings",
    b: "2. Other arrays",
    c: "3. Booleans",
    d: "4. All of the above",
    correct: "4. All of the above",
},
{
    q: "String values must be encosed within ____ when being assigned to variables.",
    a: "1. Quotes",
    b: "2. Curly brackets",
    c: "3. Parentheses",
    d: "4. Square brackets",
    correct: "1. Quotes",
},
{
    q: "A very useful tool used during development and debugging for printing content to the debugger is:",
    a: "1. Javascript",
    b: "2. Terminal/Bash",
    c: "3. for loops",
    d: "4. console.log",
    correct: "4. console.log",
},
{
    q: "What is the correct syntax for referring to an external script called 'code.js'?",
    a: "1. <script src='code.js'>",
    b: "2. <script href='code.js'>",
    c: "3. <script ref='code.js'>",
    d: "4. <script name='code.js'>",
    correct: "1. <script src='code.js'>",
}];

// created variable and selected the particular element in dom.
var clickStart = document.getElementById("start");
var timerEl = document.getElementById("countdown");
var timeLeft = 60;
var quizDuration;
var questionContainer = document.querySelector("#quiz-container");

//Defined a function for time remaining 
function timer() {
    timerEl.textContent = "Time remaining: " + timeLeft + "s";
    quizDuration = setInterval(function () {
        if (timeLeft > 0) {
            adjustTime(-1);
        } else {
            endQuizPage();
        }
    }, 1000);
}

//Defined a function when time is less than 0
function adjustTime(amount) {
    timeLeft += amount;
    if (timeLeft < 0) {
        timeLeft = 0;
    }
    timerEl.textContent = "Time remaining: " + timeLeft + "s";
}

//Here we are calling function using onclick
clickStart.onclick = timer;

//Created a method it will call questions and assign option to the button  
var renderQuestion = function (question) {
    questionContainer.innerHTML = "";

    var questionHeader = document.createElement("h2");
    questionHeader.textContent = question.q;

    var answerA = document.createElement("button");
    answerA.textContent = question.a;
    answerA.addEventListener("click", answerClick);

    var answerB = document.createElement("button");
    answerB.textContent = question.b;
    answerB.addEventListener("click", answerClick);

    var answerC = document.createElement("button");
    answerC.textContent = question.c;
    answerC.addEventListener("click", answerClick);

    var answerD = document.createElement("button");
    answerD.textContent = question.d;
    answerD.addEventListener("click", answerClick);

    questionContainer.appendChild(questionHeader);
    questionContainer.appendChild(answerA);
    questionContainer.appendChild(answerB);
    questionContainer.appendChild(answerC);
    questionContainer.appendChild(answerD);
}

// Created variables
var currentQuestionIndex = 0;
var userScore = 0;
var correctAnswer = questions[currentQuestionIndex].correct;
var clickViewScores = document.getElementById("view-score");

//Created a method for targeting a correct answer
var answerClick = function (event) {
    event.preventDefault();
    var userAnswer = event.target.textContent;
    correctAnswer = questions[currentQuestionIndex].correct;
    // determine if answer is wrong or right and if wrong then decrease time by 10s
    var answerDetermination = document.querySelector("#answer-determination");
    if (userAnswer !== correctAnswer) {
        adjustTime(-10);
        answerDetermination.textContent = "Wrong!";
        currentQuestionIndex++;
        if (currentQuestionIndex >= questions.length) {
            endQuizPage();
        } else { renderQuestion(questions[currentQuestionIndex]) };

    }
    else if (userAnswer === correctAnswer) {
        currentQuestionIndex++;
        answerDetermination.textContent = "Correct!";
        userScore++;
        if (currentQuestionIndex >= questions.length) {
            endQuizPage();
        } else { renderQuestion(questions[currentQuestionIndex]) };
    }
};

//created a method and called a function 
var quiz = function (event) {
    event.preventDefault();
    resetDisplay();
    renderQuestion(questions[currentQuestionIndex]);
};

function resetDisplay() {
    questionContainer.innerHTML = "";
    document.querySelector("#intro-page").style.display = "none";
}

//Defining a function to store score in local storage

function highScores() {
    let data = localStorage.getItem("object");
    let getData = JSON.parse(data);
    let name = getData.name;
    let score = getData.score;
    questionContainer.innerHTML = "";
    questionContainer.innerHTML = name + " " + score;

}
clickViewScores.addEventListener("click", () => {
    highScores();
})

//Created a function to create elements lie heading, buttons, input  
var initials;
function endQuizPage() {
    resetDisplay();
    timerEl.textContent = "";
    clearInterval(quizDuration);
    var endPage = document.createElement("h2");
    questionContainer.appendChild(endPage);

    let blank = document.querySelector("#answer-determination");
    blank.innerHTML = "";

    endPage.innerHTML = "All done! Your final score is " + userScore + ". Enter your initials to save";

    var initialBox = document.createElement("input");
    blank.appendChild(initialBox);

    var submitInitialBtn = document.createElement("button");
    submitInitialBtn.textContent = "Submit";
    blank.appendChild(submitInitialBtn);

    submitInitialBtn.addEventListener("click", () => {

        if (initialBox.value.length === 0) return false;

        let storeInitials = (...input) => {
            let data = JSON.stringify({ "name": input[0], "score": input[1] })
            localStorage.setItem("object", data)
        }

        endPage.innerHTML = "Thank You For Playing. Beat Your High Score and Play Again.";


        storeInitials(initialBox.value, userScore);

        var playAgain = document.createElement("button");
        playAgain.textContent = "Play Again!";
        blank.appendChild(playAgain);

        playAgain.addEventListener("click", () => {
            location.reload();
        })

        //will clear innput field after submission
        document.querySelector("input").value = "";

        //hiding input and submit button after submission of initilas
        initialBox.setAttribute("style","display:none;");
        submitInitialBtn.setAttribute("style", "display:none;");

        //Created a button and added an event listener
        var viewHighScore = document.createElement("button");
        viewHighScore.textContent = "View High Score";
        blank.appendChild(viewHighScore);

        viewHighScore.addEventListener("click", function () {
            highScores();

        })

        //Created  a variable and selected a a div using query selector and set  the display to none
        var scoreCountDiv = document.querySelector("#score-countdown");
        scoreCountDiv.setAttribute("style", "display:none;");

        //Added an event listener and calling a function on submit
        initialBox.addEventListener("submit", endQuizPage);

    });
};

function renderInitials() {
    submitInitialBtn.addEventListener('click', function (event) {
        event.preventDefault;
    }
    )
};

//Added an eventlistener to call a function on a click
clickStart.addEventListener('click', quiz);