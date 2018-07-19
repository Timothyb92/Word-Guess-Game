//Empty arrays that will house user's guesses
var correctGuesses = [];
var incorrectGuesses = [];

//Array that holds possible words for the game
var gameWords = ["hadoken", "dhalsim", "chunli", "shoryuken", "guile", "zangief"];

//Counts the number of wins and losses the user has
var wins = 0;
var losses = 0;

//Plannign to use this to count against the winning word to confirm if the user has won
var count = 0;

//Counter for how many guesses the user has left - initialized at 15
var guesses = 15;

//Grabs a random word from the gameWords array and assigns it to the variable
var randomAnswerGen = function(){
    var newAnswer = gameWords[Math.floor(Math.random()*gameWords.length)];
    answer = newAnswer;
    return answer;
}

//sets randomly generated word to the answer
var answer = randomAnswerGen();

//array that will house each character in the randomly selected answer
var answerCharacters = [];

//Declaring sound files to call them later
var gameSound = new Audio("assets/sounds/playerSelect.mp3");
var newChallengerSound = new Audio("assets/sounds/newChallenger.mp3");
var youLoseSound = new Audio("assets/sounds/youLose.mp3");
var youWinSound = new Audio("assets/sounds/youWin.mp3");




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
    document.getElementById("lossesP").innerHTML = "Losses: " + losses;
}

//Resets the game after a win
function resetGame(){
    answerCharacters = [];
    count = 0;
    guesses = 15;
    correctGuesses = [];
    incorrectGuesses = [];
    randomAnswerGen();
    separateAnswerByLetters();
    addAnswerCharsToLI();
    document.getElementById("incorrectGuesses").innerHTML = "";
    renderGame();
}

//gameover function
function gameOverCheck(){
    if (guesses === 0){
        losses++;
        youLoseSound.play();
        resetGame();
    }
    else if (count === answer.length){
        wins++;
        youWinSound.play();
        resetGame();
    }
}

//Adds each letter of the winning word as a list item with the text of "_"
function addAnswerCharsToLI(){
    var answerUL = document.getElementById("wordUL");
    var currentIndex = 0;
    answerUL.innerHTML = "";
    answerCharacters.forEach(function(){
        var answerLetters = document.createElement('LI');
        answerLetters.setAttribute('style', 'display: inline; margin-left: 10px;');
        answerLetters.setAttribute('class', 'letterLI' + currentIndex);
        answerUL.appendChild(answerLetters);
        answerLetters.innerHTML = "_";
        currentIndex++;
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
    document.getElementById("winsP").innerHTML = "Wins: " + wins;
    document.getElementById("lossesP").innerHTML = "Losses: " + losses;
    document.getElementById("guessesP").innerHTML = guesses;
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

    //Runs game sound as soon as user presses a button
    if ((correctGuesses.length === 0) && (incorrectGuesses.length === 0)){
        gameSound.play();

        //Checks to see if this is the first time the user has pressed a button since the page has loaded
        //If it is, the HERE COMES A NEW CHALLENGER sound will play
        if (wins === 0){
            newChallengerSound.play();
        }
    }

    //Checks to see if input is a letter
    if (event.keyCode >= 65 && event.keyCode <=90){

    //Loops over each character in the randomly selected answer
        for (var j = 0; j < answerCharacters.length; j++){
            if (answerCharacters[j] == keyPress){
                console.log(keyPress);
                document.querySelector(".letterLI" + [j]).innerHTML = keyPress;
                if (correctGuesses.indexOf(keyPress) !== -1){
                    console.log("Character already guessed");
                    
                    
                }
                else {
                    correctGuesses.push(keyPress);
                    count++;
                }
                
            }
        }
        // If user's key input isn't a character in the answer, guesses is decremented and the 
        //letter they guessed is pushed to the incorrectGuesses array
        if ((answer.indexOf(keyPress) == -1) && (incorrectGuesses.indexOf(keyPress) == -1)){
            console.log("not a correct guess. you pressed " + keyPress);
            console.log(guesses + " guesses remaining");
            incorrectGuesses.push(keyPress);
            addIncorrectGuesses(keyPress);
            guesses--;
        }   
    }

    //if user input isn't a letter, this alerts them
    else {
        alert("Please choose a letter");
    }
    gameOverCheck();
    renderGame();
}