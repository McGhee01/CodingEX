/*console.log("I'm connected");
var startButton = document.querySelector("#start-button");
var guessAnswer = document.querySelector("#guess-answer");
var rightA = document.querySelector("#right");
var wrongA = document.querySelector("#wrong");
var timerA = document.querySelector("#timer");
var container = document.querySelector(".container")
var AnswerTrack = [];
var WrongAnswer = 0;
var totalWins = 0;
var totalLosses = 0;
var timerInterval = null;
var secondsLeft = 0;
// If user refresh page, It will pick up where left off
if(localStorage.getItem("totalWins") !== null){
    totalWins = parseInt(localStorage.getItem("totalWins") );
    rightA.innerHTML = "Right: " + totalWins;
}
if(localStorage.getItem("totalLosses") !== null){
    totalLosses = parseInt(localStorage.getItem("totalLosses") );
    wrongA.innerHTML = "wrong: " + totalLosses;
}
// User must be timed.
function setTime() {
    secondsLeft = 99;
    timerA.textContent = secondsLeft;
    //  Set interval in variable
    timerInterval = setInterval(function () {
        secondsLeft--;
        timerA.textContent = secondsLeft;
        if (secondsLeft === 0) {
             // stops action at set interval
            clearInterval(timerInterval);
            checkIfLost ();
        }
    }, 1000);
}
// start the quiz by clicking on start button
startButton.addEventListener("click", function (event) {
    console.log("start");
})
// click on the answer
container.addEventListener("click", function(event) {
    var element = event.target;
    if(element.matches(".box")) {
        var state = element.setAttribute("data-answer");
        alert("correct!")
    }
})
var imgTag = document.createElement("img");
imgTag.setAttribute("src", "assets/images/hoopla-is-dead.png");
imgTag.setAttribute("alt", "Start Test");
imgTag.addEventListener("click", function(){
    console.log("Maybe this will start");
});
document.body.appendChild(imgTag);*/

