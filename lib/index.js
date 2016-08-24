var helper = require('./helpers.js');
var canvas = document.getElementById("document")
var context = canvas.getContext("2d")
var Block = require('./block.js')
var Segment = require('./segment.js')

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

var segment = new Segment();
segment.create({startX:0, startY:10, length: 40, orientation: "horizontal"})
var blocks = segment.allBlocks();

// build horizontal line function, starting x, ending x/length
// build a verticle line function
// build blocks/add horizontal or verticle lines to box
// build a curve
// really this board is a segment.
var board = {minX: 0, maxX: 400, minY: 10, maxY: 20};
// board can have multiple pieces
var compColor = "blue";
var compBlock;

requestAnimationFrame(function(){
  blocks.forEach(function(block){
    block.draw("grey", context);
  })
  var block = blocks[Math.floor(Math.random() * blocks.length)]
  block.color = compColor;
  block.draw(block.color, context);
  compBlock = block;
});

var userColor = "red";

canvas.addEventListener('click', function (event) {
  console.log(helper(event));
  var click = helper(event);
  var clickWithinX = click.x >= board.minX && click.x <= board.maxX
  var clickWithinY = click.y >= board.minY && click.y <= board.maxY
  if (clickWithinX && clickWithinY){
    blocks.forEach(function(block){
      if (block.contains({x: click.x, y: click.y})){
        console.log("You got a block!", block.x, block.y, block.color)
        if (block.color === "blue"){
          console.log("That's the computer's spot. Pick another one!")
        }else{
          block.color = userColor;
          block.draw(block.color, context);
          expandColor(compBlock);
          expandColor(block);
          getColorPercents();
        }
      }
    })
  }
});

function expandColor(currentBlock){
  var parent = currentBlock.parent
  var child = currentBlock.child
  var currentGreyParent = parent && parent.color === "grey"
  var currentGreyChild = child && child.color === "grey"
  if (currentGreyParent){
    parent.color = currentBlock.color;
    parent.draw(parent.color, context);
    expandColor(parent)
  }
  if (currentGreyChild){
    child.color = currentBlock.color;
    child.draw(child.color, context);
    expandColor(child)
  }


  // array --> ends of color (blocks that were most recently colored in)
  // starting at block x (computerblock) if blocks next to it are grey, color them blue and redraw, otherwise find their neighbor blocks
}


function getColorPercents(){
  var compColorAmount = segment.colorAmount(compColor)
  var playerColorAmount = segment.colorAmount(userColor)
  console.log("Computer %: ", compColorAmount/segment.length)
  console.log("Player %: ", playerColorAmount/segment.length)
}
// We know that all pixels that exist exist from y 10 - 20 and x 0-300

// Thought process:
// I can write this function that generates however many I want, 10 pixels wide each, so in this case this would've been a for loop of 30 * 10 because that produces 300, I can also optionally pass a starting point on the canvas.
// Each box created is stored as a Box constructor, the box constructor knows its x, y, width, height, color, end (boolean), and connections (array of all boxes next to it)
// I could eventually write an add curve function and an add verticle connection/add additional horizontal connection/add box if we wanted it to be dynamic
