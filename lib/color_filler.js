function ColorFiller(currentBlock, pattern, context) {
  this.pattern = pattern;
  this.currentBlock = currentBlock;
  this.isCurrentConnection = isCurrentConnection;
  this.eachConnectionBlock = eachConnectionBlock;
}

function isCurrentConnection(currentBlock, pattern){
  var result;
  var connections = pattern.connections;
  connections.forEach(function(connection){
    if (currentBlock.x === connection.x && currentBlock.y === connection.y){
      result = true;
    }
  });
  return result;
}

ColorFiller.prototype.expandColor = function(currentBlock, context){
  var parent = currentBlock.parent;
  var child = currentBlock.child;
  var currentGreyParent = parent && parent.color === "grey";
  var currentGreyChild = child && child.color === "grey";

  if (isCurrentConnection(currentBlock, this.pattern, context)){
    this.fillDoubleBlock(currentBlock, context, this.pattern);
  }

  if (currentGreyParent){
    parent.color = currentBlock.color;
    parent.draw(currentBlock.color, context);
    setTimeout(this.expandColor.bind(this), 70, parent, context);
  }
  if(currentGreyChild){
    child.color = currentBlock.color;
    child.draw(child.color, context);
    setTimeout(this.expandColor.bind(this), 70, child, context);
  }
};

ColorFiller.prototype.fillDoubleBlock = function(currentBlock, context, pattern){
  var eachBlock = eachConnectionBlock(currentBlock, pattern);
  eachBlock.forEach(function(block){
    if (block.color === "grey") {
      block.color = currentBlock.color;
      block.draw(block.color, context);
      this.expandColor(block, context);
    } else if (currentBlock.color === "blue" && block.color === "red") {
      block.color = "blue";
      block.draw(block.color, context);
      this.expandColor(block, context);
    } else if (currentBlock.color === "red" && block.color === "blue") {
      block.color = "red";
      block.draw(block.color, context);
      this.expandColor(block, context);
    }
  }.bind(this));
};

function eachConnectionBlock(currentBlock, pattern){
  var blocks = [];
  pattern.segments.forEach(function(segment){
    blocks.push(segment.find(currentBlock));
  });
  blocks = [].concat.apply([], blocks);
  return blocks;
}

module.exports = ColorFiller;
