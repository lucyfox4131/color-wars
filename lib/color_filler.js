function ColorFiller(currentBlock, pattern = null) {
  this.pattern = pattern;
  this.parent = currentBlock.parent;
  this.child = currentBlock.child;
  this.currentGreyChild = currentBlock.child && currentBlock.child.color === "grey";
  this.currentGreyParent = currentBlock.parent && currentBlock.parent.color === "grey";
  this.currentConnection = this.isCurrentConnection(currentBlock);
}

ColorFiller.prototype.isCurrentConnection = function(currentBlock){
  if (this.pattern) {
    debugger;
    var result;
    var connections = this.pattern.connections;
    connections.forEach(function(connection){
      if (currentBlock.x === connection.x && currentBlock.y === connection.y){
        result = true;
      }
    });
    return result;
  }
};

//change the color of the double block if there is one
//change the color of the current block's parent and child, and do
//the same for the double block if there is one


module.exports = ColorFiller;
