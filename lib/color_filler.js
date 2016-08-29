const Block = require('../lib/block.js');
const Segment = require('../lib/segment.js');
const Pattern = require('../lib/pattern.js');

function ColorFiller(currentBlock) {
  this.parent = currentBlock.parent
  this.child = currentBlock.child
  this.currentGreyChild = currentGreyNeighbor(this.parent) || null;
  this.currentGreyParent = currentGreyNeighbor(this.child) || null;
}

function currentGreyNeighbor(block){
  if (block && block.color == "grey") {
    return block
  }
}

module.exports = ColorFiller;
