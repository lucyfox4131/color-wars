var $ = require('jquery');
// var Pattern = require('./pattern.js');
var levelUpScreen = document.getElementById("level-up");
// var levels = require('./levels.js');
var helper = require('./helpers.js');
var Board = require('./board.js');
var ColorFiller = require('./color_filler.js');
var _ = require('lodash');

function Game(canvas, level=0) {
  this.canvas = canvas;
  this.context = canvas.getContext("2d");
  this.currentLevel = level;
  this.board = null;
}

Game.prototype.start = function () {
  this.board = new Board();
  this.board.renderLevelPattern(this.currentLevel, this.context);
  listenForUserClick(this);
};

Game.prototype.renderNext = function () {
  this.board = new Board();
  this.board.renderLevelPattern(this.currentLevel, this.context);
  //compColors gets accessed within this method
};

Game.prototype.nextLevel = function () {
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  $(this.canvas).hide();
  alert("You WON!!!!!");
  $(levelUpScreen).fadeIn(2000);
  $("body").off();
  if(this.currentLevel < 4){
    console.log("Before: ", this.currentLevel);
    listenForLevelUpClick(this);
  }else{
    alert("You're all done with the game. Check back later for more levels!");
  }
};

function listenForLevelUpClick(game){
  $("body").on('click', "#level-up-btn", function(){
    game.currentLevel += 1;
    console.log("You clicked the button! Yay you!");
    $(game.canvas).show();
    $(levelUpScreen).hide();
    console.log("After: ", game.currentLevel);
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
      return block.color
    })
    console.log("CompColors:", compColors)
    blocks.forEach(function(block){
      if (block.contains({x: click.x, y: (click.y)})){
        console.log("You got a block!", block.x, block.y, block.color);
        if (_.includes(compColors, block.color)) {
          console.log("That's the computer's spot. Pick another one!");
        }else{
          block.color = userColor;
          block.draw(block.color, game.context);
          fillIn(game.board.compBlock, block, game, game.board.pattern, game.context);
        }
      }
    });
  });
}

function fillIn(comp, user, game, pattern, context){

  var compFiller = new ColorFiller(comp, pattern, context, game);
  var userFiller = new ColorFiller(user, pattern, context, game);
  debugger;
  userFiller.expandColor(user, context, compColor, userColor, game);
  compFiller.expandColor(comp, context, compColor, userColor, game);
}

Game.prototype.endGameSequence = function (comp, user, total){
  if(user > comp){
    this.nextLevel();
  } else {
    this.start();
  }
};

module.exports = Game;
