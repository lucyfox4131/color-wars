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

function Block(x, y, width, height, color){
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

for(var i = 0; i < 300; i += 10){
  var color = getRandomColor();
  var block = new Block(i, 10, 10, 10, color);
  blocks.push(block)
}

var board = {minX: 0, maxX: 300, minY: 10, maxY: 20};

console.log(blocks);

requestAnimationFrame(function(){
  blocks.forEach(function(block){
    block.draw("grey");
  })
  var block = blocks[Math.floor(Math.random() * blocks.length)]
  block.draw("blue");
});

canvas.addEventListener('click', function (event) {
  console.log(helper(event));
  var click = helper(event);
  var clickWithinX = click.x >= board.minX && click.x <= board.maxX
  var clickWithinY = click.y >= board.minY && click.y <= board.maxY
  if (clickWithinY && clickWithinX){
    console.log("YOU WINNNNNNNNN")
    var userBlock = new Block(click.x, 10, 10, 10)
    userBlock.draw("red");
    // There's a little more logic here that needs to be handled. Can't click on top of another dot and cannot click where your dot would go too far outside of the line but it's kind of close
  }else{
    console.log("You must click within the grid")
  }
});


// We know that all pixels that exist exist from y 10 - 20 and x 0-300

// Thought process:
// I can write this function that generates however many I want, 10 pixels wide each, so in this case this would've been a for loop of 30 * 10 because that produces 300, I can also optionally pass a starting point on the canvas.
// Each box created is stored as a Box constructor, the box constructor knows its x, y, width, height, color, end (boolean), and connections (array of all boxes next to it)
// I could eventually write an add curve function and an add verticle connection/add additional horizontal connection/add box if we wanted it to be dynamic
