var $ = require('jquery');
var levelUpScreen = document.getElementById("level-up");
var helper = require('./helpers.js');
var Board = require('./board.js');
var ColorFiller = require('./color_filler.js');
var _ = require('lodash');
var scoreBoard = document.getElementById("scores");
let win = new Audio('audio/tada.mp3');
let loose = new Audio('audio/sad.mp3');

// domManager.js
// var domManager = {
//   all functions trigger dom changes, no non-view logic
// }
//
// game.js
// All logic that handles changing dom and breaking request animation frame is gone
// all prototype functions should change game state only and/or return answers
//
// index.js
// calls all the game changes prototypes as needed
// triggers all dom manipulation based on game state or return value from game calls


function Game(canvas, fillCanvas, level=0) {
  localStorage.currentScore = 0;
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
  $(scoreBoard).append("High Score: " + localStorage.highScore +
                        "<br>Current Score: " + localStorage.currentScore +
                        "<br>Keep playing for a new high score.");
  this.board.renderLevelPattern(this.currentLevel, this.context);
  listenForUserClick(this);
};

Game.prototype.renderNext = function () {
  this.board.renderLevelPattern(this.currentLevel, this.context);
};

Game.prototype.nextLevel = function () {
  this.fillContext.clearRect(0, 0, this.fillCanvas.width, this.fillCanvas.height);
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  $("#game-div").hide();
  $("body").off();
  if(this.currentLevel < 9){
    $(levelUpScreen).fadeIn(2000);
    listenForLevelUpClick(this);
  }else{
    $(levelUpScreen).hide();
    $('#game-over').fadeIn(2000);
  }
};

function listenForLevelUpClick(game){
  $("body").on('click', "#level-up-btn", function(){
    game.currentLevel += 1;
    $("#game-div").show();
    $(levelUpScreen).hide();
    $(scoreBoard).html("").append("High Score: " + localStorage.getItem("highScore") +
                        "<br> Current Score: " + localStorage.getItem("currentScore"));
    game.renderNext();
  });
}

var userColor = "#FDB12B";

function listenForUserClick(game){
  game.fillContext.clearRect(0, 0, game.fillCanvas.width, game.fillCanvas.height);
  game.canvas.addEventListener('click', function (event) {
    var blocks = game.board.allBlocks();
    var click = helper(event);
    var compBlocks = game.board.compBlocks;
    var compColors = compBlocks.map(function(block){ return block.color; });
    checkBlocks(blocks, click, compColors, game);
  });
}

function checkBlocks(blocks, click, compColors, game){
  blocks.forEach(function(block){
    if (block.contains({x: click.x, y: (click.y)})){ expandOrErrorBlock(block, compColors, game); }
  });
}
function expandOrErrorBlock(block, compColors, game){
  if (_.includes(compColors, block.color)) {
    $(scoreBoard).html("").append("<br>That's the computer's spot. Pick another one!");
  } else {
    drawUserBlock(block, game);
  }
}

function drawUserBlock(block, game){
  block.color = userColor;
  block.draw(block.color, game.context);
  fillIn(game.board.compBlocks, block, game, game.board.pattern, game.context);
}

function fillIn(compBlocks, userBlock, game, pattern, context){
  var compFillerOne = new ColorFiller(compBlocks[0], pattern, context, game);
  var compFillerTwo = new ColorFiller(compBlocks[1], pattern, context, game);
  var userFiller = new ColorFiller(userBlock, pattern, context, game);
  userFiller.expandColor(userBlock, context, compBlocks[0].color, userColor, game);
  compFillerOne.expandColor(compBlocks[0], context, compBlocks[0].color, userColor, game);
  compFillerTwo.expandColor(compBlocks[1], context, compBlocks[1].color, userColor, game);
}

Game.prototype.endGameSequence = function (counts, total){
  if(counts[0] > counts[1] && counts[0] > counts[2]){
    win.play();
    calculateFinalScores(counts[0], total, this);
  } else {
    looseSequence(this);
  }
};

function looseSequence(game){
  loose.play();
  $(scoreBoard).html("").append("Oh shoot you lost this level, try again<br>");
  setTimeout(game.start(), 1000);
}

Game.prototype.checkAndTriggerGameOverSequence = function(counts){
  var blocks = this.board.allBlocks();
  if(reduceAdd(counts) === blocks.length){
    this.endGameSequence(counts, blocks.length);
  }
};

function reduceAdd(counts){
  return counts.reduce(function(a, b) {
    return a + b;
  }, 0);
}

function calculateFinalScores(userScore, total, game){
  var score = Math.floor(userScore/total * 100);
  localStorage.currentScore = parseInt(localStorage.currentScore) + score;
  checkHighScore();
  setTimeout(function(){ game.nextLevel(); }, 600);
}

function checkHighScore(){
  if(parseInt(localStorage.highScore) < parseInt(localStorage.currentScore)){
    localStorage.highScore = localStorage.currentScore;
  }
}
module.exports = Game;
