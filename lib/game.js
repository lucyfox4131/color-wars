var $ = require('jquery');
var levelUpScreen = document.getElementById("level-up");
var helper = require('./helpers.js');
var Board = require('./board.js');
var ColorFiller = require('./color_filler.js');
var _ = require('lodash');
var scoreBoard = document.getElementById("scores");
let win = new Audio('audio/tada.mp3');
let loose = new Audio('audio/sad.mp3');

function Game(canvas, fillCanvas, level=0) {
  this.canvas = canvas;
  this.context = canvas.getContext("2d");
  this.currentLevel = level;
  this.board = new Board();
  this.highScore = localStorage.highScore || 0;
  this.currentScore = 0;
  this.fillCanvas = fillCanvas;
  this.fillContext = fillCanvas.getContext("2d");
}

Game.prototype.start = function () {
  $(scoreBoard).append("High Score: " + localStorage.highScore + "<br>Current Score: 0 <br>Play the game for a new high score!");
  this.board.renderLevelPattern(this.currentLevel, this.context);
  listenForUserClick(this);
};

Game.prototype.renderNext = function () {
  this.board.renderLevelPattern(this.currentLevel, this.context);
  //compColors gets accessed within this method
};

Game.prototype.nextLevel = function () {
  this.fillContext.clearRect(0, 0, this.fillCanvas.width, this.fillCanvas.height);
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  $("#game-div").hide();
  $("body").off();
  if(this.currentLevel < 7){
    $(levelUpScreen).fadeIn(3000);
    listenForLevelUpClick(this);
  }else{
    $(levelUpScreen).hide();
    $('#game-over').fadeIn(3000);
  }
};

function listenForLevelUpClick(game){
  $("body").on('click', "#level-up-btn", function(){
    game.currentLevel += 1;
    $("#game-div").show();
    $(levelUpScreen).hide();
    $(scoreBoard).html("");
    $(scoreBoard).append("High Score: " + localStorage.getItem("highScore") +
                        "<br> Current Score: " + localStorage.getItem("currentScore"));
    game.renderNext();
  });
}

var userColor = "red";
// var compColor = "blue";

function listenForUserClick(game){
  game.canvas.addEventListener('click', function (event) {
    var blocks = game.board.allBlocks();
    var click = helper(event);
    var compBlocks = game.board.compBlocks;
    var compColors = compBlocks.map(function(block){
      return block.color;
    });
    blocks.forEach(function(block){
      if (block.contains({x: click.x, y: (click.y)})){
        console.log("You got a block!", block.x, block.y, block.color);
        if (_.includes(compColors, block.color)) {
          $(scoreBoard).html("")
          $(scoreBoard).append("High Score: " + localStorage.highScore +
                              "<br>Current Score: " + localStorage.currentScore+
                              "<br>That's the computer's spot. Pick another one!")
        }else{
          block.color = userColor;
          block.draw(block.color, game.context);
          fillIn(game.board.compBlocks, block, game, game.board.pattern, game.context);
        }
      }
    });
  });
}

function fillIn(compBlocks, userBlock, game, pattern, context){
  var compBlockOne = compBlocks[0];
  var compColorOne = compBlockOne.color;
  var compBlockTwo = compBlocks[1];
  var compColorTwo = compBlockTwo.color;

  var compFillerOne = new ColorFiller(compBlockOne, pattern, context, game);
  var compFillerTwo = new ColorFiller(compBlockTwo, pattern, context, game);
  var userFiller = new ColorFiller(userBlock, pattern, context, game);
  userFiller.expandColor(userBlock, context, compColorOne, userColor, game);
  compFillerOne.expandColor(compBlockOne, context, compColorOne, userColor, game);
  compFillerTwo.expandColor(compBlockTwo, context, compColorTwo, userColor, game);
}

Game.prototype.endGameSequence = function (counts, total){
  if(counts[0] > counts[1] && counts[0] > counts[2]){
    win.play();
    calculateFinalScores(counts[0], total, this)
  } else {
    loose.play();
    $("#scores").html("");
    $("#scores").append("High Score: " + localStorage.highScore +
                        "<br>Current Score: " + localStorage.currentScore+
                        "<br>Oh shoot you lost this level, try again");
    this.fillContext.clearRect(0, 0, this.fillCanvas.width, this.fillCanvas.height);
    setTimeout(this.start(), 1000);
  }
};

function calculateFinalScores(userScore, total, game){
  var userScore = Math.floor(userScore/total * 100);
  localStorage.currentScore = parseInt(localStorage.currentScore) + userScore;
  if(parseInt(localStorage.highScore) < parseInt(localStorage.currentScore)){
    localStorage.highScore = localStorage.currentScore;
  };
  game.nextLevel();
}

module.exports = Game;
