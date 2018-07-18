//Empty array that will house user's guesses
var userGuesses = [];

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

//Variable that stores HTML to be inserted
var html = 
            "<p>Press any key to get started!</p>" +
            "<p> Wins: " + wins + "</p>" +
            "<p>Current word</p>" +
            "<p>ANSWER WILL GO HERE</p>" +
            "<p>Number of guesses remaining</p>" +
            "<p>" + guesses + "</p>" + 
            "<p>Letters already guessed</p>" +
            "<p>" + userGuesses + "</p>";

//Adds the game content to the browser
window.onload = function () {
    document.getElementById("game").innerHTML = html;
}

//Logs the answer to the console
console.log("answer: " + answer);


//Starts the game by adding each character to the answer array
separateAnswerByLetters(answer);

//Event listener for key release
document.onkeyup = function(event){
    var keyPress = event.key;

    //Loops over each character in the randomly selected answer
    for (var j = 0; j < answerCharacters.length; j++){
        if (answerCharacters[j] == keyPress){
            console.log(keyPress);
            userGuesses.push(keyPress);
        }
    }
    // If user's key input isn't a character in the answer, guesses is decremented and the letter they guessed is pushed to the userGuesses array
    if (answer.indexOf(keyPress) == -1){
        console.log("not a correct guess. you pressed " + keyPress);
        console.log(guesses + " guesses remaining");
        --guesses;
        userGuesses.push(keyPress);
    }

    //Checks to see if the key the user pressed is part of the answer. if it is, it reveals the letter to the user
    for (var k = 0; k < userGuesses.length; k++){
        for (var l = 0; l < userGuesses.length; l++){
            if (answerCharacters[l] == userGuesses[k]){
                //Some code to reveal the letter to the user
            }
        }
    }
}