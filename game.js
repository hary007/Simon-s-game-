var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var i = 0;

$(document).on("keydown", function () {
  if (i == 0) {
    i = 1;
    nextSequence();
  }
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("." + randomChosenColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);

  $("h1").text("Level " + level);
}

function checkAnswer(currentLevel, userChosenColor) {
  if (userChosenColor == gamePattern[currentLevel]) {
    console.log("success");
  } else {
    console.log("failure");
    $("body").addClass("game-over");
    setTimeout(() => $("body").removeClass("game-over"), 200);
    playSound("wrong");
    $("h1").text("Game Over! Press any Key to Restart.");
    startOver();
  }

  if (currentLevel == level - 1) {
    setTimeout(() => nextSequence(), 1000);
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  i = 0;
}

$(".game-btn").on("click", function (event) {
  var userChosenColor = event.target.classList[1];
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1, userChosenColor);
});

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function () {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}
