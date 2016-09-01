var Pattern = require('./pattern.js');
var levels = require('./levels.js');

var pink         = "#FF0066";
var blue         = "#2BFDC9";
var compColorOne = pink;
var compColorTwo = blue;
var compColors   = [compColorOne, compColorTwo];

function Board(){
  this.pattern = null;
  this.compBlocks = [];
}

Board.prototype.renderLevelPattern = function (levelNum, context){
  var options = levels[levelNum];
  this.pattern = new Pattern(options);
  this.compBlocks = this.pattern.draw(compColors, context);
};

Board.prototype.allBlocks = function(){
  return this.pattern.blocks();
};

module.exports = Board;