//ON CLICK EVENT FOR START BUTTON TO LOAD A QUESTION AND HIDE THE START BUTTON
$(".btn-dark").on("click", function () {
    // remove homepage from view
    $(".card").hide();
    console.log("user clicked start");
    //Get the first question
    $(".highScorePage").hide();
    $(".final-page").hide();
    $(".timer").show();
    $(".timer").html("Time: 75")
    $(".highScore").html("View Highscores");
    $(".question-display").show();
    $("#button-display").show();
    quizQuestion.run();
    quizQuestion.questionNumber = 0;
    quizQuestion.correctGuesses = 0;
    quizQuestion.incorrectGuesses = 0;
    quizQuestion.getQuestion();
    document.getElementById('userInput').value = " ";
})
// ON CLICK FOR RESET BUTTON - RESETS GAME
$(".btn-secondary").on("click", function () {
    console.log("user clicked Restart");
    $(".highScorePage").hide();
    $(".final-page").hide();
    $(".timer").show();
    $(".timer").html("Time: 75")
    $(".highScore").html("View Highscores");
    $(".question-display").show();
    $("#button-display").show();
    quizQuestion.run();
    quizQuestion.questionNumber = 0;
    quizQuestion.correctGuesses = 0;
    quizQuestion.incorrectGuesses = 0;
    quizQuestion.getQuestion();
})
$("#submitInitials").on("click", function () {
    console.log("user clicked submit initials for high scores");
    $(".highScorePage").show();
    quizQuestion.highScorePage();
})
$("#resetScores").on("click", function () {
    console.log("user clicked reset high scores");
    localStorage.clear();
    $("#hsArray").hide();
})
$("#goBack").on("click", function () {
    console.log("user clicked to return from high scores high scores");
    clearInterval(quizQuestion.countDownTimer);
    $(".question-display").hide();
    $("#button-display").hide();
    $(".highScorePage").hide();
    $(".card").show();
    $(".timer").show();
    $(".timer").html("Time: 75");
    $(".highScore").show();
    $("#hsArray").empty();
})
//Determine high score to be replaced
$(".highScore").on("click", function () {
    console.log("user clicked highScore");
    quizQuestion.counter = 0;
    quizQuestion.highScorePage();
})
// ON CLICK FOR ANSWER BUTTONS
$("#button-display").on("click", ".answerButton", function (e) {
    // answerButton.clicked(e);
    var selectedAnswer = $(e.target).attr("data-name");
    console.log(e);
    console.log(e.target);
    console.log(e.target.data);
    console.log($(e.target).attr("data-name"));
    quizQuestion.checkAnswer(selectedAnswer);
})
// Global Variables
var Counter = 0;
var hrLine = document.createElement("hr");
var highScore = 0;
var quizQuestion = {
    // current question
    currentQuestion: "",
    // correct answers
    correctGuesses: 0,
    // incorrect answers
    incorrectGuesses: 0,
    // counter
    counter: 0,
    countDownTimer: null,
    // question number
    questionNumber: 0,

    questions: [
        {
            // Question:
            questionText: "Inside which HTML element do we put the JavaScript?",
            // Answers (Made in an array)
            questionAnswer: ["<scripting>", "<script>", "<js>", "<javascript>"],
            // Correct Answer:
            answer: "<script>"
        },
        {
            questionText: "How many acceptable places are there to put a JavaScript Link?",
            questionAnswer: ["One", "Two", "Three", "Four"],
            answer: "Two",
        },
        {
            questionText: "What kind of tag does radio code belong placed in?",
            questionAnswer: ['<body">', '<div">', '<form">', 'link">'],
            answer: '<form">',
        },
        {
            questionText: 'Where do you go to double-check if your JavaScript is functional after?',
            questionAnswer: ['Console;', 'Elements;', 'Application;', 'Sources;'],
            answer: 'Console;',
        },
        
        {
            questionText: 'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
            questionAnswer: ["if(i <> 5)", "if i <> 5", "if i =! 5 then", "if (i != 5)"],
            answer: "if (i != 5)",
        },
        
    ],
    run: function () {
        clearInterval(this.countDownTimer);
        this.countDownTimer = setInterval(this.decrement, 1000);
        quizQuestion.counter = 75;
    },
    decrement: function () {
        quizQuestion.counter--;
        $(".timer").html("Time: " + quizQuestion.counter);
        if (quizQuestion.counter <= 0) {
            quizQuestion.counter = 0;
            clearInterval(quizQuestion.countDownTimer);
            quizQuestion.finalPage();

            //$("#initials").html("Sorry! You timed out.")
            $(".question-display").hide();
            $("#button-display").hide();
        }
    },
    // GET QUESTION METHOD
    getQuestion: function () {
        // hide information for when the question loads
        $(".question-display").empty();
        $(".areYouRight").empty();
        $(".ready").empty();

        // Display Question
        $(".question-display").html("<p>" + this.questions[this.questionNumber].questionText + "</p>");
        this.buttonGenerator();
    },

    //Button Generator Method
    buttonGenerator: function () {
        //empty buttons
        $("#button-display").empty();
        // for loop to display answer buttons on the screen
        for (var i = 0; i < this.questions[this.questionNumber].questionAnswer.length; i++) {
            $("#button-display").append("<li>");
            var a = $("<button>");
            a.addClass("answerButton");
            a.attr("data-name", this.questions[this.questionNumber].questionAnswer[i]);
            a.text(this.questions[this.questionNumber].questionAnswer[i]);
            //Display Button
            $("#button-display").append(a);
            $("#button-display").append("</li>");
        };
    },
    // Check if the answer is eith correct, incorrect, or if the question has timed out
    checkAnswer: function (selectedAnswer) {
        //determine If the answer is correct
        console.log(this.questions[this.questionNumber]);
        if (selectedAnswer === this.questions[this.questionNumber].answer) {
            console.log("win");
            // increment the number correct
            this.correctGuesses++;
            console.log(this.correctGuesses);
            // display win message with teal hr
            $(".areYouRight").html("<hr id='win'/>Correct!");
            // Next Question
            this.questionNumber++;
        }
        else {
            console.log("lose");
            // increment incorrect guess
            this.incorrectGuesses++;
            console.log(this.incorrectGuesses);
            //Deduct 5 seconds for incorrect answer
            quizQuestion.counter = quizQuestion.counter - 10;
            // display lose message with red hr
            $(".areYouRight").html("<hr id='lose'/> Wrong!");
            // Next Question
            this.questionNumber++;
        }
        this.answerPage();
    },
    //Display the answer page
    answerPage: function () {
        // Check for the last question
        setTimeout(function () {
            if (quizQuestion.questionNumber < quizQuestion.questions.length) {
                quizQuestion.getQuestion();
            }
            else {
                quizQuestion.finalPage();
            }
        }, 1000
        )
    },
    viewHighScore: function () {
        $(".highScore").html("Highscore: " + highScore);
    },
    // Display the stats page that includes: score, and name/initial
    finalPage: function () {
        // Conceal Div Tags
        $(".question-display").empty();
        $("#button-display").empty();
        $(".areYouRight").empty();
        $(".timer").hide();
        $(".final-page").show();
        $("#message").html("<h2>All done!</h2><p>Here are your results:</p>");
        $("#score").html("Your final score is " + quizQuestion.counter);
        $("#correct").html("Correct Guesses: " + this.correctGuesses);
        $("#incorrect").html("Incorrect Guesses: " + this.incorrectGuesses);
        clearInterval(quizQuestion.countDownTimer);
    },
    highScorePage: function () {
        // Hide elements on page for highScorePage Element
        clearInterval(quizQuestion.countDownTimer);
        $(".card").hide();
        $(".final-page").hide();
        $(".timer").hide();
        $(".timer").html("Time: 75")
        $(".highScore").hide();
        $(".question-display").hide();
        $("#button-display").hide();
        $(".highScorePage").show();
        $("#hsArray").show();
        console.log("completed highScore Page");

        //Submitted Initials
        var boxValue = document.getElementById('userInput').value.toUpperCase().substring(0, 4);

        //boxValue = document.getElementById('userInput').value.substring(0, 3);
        if (boxValue == false){
            console.log("no value entered for initials:" + boxValue);
            boxValue = "***";
        };

        // High Score Data Information
        const scoreValues = {
            score: quizQuestion.counter,   // Time left on clock assigned
            initials: boxValue   //The variable hold the initials submitted by the user
        };
        const MAX_HIGH_SCORES = 5;
        console.log(scoreValues);

        //Array to store high scores
        const highScoresArray = JSON.parse(localStorage.getItem("highScoresArray")) || [];
        console.log(highScoresArray);

        //Add new score to highScoreArray
        highScoresArray.push(scoreValues);
        console.log(highScoresArray);

        //Sort scores from high to low
        highScoresArray.sort((a, b) => b.score - a.score);
        console.log(highScoresArray);

        // Narrow down to top 5 scores
        highScoresArray.splice(5);

        //Update local storage with revised highScoresArray
        localStorage.setItem('highScoresArray', JSON.stringify(highScoresArray));
        console.log(highScoresArray);

        // High score list created
        const highScoresList = document.getElementById("#hsArray");
        const highScores = JSON.parse(localStorage.getItem("highScoresArray")) || [];

            // Use .map to sort out initials and score from the highScoresArray
            highScoresArray.map(scoreValues => {
                if(scoreValues.score !=0){
                console.log(scoreValues.initials + " --- " + scoreValues.score);
                $("#hsArray").append('<li>' + scoreValues.initials + " --- " + scoreValues.score + '</li>');
                }
            });
    }
}