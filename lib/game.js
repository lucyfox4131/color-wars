var $ = require('jquery');
var levelUpScreen = document.getElementById("level-up");
var helper = require('./helpers.js');
var Board = require('./board.js');
var ColorFiller = require('./color_filler.js');

function Game(canvas, level=0) {
  this.canvas = canvas;
  this.context = canvas.getContext("2d");
  this.currentLevel = level;
  this.board = new Board();
}

Game.prototype.start = function () {
  this.board.renderLevelPattern(this.currentLevel, this.context);
  listenForUserClick(this);
};

Game.prototype.renderNext = function () {
  this.board.renderLevelPattern(this.currentLevel, this.context);
};

Game.prototype.nextLevel = function () {
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
    console.log("You clicked the button! Yay you!");
    $("#game-div").show();
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
    blocks.forEach(function(block){
      if (block.contains({x: click.x, y: (click.y)})){
        console.log("You got a block!", block.x, block.y, block.color);
        if (block.color === "blue"){
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
  var compFiller = new ColorFiller(comp, pattern, context);
  var userFiller = new ColorFiller(user, pattern, context);
  userFiller.expandColor(user, context, compColor, userColor, game);
  compFiller.expandColor(comp, context, compColor, userColor, game);
}

Game.prototype.endGameSequence = function (comp, user, total){
  if(user > comp){
    this.nextLevel();
  } else {
    $("#scores").append("Oh shoot you lost this level, try again")
    setTimeout(this.start(), 1000)
    setTimeout(function(){
      $("#scores").html("")
    }, 3000)
  }
};

module.exports = Game;
