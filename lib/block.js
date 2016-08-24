function Block(options){
  options = options || {}
  this.x = options.x || 0;
  this.y = options.y || 0;
  this.width = options.width || 10;
  this.height = options.height  || 10;
  this.color = options.color || "grey";
  this.child = options.child || null;
  this.parent = options.parent || null;
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

Block.prototype.contains = function (coordinate) {
  var coordinates = this.coordinates();
  var result = false;
  coordinates.forEach(function(coord){
    if(coord.x === coordinate.x && coord.y === coordinate.y) return result = true;
  })
  return result;
};

Block.prototype.draw = function (color, context) {
  context.fillStyle = color;
  context.fillRect(this.x, this.y, this.width, this.height);
};



module.exports = Block;
