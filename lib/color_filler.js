function ColorFiller(currentBlock, pattern, context, game, userColor, compColor) {
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

ColorFiller.prototype.expandColor = function(currentBlock, context, compColor, userColor, game){
  calculateColorValues(compColor, userColor, game)
  var parent = currentBlock.parent;
  var child = currentBlock.child;
  var currentGreyParent = parent && parent.color === "grey";
  var currentGreyChild = child && child.color === "grey";

  if (isCurrentConnection(currentBlock, this.pattern, context)){
    this.fillDoubleBlock(currentBlock, context, this.pattern, compColor, userColor, game);
  }

  if (currentGreyParent){
    parent.color = currentBlock.color;
    parent.draw(currentBlock.color, context);
    setTimeout(this.expandColor.bind(this), 70, parent, context, compColor, userColor, game);
  }
  if(currentGreyChild){
    child.color = currentBlock.color;
    child.draw(child.color, context);
    setTimeout(this.expandColor.bind(this), 70, child, context, compColor, userColor, game);
  }
};

ColorFiller.prototype.fillDoubleBlock = function(currentBlock, context, pattern, compColor, userColor, game){
  var eachBlock = eachConnectionBlock(currentBlock, pattern);
  eachBlock.forEach(function(block){
    if (block.color === "grey") {
      block.color = currentBlock.color;
      block.draw(block.color, context);
      this.expandColor(block, context, compColor, userColor, game);
    } else if (currentBlock.color === "blue" && block.color === "red") {
      block.color = "blue";
      block.draw(block.color, context);
      this.expandColor(block, context, compColor, userColor, game);
    } else if (currentBlock.color === "red" && block.color === "blue") {
      block.color = "red";
      block.draw(block.color, context);
      this.expandColor(block, context, compColor, userColor, game);
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


function calculateColorValues(compColor, userColor, game){
  var blocks = game.board.allBlocks();

  var comp = 0;
  var user = 0;
  blocks.forEach(function(block){
    if (block.color === userColor){ user += 1;}
    if (block.color === compColor){ comp += 1;}
  });
  if( comp + user === blocks.length){
    console.log("GAME OVERRRR");
    game.endGameSequence(comp, user, blocks.length);
  }
}

module.exports = ColorFiller;
