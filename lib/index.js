var helper = require('./helpers.js');

var canvas = document.getElementById("document")
var context = canvas.getContext("2d")

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

var blocks = [];

function Block(x, y, width, height, color = "grey"){
  this.x = x;
  this.y = y
  this.width = width;
  this.height = height;
  this.color = color;
};

Block.prototype.draw = function (color) {
  context.fillStyle = color;
  context.fillRect(this.x, this.y, this.width, this.height);
};

Block.prototype.pixels = function () {
  var pixels = []
  for(x = this.x; x <= (this.x + this.width); x++){
    for(y = this.y; y <= (this.y + this.height); y++){
      pixels.push({x: x, y: y})
    }
  }
  return pixels;
};

Block.prototype.contains = function (pixel) {
  var pixels = this.pixels();
  var result;
  pixels.forEach(function(pix){
    if(pix.x === pixel.x && pix.y === pixel.y) return result = this;
  })
  return result;
};

for(var i = 0; i < 400; i += 10){
  var block = new Block(i, 10, 10, 10);
  blocks.push(block)
}
// build horizontal line function, starting x, ending x/length
// build a verticle line function
// build blocks/add horizontal or verticle lines to box
// build a curve

var board = {minX: 0, maxX: 400, minY: 10, maxY: 20};
// board can have multiple pieces
var compColor = "blue";

requestAnimationFrame(function(){
  blocks.forEach(function(block){
    block.draw("grey");
  })
  var block = blocks[Math.floor(Math.random() * blocks.length)]
  block.color = compColor;
  block.draw(block.color);
});

var userColor = getRandomColor();

canvas.addEventListener('click', function (event) {
  console.log(helper(event));
  var click = helper(event);
  var clickWithinX = click.x >= board.minX && click.x <= board.maxX
  var clickWithinY = click.y >= board.minY && click.y <= board.maxY
  if (clickWithinX && clickWithinY){
    blocks.forEach(function(block){
      var blockSS = block.contains({x: click.x, y: click.y});
      if (blockSS !== undefined){
        console.log("You got a block!", block.x, block.y, block.color)
        if (block.color === "blue"){
          console.log("That's the computer's spot. Pick another one!")
        }else{
          block.color = userColor;
          block.draw(block.color);
        }
      }
    })
  }
});


// We know that all pixels that exist exist from y 10 - 20 and x 0-300

// Thought process:
// I can write this function that generates however many I want, 10 pixels wide each, so in this case this would've been a for loop of 30 * 10 because that produces 300, I can also optionally pass a starting point on the canvas.
// Each box created is stored as a Box constructor, the box constructor knows its x, y, width, height, color, end (boolean), and connections (array of all boxes next to it)
// I could eventually write an add curve function and an add verticle connection/add additional horizontal connection/add box if we wanted it to be dynamic
