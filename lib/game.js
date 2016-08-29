var $ = require('jquery');
// var Pattern = require('./pattern.js');
var levelUpScreen = document.getElementById("level-up");
// var levels = require('./levels.js');
var helper = require('./helpers.js');
var Board = require('./board.js');

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

Game.prototype.nextLevel = function () {
  this.currentLevel += 1;
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  $(this.canvas).hide();
  alert("You WON!!!!!");
  $(levelUpScreen).fadeIn(2000);

  if(this.currentLevel !== 5){
    listenForLevelUpClick(this);
  }else{
    alert("You're all done with the game. Check back later for more levels!")
  }
};

function listenForLevelUpClick(game){
  $("#level-up-btn").on('click', function(){
    console.log("You clicked the button! Yay you!");
    $(game.canvas).show();
    $(levelUpScreen).hide();
    game.start();
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
          fillIn(game.board.compBlock, block, game);
        }
      }
    });
  });
}

function fillIn(comp, user, game){
  expandColor(user, game);
  expandColor(comp, game);
}

function expandColor(currentBlock, game){
  calculateColorValues(compColor, userColor, game);
  var parent = currentBlock.parent;
  var child = currentBlock.child;
  var currentGreyParent = parent && parent.color === "grey";
  var currentGreyChild = child && child.color === "grey";
  if(isCurrentConnection(game, currentBlock)){
    var eachBlock = eachConnectionBlock(currentBlock, game);
    eachBlock.forEach(function(block){
      if(block.color === "grey"){
        block.color = currentBlock.color;
        block.draw(block.color, game.context);
        expandColor(block, game);
      }
    });
  }
  if (currentGreyParent){
    parent.color = currentBlock.color;
    parent.draw(parent.color, game.context);
    setTimeout(function(){
      expandColor(parent, game);
    }, 70);
  }
  if (currentGreyChild){
    child.color = currentBlock.color;
    child.draw(child.color, game.context);
    setTimeout(function(){
      expandColor(child, game);
    }, 70);
  }
}

function eachConnectionBlock(currentBlock, game){
  var blocks = [];
  var segments = game.board.pattern.segments;
  segments.forEach(function(segment){
    blocks.push(segment.find(currentBlock));
  });
  blocks = [].concat.apply([], blocks);
  return blocks;
}

function isCurrentConnection(game, currentBlock){
  var result;
  var connections = game.board.pattern.connections;
  connections.forEach(function(connection){
    if (currentBlock.x === connection.x && currentBlock.y === connection.y){
      result = true;
    }
  });
  return result;
}

function calculateColorValues(compColor, userColor, game){
  var blocks = game.board.allBlocks();

  var comp = 0;
  var user = 0;
  blocks.forEach(function(block){
    if (block.color === userColor){ user += 1;}
    if (block.color === compColor){ comp += 1;}
  });
  console.log("Computer Blocks", comp);
  console.log("User Blocks", user);
  if( comp + user === blocks.length){
    console.log("GAME OVERRRR");
    game.endGameSequence(comp, user, blocks.length);
  }
}

Game.prototype.endGameSequence = function (comp, user, total) {
  if(user > comp){
    this.nextLevel();
  } else {
    this.start();
  }
};

module.exports = Game;
