$('#counting-down').text(10);

let createOperating = function() {
    let number1 = Math.round( Math.random() * 10 );
    let number2 = Math.round ( Math.random() * 10 );
    let result = number1 + number2;
    return( [`${number1} + ${number2}` , number1+number2]);
}

var currentOperation;
let setFirstRound = function(){
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
    }
    else {
        //console.log('Wrong answer');
    }
}

var currentScore = 0;
$(document).ready( function(){
    setFirstRound();
    $(document).on('change' , '#user-answer', checkUserAnswer);
});