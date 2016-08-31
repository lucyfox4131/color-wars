var canvas = document.getElementById("document");
var $ = require('jquery');
var gameStart = document.getElementById("game-start");
var Game = require('./game.js');
var levelUpScreen = document.getElementById("level-up");
var fillCanvas = document.getElementById('scoresCanvas')

requestAnimationFrame(function(){
  $("#game-div").hide();
  $("#game-over").hide();
  $("#instructions").hide();
  $(levelUpScreen).hide();
  $('#start-btn').on('click', function(){
    $("body").css("background-color", "#F5F3EE");
    $(gameStart).hide();
    $("#game-div").show();
    var game = new Game(canvas, fillCanvas);
    game.start();
  });

  $("#instructions-btn").on('click', function(){
    $("#instructions").show();
    $(gameStart).hide();
    $("#got-it").on('click', function(){
      $("#instructions").hide();
      $(gameStart).show();
    });
  });
});
