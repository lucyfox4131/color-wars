var canvas = document.getElementById("document");
var $ = require('jquery');
var gameStart = document.getElementById("game-start");
var Game = require('./game.js');
var levelUpScreen = document.getElementById("level-up");
var fillCanvas = document.getElementById('scoresCanvas');
var game;

setUpStartScreen();

function setUpStartScreen(){
  $("#game-div").hide();
  $("#game-over").hide();
  $("#instructions").hide();
  $(levelUpScreen).hide();
}

$('body').on('click', '#start-btn', function(){
  kickOffGame();
});

$('body').on('click', "#instructions-btn", function(){
  toggleInstructions();
});

function kickOffGame(){
  $("body").css("background-color", "#F5F3EE");
  $(gameStart).hide();
  $("#game-div").show();
  //lines above move to dom manipulator
  //lines below trigger game state
  game = new Game(canvas, fillCanvas);
  game.start();
}

function toggleInstructions(){
  $("#instructions").show();
  $(gameStart).hide();
  $("#got-it").on('click', function(){
    $("#instructions").hide();
    $(gameStart).show();
  });
}
