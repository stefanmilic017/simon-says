var buttonColours = [
    "red",//0
    "blue",//1
    "green",//2
    "yellow",//3
];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

function nextSequence() {

    userClickedPattern = [];

    level++;
    $("#level-title").text('Level ' + level);

    var randomNumber = Math.floor(Math.random()*4); // generate random number
    var randomChosenColour = buttonColours[randomNumber]; // select random colour
    gamePattern.push(randomChosenColour); // add colour to array
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); // button animation
    playSound(randomChosenColour);
}

//function for click
$(".btn").click(function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3"); // button audio
    audio.play();
}

function animatePress(currentColour){
    $("#"+ currentColour).addClass('pressed');
    setTimeout(function(){
        $("#"+ currentColour).removeClass('pressed');
    }, 100);
}

$(document).keypress(function(event){
    if(!started){
        nextSequence();
        $("#level-title").text('Level ' + level);
        started = true;
    }
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log('success');

        if(userClickedPattern.length === gamePattern.length)
        setTimeout(function(){
            nextSequence();
        },1000);
    }else{
        console.log('wrong');
        playSound('wrong');
        $('body').addClass('game-over');
        setTimeout(function(){
            $('body').removeClass('game-over');
        },200);
        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}