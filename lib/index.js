var canvas = document.getElementById("document");
var $ = require('jquery');
var Game = require('./game.js');
var fillCanvas = document.getElementById('scoresCanvas');
var domManager = require('./dom_manager.js');
var game;

setUpStartScreen();

function setUpStartScreen(){
  domManager.startScreen();
}

$('body').on('click', '#start-btn', function(){
  kickOffGame();
});

$('body').on('click', "#instructions-btn", function(){
  toggleInstructions();
});

function kickOffGame(){
  domManager.kickOffGame();
  game = new Game(canvas, fillCanvas);
  game.start();
}

function toggleInstructions(){
  domManager.toggleInstructions();
}

$('#game-over').on('click', '#replay-btn', function(){
  $('#game-over').hide();
  domManager.startScreen();
  kickOffGame();
});
