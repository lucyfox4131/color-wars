var helper = require('./helpers.js');
var canvas = document.getElementById("document")
var context = canvas.getContext("2d")
var Block = require('./block.js')
var Segment = require('./segment.js')
var Pattern = require('./pattern.js')
var $ = require('jquery')
var gameStart = document.getElementById("game-start")
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

requestAnimationFrame(function(){
  $(canvas).hide();
  $('#start-btn').on('click', function(){
    $('body').css('color', "white");
    $('#start-btn').hide()
    $(canvas).show()
  })
})
// $(canvas).css('background-color', getRandomColor())
//right angle
// var segmentOne = {startX: 10, startY:10, length: 5, orientation: "horizontal"}
// var segmentTwo = {startX: 10, startY:10, length: 5, orientation: "vertical"}
// var options = {segments: [segmentOne, segmentTwo], connections: [{x: 10, y: 10}]}

//cross
// var segmentOne = {startX: 10, startY:100, length: 40, orientation: "horizontal"}
// var segmentTwo = {startX: 50, startY:20, length: 30, orientation: "vertical"}
// var options = {segments: [segmentOne, segmentTwo], connections: [{x: 50, y: 100}]}

//table
// var segmentOne = {startX: 20, startY:10, length: 40, orientation: "horizontal"}
// var segmentTwo = {startX: 20, startY:10, length: 40, orientation: "vertical"}
// var segmentThree = {startX: 410, startY:10, length: 40, orientation: "vertical"}
// var options = {segments: [segmentOne, segmentTwo, segmentThree], connections: [{x:410, y: 10}, {x:20, y: 10}]}

//box
// var segmentOne = {startX: 20, startY:10, length: 40, orientation: "horizontal"}
// var segmentTwo = {startX: 20, startY:10, length: 40, orientation: "vertical"}
// var segmentThree = {startX: 410, startY:10, length: 40, orientation: "vertical"}
// var segmentFour = {startX: 20, startY:400, length: 40, orientation: "horizontal"}
// var options = {segments: [segmentOne, segmentTwo, segmentThree, segmentFour], connections: [{x:410, y: 10}, {x:20, y: 10}, {x:20, y:400}, {x:410, y: 400}]}

//tic-tac-toe
var segmentOne  = {startX: 10, startY:100, length: 40, orientation: "horizontal"}
var segmentTwo = {startX: 10, startY:300, length: 40, orientation: "horizontal"}
var segmentThree = {startX: 100, startY:10, length: 40, orientation: "vertical"}
var segmentFour = {startX: 300, startY:10, length: 40, orientation: "vertical"}
var options = {segments: [segmentOne, segmentTwo, segmentThree, segmentFour], connections: [{x:100, y: 100}, {x:100, y: 300}, {x:300, y:100}, {x: 300, y: 300}]}

var pattern = new Pattern(options)
var arrays = []
pattern.segments.forEach(function(segment){
  arrays.push(segment.allBlocks())
})

var blocks = [].concat.apply([], arrays);

var compColor = "blue";
var compBlock;

requestAnimationFrame(function(){
  console.log("Blocks:", blocks)
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
    blocks.forEach(function(block){
      if (block.contains({x: click.x, y: (click.y)})){
        console.log("You got a block!", block.x, block.y, block.color)
        if (block.color === "blue"){
          console.log("That's the computer's spot. Pick another one!")
        }else{
          block.color = userColor;
          block.draw(block.color, context);
          fillIn(compBlock, block)
        }
      }
    })
});

function fillIn(comp, user){
  expandColor(comp);
  expandColor(user);
}

function expandColor(currentBlock){
  calculateColorValues();
  var parent = currentBlock.parent
  var child = currentBlock.child
  var currentGreyParent = parent && parent.color === "grey"
  var currentGreyChild = child && child.color === "grey"
  if(isCurrentConnection(currentBlock)){
    var eachBlock = eachConnectionBlock(currentBlock)
    eachBlock.forEach(function(block){
      if(block.color === "grey"){
        block.color = currentBlock.color;
        block.draw(block.color, context)
        expandColor(block);
      }
    })
  }
  if (currentGreyParent){
    parent.color = currentBlock.color;
    parent.draw(parent.color, context);
    setTimeout(expandColor, 70, parent)
  }
  if (currentGreyChild){
    child.color = currentBlock.color;
    child.draw(child.color, context);
    setTimeout(expandColor, 70, child)
  }
}

function eachConnectionBlock(currentBlock){
  var blocks = []
  pattern.segments.forEach(function(segment){
    blocks.push(segment.find(currentBlock))
  });
  blocks = [].concat.apply([], blocks);
  return blocks
}

function isCurrentConnection(currentBlock){
  var result;
  var connections = pattern.connections
  connections.forEach(function(connection){
    if (currentBlock.x == connection.x && currentBlock.y == connection.y){
      result = true
    }
  })
  return result
}

function calculateColorValues(){
  var finalTotal = pattern.segments.length;
  var counter = 0;
  pattern.segments.forEach(function(segment){
    var redAmount = segment.colorAmount(userColor)/segment.length
    var blueAmount = segment.colorAmount(compColor)/segment.length
    if (redAmount + blueAmount === 1){
      counter += 1;
      console.log("Counter:", counter);
      console.log(finalTotal);
    }
  })
  if(finalTotal === counter){
    console.log("GAME OVER")
  }
}
