//gerando a cor aleatória
var buttonColours = ["red","blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

//You'll need a way to keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

//2. Create a new variable called level and start at level 0.
var level = 0;

//1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keydown(function(){
    if(!started) {

        //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        $("#level-title").text("Level" + level);
        nextSequence();
        started = true;
    }
});

// 4. Check Wich Button was chosen
$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    
    userClickedPattern.push(userChosenColour);
    
    console.log(userClickedPattern);
    
    playSound(userChosenColour);
    
    animatePress(userChosenColour);
    
    console.log(userClickedPattern.length);
    checkAnswer(userClickedPattern.length-1);
    
});
    

function checkAnswer(currentLevel) {
    
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

        if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
            nextSequence();
        }, 1000);
        }

} else {

    console.log("wrong");

    //1. In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
    playSound("wrong");

    //2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
    $("body").addClass("game-over");
    setTimeout(function () {
    $("body").removeClass("game-over");
    }, 200);

    //3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();

    
    }

}

function nextSequence() {

    userClickedPattern = [];

    level++;

    $("#level-title").text("Level " + level);
    randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    //1. Use jQuery to select the button with the same id as the randomChosenColour
    //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    //3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
    playSound(randomChosenColour);
    
    
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}


// play color sound
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// animate button when clicked
function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");

    setTimeout(function() {
        $("#"+currentColour).removeClass("pressed")}, 
    100); 

}

