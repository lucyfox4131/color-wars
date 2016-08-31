const Block = require('../lib/block.js');

function Segment(){
  this.length = 0;
  this.head = null;
  this.orientation = null;
}

Segment.prototype.create = function(options){
  this.orientation = options.orientation;
  buildSegment(options, this);
};

function buildSegment(options, segment){
  var orientation = options.orientation;
  var parentBlock = segment.head;
  for(var i = 0; i < options.length; i++){
    if(!parentBlock){
      segment.head = new Block({x: options.startX, y: options.startY});
      parentBlock = segment.head;
      segment.length++;
    } else {
      parentBlock = appendBlock(parentBlock, segment, orientation);
      segment.length++;
    }
  }
}

function appendBlock(parentBlock, segment, orientation){
  var newBlock = new Block();
  if (orientation === "horizontal"){
    newBlock = new Block({x: parentBlock.x + 10, y: parentBlock.y, parent: parentBlock});
  }
  if (orientation === "vertical"){
    newBlock = new Block({x: parentBlock.x, y: parentBlock.y + 10, parent: parentBlock});
  }
  parentBlock.child = newBlock;
  return newBlock;
}

Segment.prototype.allBlocks = function(){
  var result = [];
  var currentBlock = this.head;
  for (var i = 0; i < this.length; i++ ){
    result.push(currentBlock);
    currentBlock = currentBlock.child;
  }
  return result;
};

Segment.prototype.find = function (currentBlock) {
  var result = this.allBlocks().filter(function(block){
    return currentBlock.x === block.x && currentBlock.y === block.y;
  });
  return result;
};

module.exports = Segment;
