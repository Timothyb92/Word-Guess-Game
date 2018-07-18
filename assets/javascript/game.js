//Empty arrays that will house user's guesses
var correctGuesses = [];
var incorrectGuesses = [];

//Array that holds possible words for the game
var gameWords = ["hadoken", "dhalsim", "chunli", "shoryuken", "guile", "zangief"];

//Counts the number of wins the user has
var wins = 0;

//Counter for how many guesses the user has left - initialized at 15
var guesses = 15;

//Grabs a random word from the gameWords array and assigns it to the variable
var answer = gameWords[Math.floor(Math.random()*gameWords.length)];

//array that will house each character in the randomly selected answer
var answerCharacters = [];

//Function that gets each letter in the randomly chosen answer word and pushes them to answerCharacters array
function separateAnswerByLetters(){
    for (var i = 0; i < answer.length; i++){
        answerCharacters.push(answer[i]);
    }
}

//updates guesses
function renderGame(){
    document.getElementById("guessesP").innerHTML = guesses;
}

//gameover function
function gameOverCheck(){
    if (guesses === 0){
        document.querySelector("body").innerHTML = "GAME OVER"
    }
}

//Function that puts the randomly selected answer in a series of spans (to be styled). 
//needs to be called by a forEach method
// function putAnswerCharsToSpan (arr){
//     var htmlDiv = document.createElement('DIV');
//     var htmlSpan = document.createElement('SPAN');
//     htmlDiv.setAttribute('style', 'border-bottom: solid black 1px; display: inline; margin-left: 10px;')
//     htmlSpan.setAttribute('style', 'visibility: hidden');
//     htmlSpan.appendChild(document.createTextNode(arr));
//     htmlDiv.appendChild(htmlSpan);
//     document.getElementById("answerArray").appendChild(htmlDiv);
// }

//Makes letter visable
// function revealLetter(){
//     document.querySelector("span").setAttribute('style', 'visibility: visable;');
// }


//Variable that stores HTML to be inserted
var html = 
            "<p>Press any key to get started!</p>" +
            "<p> Wins: " + wins + "</p>" +
            "<p>Current word</p>" +
            "<p id='answerArray'></p>" +
            "<p>Number of guesses remaining</p>" +
            "<p id=guessesP>" + guesses + "</p>" + 
            "<p>Letters already guessed</p>" +
            "<p>" + incorrectGuesses + "</p>";


//Adds the game content to the browser and runs the putAnswerCharsToSpan function
window.onload = function () {
    document.getElementById("game").innerHTML = html;
    // answerCharacters.forEach(putAnswerCharsToSpan);
}


//Logs the answer to the console
console.log("answer: " + answer);


//Starts the game by adding each character to the answer array
separateAnswerByLetters();


//Event listener for key release
document.onkeyup = function(event){
    var keyPress = event.key.toLowerCase();

    //Checks to see if input is a letter
    if (event.keyCode >= 65 && event.keyCode <=90){

    //Loops over each character in the randomly selected answer
        for (var j = 0; j < answerCharacters.length; j++){
            if (answerCharacters[j] == keyPress){
                console.log(keyPress);
                correctGuesses.push(keyPress);
                revealLetter();
                renderGame();
            }
        }
        // If user's key input isn't a character in the answer, guesses is decremented and the 
        //letter they guessed is pushed to the incorrectGuesses array
        if (answer.indexOf(keyPress) == -1){
            guesses--;
            console.log("not a correct guess. you pressed " + keyPress);
            console.log(guesses + " guesses remaining");
            incorrectGuesses.push(keyPress);
            renderGame();
            gameOverCheck();
        }
    }

    //if user input isn't a letter, this alerts them
    else {
        alert("Please choose a letter");
    }
}