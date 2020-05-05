var timeLeft = 10;
var currentScore = 0;
var firstRound = true;

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
    let number1 = Math.round( Math.random() * 10 );
    let number2 = function() {
        if(operator === '/') {
            return Math.round( ( Math.random() * (10 - 1) ) + 1 ) //This is for number 2 never to become zero in a division, causing a NaN situation
        }
        if(operator === '-'){
            return Math.round(  Math.random() * (10 - number1) ) //This is for number2 never be higher than number1 in a subtraction, causing a negative number 
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
