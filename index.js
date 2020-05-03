
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

let checkUserAnswer = function() {
    let userAnswer = $('#user-answer').val();
    //console.log(userAnswer);
    if( Number(userAnswer) === Number(currentOperation[1]) ) {
        //console.log('correct answer');
        currentScore++;
        $('#current-score').text(`Current score: ${currentScore}`);
        $('#user-answer').val('');
        timeLeft++;
        $('#counting-down').text(timeLeft);
        setQuestion();
    }
    else {
        //console.log('Wrong answer');
        $('#user-answer').val('');
    }
}

var timeLeft = 10;
let countingDown = function() {
    let timer = setInterval( function(){
        timeLeft--;
        if(timeLeft >= 0) {
            $('#counting-down').text(timeLeft);
        }
        else{
            clearInterval(timer);
            endGame();
        }        
        
    } , 1000);
}

var currentScore = 0;
$(document).ready( function(){
    setQuestion();
    $(document).on('change' , '#user-answer', checkUserAnswer);
    countingDown();
});
