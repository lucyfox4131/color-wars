// var $ = require('jquery');
var Pattern = require('./pattern.js');
// var helper = require('./helpers.js');
var levels = require('./levels.js');

var compColor = "blue";
var userColor = "red";

function Board(){
  this.pattern = null;
  this.compBlock = null;
}

Board.prototype.renderLevelPattern = function (levelNum, context){
  var options = levels[levelNum];
  this.pattern = new Pattern(options);
  this.compBlock = this.pattern.draw(compColor, context);
};

Board.prototype.allBlocks = function(){
  return this.pattern.blocks();
};

module.exports = Board;
