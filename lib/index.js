var helper = require('./helpers');

var canvas = document.getElementById("document")
var context = canvas.getContext("2d")


// begin custom shape
context.beginPath();
context.moveTo(170, 80);
context.bezierCurveTo(130, 100, 130, 150, 230, 150);
context.bezierCurveTo(250, 180, 320, 180, 340, 150);
context.bezierCurveTo(420, 150, 420, 120, 390, 100);
context.bezierCurveTo(430, 40, 370, 30, 340, 50);
context.bezierCurveTo(320, 5, 250, 20, 250, 50);
context.bezierCurveTo(200, 5, 150, 20, 170, 80);

// complete custom shape
context.closePath();
context.lineWidth = 5;
context.strokeStyle = 'blue';
context.stroke();

var coordsInBoard = [];

for(i = 0; i <= 500; i++){
  for(j = 0; j <= 500; j++){
    if (context.isPointInPath(i, j)) coordsInBoard.push(i + ":" + j);
  }
}

console.log(coordsInBoard);

// canvas.addEventListener("click", function(event){
//   console.log("Hello World");
// });
//
// canvas.addEventListener('click', function (event) {
//   console.log("Canvas was clicked!!")
//   var click = helper.getClickPosition(event);
//   dots.push(new Dot( click.x, click.y, 10));
// });
//
// function Dot(x, y, width){
//   this.x = x;
//   this.y = y;
//   this.width = width;
//   this.sAngle = 0;
//   this.eAngle = (2 * Math.PI);
//   this.color = '#'+Math.floor(Math.random()*16777215).toString(16);
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
// var dots = [];
// dots.push(new Dot(100, 75, 10));
// console.log(dots);
//
// Dot.prototype.moveDown = function () {
//   this.y += 2;
//   return this;
// };
//
// Dot.prototype.moveUp = function () {
//   this.y -= 2;
//   return this;
// };
//
// requestAnimationFrame(function gameLoop(){
//   // context.clearRect(0, 0, canvas.width, canvas.height);
//   dots.forEach(function (dot) {
//     moveDot(dot);
//   });
//   requestAnimationFrame(gameLoop);
// });
//
// function moveDot(dot){
//   if (dot.down === true){
//     dot.draw().moveDown()
//     if (dot.y >= (canvas.height - dot.width)) dot.down = false;
//   } else if(dot.down === false){
//     dot.draw().moveUp();
//     if (dot.y <= dot.width) dot.down = true;
//   }
// };
//
// module.export = Dot;











// context.fillStyle = "red";
// context.beginPath();
//
// // context.strokeRect(100, 100, 10, 10);
//
// context.moveTo(50,50);
// context.lineTo(300,50);
// context.lineTo(400, 70);
// context.lineWidth = 10;
// context.strokeStyle = 'blue';
// context.stroke();
//
// requestAnimationFrame(function drawLine(){
//   context.moveTo(50,50);
//   context.lineTo(300,50);
//
// })
// console.log(context.isPointInPath(300,50))
// context.fill();
// context.beginPath();
// context.moveTo(10,10);
// context.fillRect(10, 10, 100, 100);

// user clicks on Rect, when user clicks on rectangle it generates a dot of color x, dot expands to fill space of rectangle

// add new rectangle (randomly) within the existing rectangle

// function getRandomInt(min, max) {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }
//
// var xRand = getRandomInt(10, 100);
// console.log(xRand);
//
// var yRand = getRandomInt(10, 100);
// console.log(yRand);
//
// var radius = 10;
// var sAngle = 0;
// var eAngle = (2 * Math.PI);
//
// requestAnimationFrame(function expandDot(){
//   context.beginPath();
//   context.arc(xRand, yRand, radius, sAngle, eAngle, false);
//   context.fillStyle = "green"
//   // context.fillRect(xRand, yRand, 10, 10);
//   context.fill();
//   if ((xRand - radius > 10) || (xRand + radius < 100 || yRand + radius < 100 || yRand - radius > 10)) radius ++;
//
//   // if (xRand < 100) xRand ++;
//   // if (xRand > 10) xRand --;
//   // if (yRand < 100) yRand ++;
//   // if (yRand > 10) yRand --;
//   requestAnimationFrame(expandDot)
// });
