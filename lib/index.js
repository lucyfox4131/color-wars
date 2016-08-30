var canvas = document.getElementById("document");
var $ = require('jquery');
var gameStart = document.getElementById("game-start");
var Game = require('./game.js');
var levelUpScreen = document.getElementById("level-up");

requestAnimationFrame(function(){
  $(canvas).hide();
  $(levelUpScreen).hide();
  $('#start-btn').on('click', function(){
    $(gameStart).hide();
    $(canvas).show();
    var game = new Game(canvas);
    game.start();
  });
});
