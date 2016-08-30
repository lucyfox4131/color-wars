function ColorFiller(currentBlock, pattern = null, context) {
  this.pattern = pattern;
  this.currentBlock = currentBlock
  // this.parent = currentBlock.parent;
  // this.child = currentBlock.child;
  // this.currentGreyChild = currentBlock.child && currentBlock.child.color === "grey";
  // this.currentGreyParent = currentBlock.parent && currentBlock.parent.color === "grey";
  // this.currentConnection = this.isCurrentConnection(currentBlock);
  // this.connectionBlocks = this.eachConnectionBlock(currentBlock);
  this.isCurrentConnection = isCurrentConnection;
  this.eachConnectionBlock = eachConnectionBlock;
}

// ColorFiller.prototype.isCurrentConnection = function(currentBlock){
//   if (this.pattern) {
//     var result;
//     var connections = this.pattern.connections;
//     connections.forEach(function(connection){
//       if (currentBlock.x === connection.x && currentBlock.y === connection.y){
//         result = true;
//       }
//     });
//     return result;
//   }
// };

function isCurrentConnection(currentBlock, pattern){
  if (pattern) {
    var result;
    var connections = pattern.connections;
    connections.forEach(function(connection){
      if (currentBlock.x === connection.x && currentBlock.y === connection.y){
        result = true;
      }
    });
    return result;
  }
}

ColorFiller.prototype.expandColor = function(currentBlock, context, pattern){
  var parent = currentBlock.parent
  var child = currentBlock.child
  var currentGreyParent = parent && parent.color === "grey";
  var currentGreyChild = child && child.color === "grey";

  // if (isCurrentConnection(currentBlock, this.pattern)){
  //   this.fillDoubleBlock(currentBlock, context, pattern);
  // }

  if (currentGreyParent){
    parent.color = currentBlock.color;
    parent.draw(currentBlock.color, context);
    setTimeout(this.expandColor.bind(this), 70, parent, context)
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
    if(block.color === "grey"){
      block.color = currentBlock.color;
      block.draw(block.color, context);
      this.expandColor(block, context);
    }
  });
};

function eachConnectionBlock(currentBlock, pattern){
  if (pattern) {
    var blocks = [];
    pattern.segments.forEach(function(segment){
      blocks.push(segment.find(currentBlock));
    });
    blocks = [].concat.apply([], blocks);
    return blocks;
  }
}
// ColorFiller.prototype.eachConnectionBlock = function(currentBlock){
//   if (this.pattern) {
//     var blocks = [];
//     this.pattern.segments.forEach(function(segment){
//       blocks.push(segment.find(currentBlock));
//     });
//     blocks = [].concat.apply([], blocks);
//     return blocks;
//   }
// };

module.exports = ColorFiller;
