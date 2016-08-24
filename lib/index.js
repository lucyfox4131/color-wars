var helper = require('./helpers');
// window.onload = function(){

var canvas = document.getElementById("document")
var context = canvas.getContext("2d")

context.fillRect(10, 10, 10, 10);

// var imgData = context.getImageData(10, 10, 20, 20);
var imgData = context.getImageData(0, 0,  canvas.width, canvas.height);
// console.log(imgData);
var data = imgData.data
console.log(data.length/4);

// console.log(data[data.length - 2])
// context.putImageData(imgData, 0, 100)
function Pixel(options){
  this.x = options.x;
  this.y = options.y;
  this.red = options.red;
  this.green = options.green;
  this.blue = options.blue;
  this.alpha = options.alpha;
}

var allPixels = []
var pixCollections = [];

for(var i = 0; i < data.length; i+= 4){
  var red = data[i];
  var green = data[i + 1];
  var blue = data[i + 2];
  var alpha = data[i + 3];
  pixCollections.push({red: red, green: green, blue: blue, alpha: alpha})
}

console.log(data.length)
console.log(pixCollections.length)
console.log(pixCollections.length/data.length)



for(var y = 0; y < 500; y++){
  for(var x = 0; x < 500; x++){
    if(x === 260 && y === 260){
      console.log(pixCollections[x + y])
    }
  }
}

// console.log("All Pixels Length", allPixels.length)
// console.log(allPixelsOnBoard[1500]);
// var pix = allPixelsOnBoard[1500]
// context.fillStyle = 'red';
// context.fillRect(pix.x, pix.y, 10, 10);




// context.fillStyle = "red";
// context.fillRect(10, 10, 1, 1);
// var coordinates = [];
// for(i = 0; i <= 500; i++){
//   for(j = 0; j <= 500; j++){
//     coordinates.push({x: i, y: j})
//   }
// }
//
// // console.log("Coordinates: " + coordinates)
//
// function Line(length, startingX, startingY, orientation){
//   this.length = length;
//   this.x = startingX;
//   this.y = startingY;
//   this.orientation = orientation;
// }
//
// Line.prototype.draw = function () {
//   context.fillRect(this.x, this.y, 10, this.y + length)
//   return this;
// };
//
// requestAnimationFrame(function drawLine(){
//   // var startPosition = coordinates[Math.floor(Math.random() * coordinates.length)];
//   // var length = Math.floor(Math.random() * 400)
//   // console.log(startPosition);
//   // console.log(length);
//   var line = new Line(200, 20, 20, "up")
//   line.draw();
//   // requestAnimationFrame(drawLine)
// })

//
// var dots = [];
//
//   for(j = 200; j <= 330; j++){
//     dots.push(new Dot(170, j, 10));
//   }
//
// function Dot(x, y, width, color = "grey"){
//   this.x = x;
//   this.y = y;
//   this.width = width;
//   this.sAngle = 0;
//   this.eAngle = (2 * Math.PI);
//   this.color = color;
//   this.down = true
// };
//
// Dot.prototype.draw = function () {
//   context.beginPath();
//   context.arc(this.x, this.y, this.width, this.sAngle, this.eAngle, false)
//   context.fillStyle = this.color;
//   context.fill();
//   return this;
// };
//
// // var dot = dots[Math.floor(Math.random()*dots.length)];
// // new Dot(dot.x, dot.y, 10, "red")
//
// requestAnimationFrame(function drawDots(){
//   dots.forEach(function(dot){
//     dot.draw();
//   })
//   requestAnimationFrame(drawDots)
// });
