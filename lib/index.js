var canvas = document.getElementById("document");
var $ = require('jquery');
var Game = require('./game.js');
var fillCanvas = document.getElementById('scoresCanvas');
var domManager = require('./dom_manager.js');

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
  var game = new Game(canvas, fillCanvas);
  game.start();
}

function toggleInstructions(){
  domManager.toggleInstructions();
}
