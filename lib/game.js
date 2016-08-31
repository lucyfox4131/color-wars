var $ = require('jquery');
var levelUpScreen = document.getElementById("level-up");
var helper = require('./helpers.js');
var Board = require('./board.js');
var ColorFiller = require('./color_filler.js');
var _ = require('lodash');

function Game(canvas, fillCanvas, level=0) {
  this.canvas = canvas;
  this.context = canvas.getContext("2d");
  this.currentLevel = level;
  this.board = new Board();
  this.highScore = 0;
  this.fillCanvas = fillCanvas;
  this.fillContext = fillCanvas.getContext("2d");
}

Game.prototype.start = function () {
  localStorage.highScore = 0;
  $("#scores").append("Play the game for a new high score!");
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
    console.log("Before: ", this.currentLevel);
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
    $("#scores").html("");
    $("#scores").append("High Score: " + localStorage.getItem("highScore"));
    game.renderNext();
  });
}

var userColor = "red";
var compColor = "blue";

function listenForUserClick(game){
  console.log("WOAHHHHHHH you got it!");
  game.canvas.addEventListener('click', function (event) {
    var blocks = game.board.allBlocks();
    var click = helper(event);
    var compBlocks = game.board.compBlocks;
    var compColors = compBlocks.map(function(block){
      return block.color;
    });
    console.log("CompColors:", compColors);
    blocks.forEach(function(block){
      if (block.contains({x: click.x, y: (click.y)})){
        console.log("You got a block!", block.x, block.y, block.color);
        if (_.includes(compColors, block.color)) {
          console.log("That's the computer's spot. Pick another one!");
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
  var compBlockOne = compBlocks[0]
  var compColorOne = compBlockOne.color
  var compBlockTwo = compBlocks[1]
  var compColorTwo = compBlockTwo.color

  var compFillerOne = new ColorFiller(compBlockOne, pattern, context, game);
  var compFillerTwo = new ColorFiller(compBlockTwo, pattern, context, game);
  var userFiller = new ColorFiller(userBlock, pattern, context, game);
  userFiller.expandColor(userBlock, context, compColorOne, userColor, game);
  compFillerOne.expandColor(compBlockOne, context, compColorOne, userColor, game);
  compFillerTwo.expandColor(compBlockTwo, context, compColorTwo, userColor, game);
}


Game.prototype.endGameSequence = function (counts, total){
  if(counts[0] > counts[1] && counts[0] > counts[2]){
    var userScore = Math.floor(counts[0]/total * 100);
    localStorage.highScore = parseInt(localStorage.highScore) + userScore ;
    this.nextLevel();
  } else {
    $("#scores").html("");
    $("#scores").append("Oh shoot you lost this level, try again");
    this.fillContext.clearRect(0, 0, this.fillCanvas.width, this.fillCanvas.height);
    setTimeout(this.start(), 1000);
    setTimeout(function(){
      $("#scores").html("");
    }, 3000);
  }
};

module.exports = Game;
