var timeLeft = 10;
var currentScore = 0;
var highScore = 0;
var firstRound = true;
let maxNumber = 10;

let createOperating = function() {
    let operateOptions = [];
    if( $('#sum-operator').is(":checked") ){
        operateOptions.push('+');
    }
    if( $('#sub-operator').is(":checked") ){
        operateOptions.push('-');
    }
    if( $('#mul-operator').is(':checked') ){
        operateOptions.push('*');
    }
    if( $('#div-operator').is(':checked') ){
        operateOptions.push('/');
    }
    let randomOperator = function(){
        if(operateOptions.length === 1) {
            return operateOptions[0];
        }
        else{
            let position = Math.floor( Math.random() * operateOptions.length);
            return(operateOptions[position]);
        }
    }    
    
    let operator = randomOperator();
    let number1 = Math.round( Math.random() * maxNumber );
    let number2 = function() {
        if(operator === '/') {
            return Math.round( ( Math.random() * (maxNumber - 1) ) + 1 ) //This is for number2 never to become zero in a division, causing a NaN situation
        }
        if(operator === '-'){
            return Math.round(  Math.random() * (number1) ) //This is for number2 never be higher than number1 in a subtraction, causing a negative number 
        }
        return Math.round ( Math.random() * 10 );
    }    
    
    let operation = `${number1} ${operator} ${number2()}`;   
    let result = Math.floor( eval(operation) );
    return( [operation , result]);
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

let updateScoreAndHighScore = function() {
    $('#current-score').text(currentScore);
    if(currentScore > highScore){
        highScore = currentScore;
        $('#high-score').text(highScore);
    }
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
        updateScoreAndHighScore();
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
    updateScoreAndHighScore();
    $('#user-answer').removeAttr('readonly');
}

let changeMaxValue = function() {
    let maxNumberChanged = $('#number-limit-control').val();
    $('#number-limit-exhibt').text(maxNumberChanged);
    maxNumber = maxNumberChanged;
}

let firstLoad = function() {
    $('#game-over').hide();
    setQuestion();
    $('#number-limit-exhibt').text(maxNumber);
    $('#number-limit-control').val(maxNumber);
}

$(document).ready( function(){
    firstLoad();
    $(document).on('keydown' , '#user-answer', startGame);
    $(document).on('change' , '#user-answer', checkUserAnswer);
    $(document).on('click' , '#btn-try-again' , reestartGame);
    $(document).on('change' , '#number-limit-control' , changeMaxValue);
});
