var Pattern = require('./pattern.js');
var levels = require('./levels.js');

// var userColor = "red";
var compColors = ["blue", "magenta"];

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
