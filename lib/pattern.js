const Segment = require('../lib/segment.js');

function Pattern(options = {}){
  this.segmentDatas = options.segments || 0;
  this.segments = this.build();
  this.connections = options.connections || [];
  this.placeCompBlocks = randomlyPlaceAndColorCompBlocks
};

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

Pattern.prototype.draw = function (compColors, context) {
  var blocks = this.blocks();
  drawAllBlocks(blocks, compColors, context);
  var computerBlocks = drawComputerBlock(blocks, compColors, context);
  return computerBlocks;
};

function drawAllBlocks(blocks, compColors, context){
  requestAnimationFrame(function(){
    blocks.forEach(function(block){
      block.draw("grey", context);
    });
  });
}

function drawComputerBlock(blocks, compColors, context){
  var compBlocks = randomlyPlaceAndColorCompBlocks(blocks, compColors);
  drawBlocksOnCanvas(compBlocks, context);
  return compBlocks;
}

function drawBlocksOnCanvas(compBlocks, context){
  requestAnimationFrame(function(){
    compBlocks.forEach(function(block){
      block.draw(block.color, context);
    });
  });
}

function randomlyPlaceAndColorCompBlocks(blocks, compColors){
  return compColors.map(function(color) {
    var block = blocks[Math.floor(Math.random() * blocks.length)];
    block.color = color;
    return block;
  });
}

module.exports = Pattern;
