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

//Function that gets each letter in the randomly chosen answer word
function separateAnswerByLetters(answer){
    for (var i = 0; i < answer.length; i++)
    document.querySelector("#answerP").append(answer[i]); //Maybe try pushing each iteration to an empty array and puttin the array in spans to style them
}

//Variable that stores HTML to be inserted
var html = 
            "<p>Press any key to get started!</p>" +
            "<p> Wins: " + wins + "</p>";