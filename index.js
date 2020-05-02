$('#counting-down').text(10);

let createOperating = function() {
    let number1 = Math.round( Math.random() * 10 );
    let number2 = Math.round ( Math.random() * 10 );
    let result = number1 + number2;
    return( `${number1} + ${number2}`);
}

let setFirstRound = function(){
    $('#operation').text(createOperating);
}

$(document).ready( function(){
    setFirstRound();
});