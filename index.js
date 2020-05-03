var timeLeft = 10;
var currentScore = 0;
var firstRound = true;

let createOperating = function() {
    let number1 = Math.round( Math.random() * 10 );
    let number2 = Math.round ( Math.random() * 10 );
    let result = number1 + number2;
    return( [`${number1} + ${number2}` , number1+number2]);
}

var currentOperation;
let setQuestion = function(){
    currentOperation = createOperating();
    $('#operation').text(currentOperation[0]);
}

let showTimeLeft = function (){
    $('#counting-down').text(timeLeft);
}

let endGame = function() {
    $('#game-over').show();
    $('#user-answer').attr('readonly', true);
    $('#current-score').text(`Final score: ${currentScore}`);
}

let countingDown = function() {
    let timer = setInterval( function(){
        timeLeft--;
        if(timeLeft >= 0) {
            showTimeLeft();
        }
        else{
            clearInterval(timer);
            endGame();
        }        
        
    } , 1000);
}

let showCurrentScore = function() {
    $('#current-score').text(`Current score: ${currentScore}`);
}

let startGame = function(){
    if(firstRound){
        firstRound = false;
        countingDown();
    }  
}

let checkUserAnswer = function() {    
    let userAnswer = $('#user-answer').val();
    //console.log(userAnswer);
    if( Number(userAnswer) === Number(currentOperation[1]) ) {
        //console.log('correct answer');
        currentScore++;
        showCurrentScore();
        $('#user-answer').val('');
        timeLeft++;
        showTimeLeft();
        setQuestion();
    }
    else {
        //console.log('Wrong answer');
        $('#user-answer').val('');
    }
}

let reestartGame = function() {
    $('#game-over').hide();
    firstRound = true;
    timeLeft = 10;
    showTimeLeft();
    currentScore = 0;
    showCurrentScore();
    $('#user-answer').removeAttr('readonly');
}

$(document).ready( function(){
    $('#game-over').hide();
    setQuestion();
    $(document).on('keydown' , '#user-answer', startGame)
    $(document).on('change' , '#user-answer', checkUserAnswer);
    $(document).on('click' , '#btn-try-again' , reestartGame)
});
