// const Block = require('../lib/block.js');
const Segment = require('../lib/segment.js');

function Pattern(options = {}){
  this.segmentDatas = options.segments || 0;
  this.segments = this.build();
  this.connections = options.connections || [];
}

Pattern.prototype.build = function(){
  if (this.segmentDatas){
    var segments = [];
    this.segmentDatas.forEach(function(data){
      var seg = new Segment();
      seg.create(data);
      segments.push(seg);
    });
    return segments;
  } else {
    return null;
  }
};

Pattern.prototype.blocks = function () {
  var arrays = [];
  this.segments.forEach(function(segment){
    arrays.push(segment.allBlocks());
  });
  var blocks = [].concat.apply([], arrays);
  return blocks;
};

Pattern.prototype.draw = function (compColor, context) {
  var blocks = this.blocks();
  drawAllBlocks(blocks, compColor, context);
  var computerBlock = drawComputerBlock(blocks, compColor, context);
  return computerBlock;
};

function drawAllBlocks(blocks, compColor, context){
  requestAnimationFrame(function(){
    blocks.forEach(function(block){
      block.draw("grey", context);
    });
  });
}

function drawComputerBlock(blocks, compColor, context){
  var block = blocks[Math.floor(Math.random() * blocks.length)];
  requestAnimationFrame(function(){
    block.color = compColor;
    block.draw(block.color, context);
  });
  return block;
}

module.exports = Pattern;
