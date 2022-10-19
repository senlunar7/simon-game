
let gamePattern=[];

let buttonColors=["red", "blue", "green", "yellow"];
let userClickedPattern=[];

var started=false;
let level=0;


// Detecting keypress event-------
$(document).keypress(function(){
  if (!started) {
    $("#level-title").text("level "+ level);
    nextSequence();
    started = true;
  }

});
// To store the user clicked pattern in a array-------
$(".btn").click(function() {
  var userChosenColour= $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  //2. Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
  checkAnswer(userClickedPattern.length-1);
});



// checkfunction------------
function checkAnswer(currentLevel){
  //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    console.log("success");

    //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
    if (userClickedPattern.length === gamePattern.length){

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {

    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press any key to Restart");
    startOver();
  }
}

// nextSequence function ------
function nextSequence() {
  //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
userClickedPattern = [];

level++;
  $("#level-title").text("Level " + level);
// Generating a random number between 0-3--------
var randomNumber = Math.floor(Math.random()*4);
let randomChosenColour=buttonColors[randomNumber];
gamePattern.push(randomChosenColour);


// console.log(gamePattern);
$("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);
}


// funtion to play sound on button click----
function playSound(name){
var audio = new Audio("sounds/" + name + ".mp3");
audio.play();
}




// Animate function----------------

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function () {
       $("#"+currentColor).removeClass('pressed');
    }, 100);

}
// Restarting the game--------------
function startOver(){
  level = 0;
  gamePattern=[];
  started=false;
}
