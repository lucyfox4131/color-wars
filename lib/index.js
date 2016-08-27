var helper = require('./helpers.js');
var canvas = document.getElementById("document")
var context = canvas.getContext("2d")
var Block = require('./block.js')
var Segment = require('./segment.js')
var Pattern = require('./pattern.js')


function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//create the pattern for the board
var segmentOne = {startX: 10, startY:10, length: 5, orientation: "horizontal"}
var segmentTwo = {startX: 10, startY:10, length: 5, orientation: "vertical"}
var options = {segments: [segmentOne, segmentTwo] }
var pattern = new Pattern(options)
var arrays = []
pattern.segments.forEach(function(segment){
  arrays.push(segment.allBlocks())
})

var blocks = [].concat.apply([], arrays);
console.log(blocks)
// var segment = new Segment();
// segment.create({startX:0, startY:10, length: 40, orientation: "horizontal"})
// var blocks = segment.allBlocks();

var board = {minX: 0, maxX: 400, minY: 10, maxY: 20};
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
}

function getColorPercents(){
  var compColorAmount = segment.colorAmount(compColor)
  var playerColorAmount = segment.colorAmount(userColor)
  console.log("Computer %: ", compColorAmount/segment.length)
  console.log("Player %: ", playerColorAmount/segment.length)
}
