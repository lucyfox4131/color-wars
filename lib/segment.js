const Block = require('../lib/block.js');

function Segment(options){
  this.length = 0;
  this.head = null;
  this.orientation = null;
}

Segment.prototype.create = function(options){
  this.orientation = options.orientation
  // if(options.orientation == "horizontal"){
    createHorizontalSegment(options, this)
  // }
}

function createHorizontalSegment(options, segment){
  var parentBlock = segment.head;
  for(var i = 0; i < options.length; i++){
    if(!parentBlock){
      segment.head = new Block({x: options.startX, y: options.startY})
      parentBlock = segment.head;
      segment.length++;
    } else {
      parentBlock = appendBlock(parentBlock, segment);
      segment.length++;
    }
  }
}

function appendBlock(parentBlock, segment){
  var newBlock = new Block({x: parentBlock.x + 10, y: parentBlock.y, parent: parentBlock})

  parentBlock.child = newBlock
  return newBlock
}


module.exports = Segment;
