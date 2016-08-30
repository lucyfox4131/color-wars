var canvas = document.getElementById("document");
var $ = require('jquery');
var gameStart = document.getElementById("game-start");
var Game = require('./game.js');
var levelUpScreen = document.getElementById("level-up");

requestAnimationFrame(function(){
  $("#game-div").hide();
  $(levelUpScreen).hide();
  $('#start-btn').on('click', function(){
    $("body").css("background-color", "#F5F3EE")
    $(gameStart).hide();
    $("#game-div").show();
    var game = new Game(canvas);
    game.start();
  });
});
