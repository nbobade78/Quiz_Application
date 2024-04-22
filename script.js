const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector(`.alert`);
const startBtn = document.querySelector(`.startBtn`);
const timer = document.querySelector(`.timer`);


//Make an array of objects that stores quetions, choices of question ans answer
const quiz = [
    {
        question: "Q. Which of the following is not a CSS box model property?",
        choices: ["margin", "padding", "border-radius", "border-collapse"],
        answer: "border-collapse"
    },

    {
        question: "Q. Which of the following is not a valid way to declare a function in JavaScript?",
        choices: ["function myFunction() {}", "let myFunction = function() {}", "myFunction: function() {}", "myFunction = Function() {}"],
        answer: "myFunction: function() {}"
    },

    {
        question: "Q. Which of the following is not a JavaScript data type?",
        choices: ["string", "boolean", "object", "float"],
        answer: "flaot"
    },

    {
        question: "Q. What is the purpose of the this keyword in JavaScript?",
        choices: ["It refers to the current function.", "It refers to the current object.", "It refers to the parent object.", "It is used for comments."],
        answer: "It refers to the current object."
    }
];

//making variables
let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 15;
let timerId = null;

//Arrow Function to show
const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = "";
    for (let i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i];
        const choiceDev = document.createElement('div');
        choiceDev.textContent = currentChoice;
        choiceDev.classList.add('choice');
        choicesBox.appendChild(choiceDev);

        choiceDev.addEventListener('click', () => {
            if (choiceDev.classList.contains('selected')) {
                choiceDev.classList.remove('selected');
            }
            else {
                choiceDev.classList.add('selected');
            }
        });
    }
    if(currentQuestionIndex<quiz.length){
        startTimer();
    }
}

//function to check answer
const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
        // alert("Correct Anaser!");
        displayAlert("Correct Anaser!");
        score++;
    }
    else {
        // alert("Wrong answer");
        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
    }
    timeLeft = 15;
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    }
    else {
        showScore();
        stopTimer();
    }
}

//function to show score
const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
}

//function to show alert
const displayAlert = (msg) => {
    alert.style.display = 'block';
    alert.textContent = msg;
    setTimeout(() => {
        alert.style.display = 'none';
    }, 2000);
}

//Start Timer
const startTimer = () => {
    clearInterval(timerId);         //Check if any exist Timer
    timer.textContent = timeLeft;
    const countDown = () => {
        timeLeft--;
        timer.textContent = timeLeft;
        if(timeLeft === 0){
            const confirmUser = confirm("Time UP !!! Do  you want to play the quiz again");
            if(confirmUser){
                timeLeft = 15;
                startQuiz();
            }
            else{
                startBtn.style.display = "block";
                container.style.display = "none";
                return ;
            }
        }
    }
    timerId = setInterval(countDown,1000);
}

// Function to stop timer
const stopTimer = () => {
    clearInterval(timerId);
}

//Function to suffle the question
const shuffleQuestions = () =>{
    for(let i=quiz.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i +  1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex =0;
    showQuestions();
}

//Function to start quiz
const startQuiz = () =>{
    timeLeft = 15;
    timer.style.display = "flex";                   //Setting Time for Quiz
    shuffleQuestions();
}

// Adding Event Listner to start Button
startBtn.addEventListener('click', () => {
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});


nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector(`.choice.selected`);
    if (!selectedChoice && nextBtn.textContent == "Next") {
        // alert("Please select a choice!");
        displayAlert("Select your answer");
        return;
    }
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        startQuiz();
    }
    else {
        checkAnswer();
    }
    checkAnswer();
});