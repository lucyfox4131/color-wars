var canvas = document.getElementById("document");
// var context = canvas.getContext("2d");
// var Block = require('./block.js');
// var Segment = require('./segment.js');
// var Pattern = require('./pattern.js');
var $ = require('jquery');
var gameStart = document.getElementById("game-start");
var Game = require('./game.js');
var levelUpScreen = document.getElementById("level-up");

requestAnimationFrame(function(){
  $(canvas).hide();
  $(levelUpScreen).hide();
  $('#start-btn').on('click', function(){
    $(gameStart).hide();
    $(canvas).show();
    var game = new Game(canvas);
    game.start();
  });
});


// var userColor = "red";
//
// canvas.addEventListener('click', function (event) {
//   console.log(helper(event));
//   var click = helper(event);
//     blocks.forEach(function(block){
//       if (block.contains({x: click.x, y: (click.y)})){
//         console.log("You got a block!", block.x, block.y, block.color)
//         if (block.color === "blue"){
//           console.log("That's the computer's spot. Pick another one!")
//         }else{
//           block.color = userColor;
//           block.draw(block.color, context);
//           fillIn(compBlock, block)
//         }
//       }
//     })
// });
//
// function fillIn(comp, user){
//   expandColor(comp);
//   expandColor(user);
// }
//
// function expandColor(currentBlock){
//   calculateColorValues(compColor, userColor);
//   var parent = currentBlock.parent
//   var child = currentBlock.child
//   var currentGreyParent = parent && parent.color === "grey"
//   var currentGreyChild = child && child.color === "grey"
//   if(isCurrentConnection(currentBlock)){
//     var eachBlock = eachConnectionBlock(currentBlock)
//     eachBlock.forEach(function(block){
//       if(block.color === "grey"){
//         block.color = currentBlock.color;
//         block.draw(block.color, context)
//         expandColor(block);
//       }
//     })
//   }
//   if (currentGreyParent){
//     parent.color = currentBlock.color;
//     parent.draw(parent.color, context);
//     setTimeout(expandColor, 70, parent)
//   }
//   if (currentGreyChild){
//     child.color = currentBlock.color;
//     child.draw(child.color, context);
//     setTimeout(expandColor, 70, child)
//   }
// }
//
// function eachConnectionBlock(currentBlock){
//   var blocks = []
//   pattern.segments.forEach(function(segment){
//     blocks.push(segment.find(currentBlock))
//   });
//   blocks = [].concat.apply([], blocks);
//   return blocks
// }
//
// function isCurrentConnection(currentBlock){
//   var result;
//   var connections = pattern.connections
//   connections.forEach(function(connection){
//     if (currentBlock.x == connection.x && currentBlock.y == connection.y){
//       result = true
//     }
//   })
//   return result
// }
//
// function calculateColorValues(compColor, userColor){
//   var comp = 0;
//   var user = 0;
//   blocks.forEach(function(block){
//     if (block.color === userColor) user += 1;
//     if (block.color === compColor) comp += 1;
//   });
//   console.log("Computer Blocks", comp)
//   console.log("User Blocks", user)
//   if( comp + user === blocks.length){
//     console.log("GAME OVERRRR");
//   }
// }
