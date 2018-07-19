//Empty arrays that will house user's guesses
var correctGuesses = [];
var incorrectGuesses = [];

//Array that holds possible words for the game
var gameWords = ["hadoken", "dhalsim", "chunli", "shoryuken", "guile", "zangief"];

//Counts the number of wins the user has
var wins = 0;

//Plannign to use this to count against the winning word to confirm if the user has won
var count = 0;

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
    document.getElementById("winsP").innerHTML = "Wins: " + wins;
}

//gameover function
function gameOverCheck(){
    if (guesses === 0){
        document.querySelector("body").innerHTML = "GAME OVER"
    }
    else if (count === answer.length){
        wins++;
    }
}

//Adds each letter of the winning word as a list item with the text of "_"
function addAnswerCharsToLI(){
    var answerUL = document.getElementById("wordUL");
    answerCharacters.forEach(function(){
        var answerLetters = document.createElement('LI');
        answerLetters.setAttribute('style', 'display: inline; margin-left: 10px;');
        answerLetters.setAttribute('class', 'letterLI');
        answerUL.appendChild(answerLetters);
        answerLetters.innerHTML = "_";
    })
}

//adds a list of letters the user has already guessed
function addIncorrectGuesses(text){
    var incorrectUL = document.getElementById("incorrectGuesses");
    var incorrectLetters = document.createElement('LI');
    var addedLetter = document.createTextNode(text);
    incorrectLetters.setAttribute('style', 'display: inline;');
    incorrectLetters.setAttribute('class', 'incorrectGuessLI');
    incorrectLetters.appendChild(addedLetter);
    incorrectUL.appendChild(incorrectLetters);
}


//function that stores HTML to be inserted
function generateHTML(){ 
    document.getElementById("game").innerHTML =
            "<p>Press any key to get started!</p>" +
            "<p id=winsP> Wins: " + wins + "</p>" +
            "<p>Current word</p>" +
            "<ul id=wordUL></ul>" +
            "<p id='answerArray'></p>" +
            "<p>Number of guesses remaining</p>" +
            "<p id=guessesP>" + guesses + "</p>" + 
            "<p>Letters already guessed</p>" +
            "<p>" + incorrectGuesses + "</p>" +
            "<ul id=incorrectGuesses></ul>"

}


//Adds the game content to the browser and runs the putAnswerCharsToLI function
window.onload = function () {
    generateHTML();
    addAnswerCharsToLI();
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
                document.querySelector(".letterLI").innerHTML = keyPress;
                count++;
            }
        }
        // If user's key input isn't a character in the answer, guesses is decremented and the 
        //letter they guessed is pushed to the incorrectGuesses array
        if (answer.indexOf(keyPress) == -1){
            guesses--;
            console.log("not a correct guess. you pressed " + keyPress);
            console.log(guesses + " guesses remaining");
            if (incorrectGuesses.indexOf(keyPress) == -1){
                incorrectGuesses.push(keyPress);
                addIncorrectGuesses(keyPress);
            }
        }
    }

    //if user input isn't a letter, this alerts them
    else {
        alert("Please choose a letter");
    }
    gameOverCheck();
    renderGame();
}