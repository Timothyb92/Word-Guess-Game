//Empty array that will house user's guesses
var lettersGuessed = [];

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
function separateAnswerByLetters(answer){
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
function putAnswerCharsToSpan (arr){
    var htmlSpan = document.createElement('SPAN');
    htmlSpan.setAttribute('style', 'border-bottom: 1px solid black; padding-left: 5px; margin-left: 10px;');
    htmlSpan.appendChild(document.createTextNode(arr));

    document.getElementById("answerArray").appendChild(htmlSpan);
}


//Variable that stores HTML to be inserted
var html = 
            "<p>Press any key to get started!</p>" +
            "<p> Wins: " + wins + "</p>" +
            "<p>Current word</p>" +
            "<p id='answerArray'></p>" +
            "<p>Number of guesses remaining</p>" +
            "<p id=guessesP>" + guesses + "</p>" + 
            "<p>Letters already guessed</p>" +
            "<p>" + lettersGuessed + "</p>";


//Adds the game content to the browser and runs the putAnswerCharsToSpan function
window.onload = function () {
    document.getElementById("game").innerHTML = html;
    answerCharacters.forEach(putAnswerCharsToSpan);
}


//Logs the answer to the console
console.log("answer: " + answer);


//Starts the game by adding each character to the answer array
separateAnswerByLetters(answer);


//Event listener for key release
document.onkeyup = function(event){
    var keyPress = event.key.toLowerCase();

    //Checks to see if input is a letter
    if (event.keyCode >= 65 && event.keyCode <=90){

    //Loops over each character in the randomly selected answer
        for (var j = 0; j < answerCharacters.length; j++){
            if (answerCharacters[j] == keyPress){
                console.log(keyPress);
                lettersGuessed.push(keyPress);
                renderGame();
            }
        }
        // If user's key input isn't a character in the answer, guesses is decremented and the 
        //letter they guessed is pushed to the lettersGuessed array
        if (answer.indexOf(keyPress) == -1){
            console.log("not a correct guess. you pressed " + keyPress);
            console.log(guesses + " guesses remaining");
            guesses--;
            lettersGuessed.push(keyPress);
            renderGame();
            gameOverCheck();
        }
        //Checks to see if the key the user pressed is part of the answer. if it is, it reveals the letter to the user
        for (var k = 0; k < lettersGuessed.length; k++){
            for (var l = 0; l < lettersGuessed.length; l++){
                if (answerCharacters[l] == lettersGuessed[k]){
                    //Some code to reveal the letter to the user
                }
            }
        }
    }

    //if user input isn't a letter, this alerts them
    else {
        alert("Please choose a letter");
    }
}