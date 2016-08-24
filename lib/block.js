function Block(options){
  options = options || {}
  this.x = options.x || 0;
  this.y = options.y || 0;
  this.width = options.width || 10;
  this.height = options.height  || 10;
  this.color = options.color || "grey";
};

Block.prototype.coordinates = function () {
  var coordinates = []
  for(x = this.x; x <= (this.x + this.width); x++){
    for(y = this.y; y <= (this.y + this.height); y++){
      coordinates.push({x: x, y: y})
    }
  }
  return coordinates;
};


module.exports = Block;
