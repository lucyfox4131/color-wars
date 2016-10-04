var $ = require('jquery');
var levelUpScreen = document.getElementById("level-up");
var instructions = document.getElementById('instructions');
var gameStart = document.getElementById("game-start");
var scoreBoard = document.getElementById("scores");
var highScore = localStorage.highScore || 0;

var domManager = {
  startScreen: startScreen,
  kickOffGame: kickOffGame,
  toggleInstructions: toggleInstructions,
  gameStartScores: gameStartScores,
  nextLevel: nextLevel,
  levelUp: levelUp,
  gameOverScreen: gameOverScreen,
  levelUpClickSequence: levelUpClickSequence,
  compSpot: compSpot,
  youLost: youLost,
};

function startScreen(){
  $(scoreBoard).html("");
  $("#game-div").hide();
  $("#game-over").hide();
  $(instructions).hide();
  $(levelUpScreen).hide();
}

function kickOffGame(){
  $("body").css("background-color", "#F5F3EE");
  $(gameStart).hide();
  $("#game-div").show();
}

function toggleInstructions(){
  $(instructions).show();
  $(gameStart).hide();
  $("#got-it").on('click', function(){
    $(instructions).hide();
    $(gameStart).show();
  });
}

function gameStartScores(){
  $(scoreBoard).append("High Score: " + highScore +
  "<br>Current Score: " + localStorage.currentScore +
  "<br>Keep playing for a new high score.");
}

function nextLevel(){
  $("#game-div").hide();
  $("body").off();
}

function levelUp(){
  $(levelUpScreen).fadeIn(2000);
}

function gameOverScreen(){
  $(levelUpScreen).hide();
  $('#game-over').fadeIn(2000);
}

function levelUpClickSequence(){
  $("#game-div").show();
  $(levelUpScreen).hide();
  $(scoreBoard).html("").append("High Score: " + localStorage.highScore +
  "<br> Current Score: " + localStorage.getItem("currentScore"));
}

function compSpot(){
  $(scoreBoard).html("").append("<br>That's the computer's spot. Pick another one!");
}

function youLost(){
  $(scoreBoard).html("").append("Oh shoot you lost this level, try again<br>");
  
}
module.exports = domManager;
