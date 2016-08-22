var canvas = document.getElementById("document")
var context = canvas.getContext("2d")

// context.beginPath();
// context.moveTo(10,10);
context.fillRect(10, 10, 100, 100);

// user clicks on Rect, when user clicks on rectangle it generates a dot of color x, dot expands to fill space of rectangle

// add new rectangle (randomly) within the existing rectangle

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var xRand = getRandomInt(10, 100);
console.log(xRand);

var yRand = getRandomInt(10, 100);
console.log(yRand);

var radius = 10;
var sAngle = 0;
var eAngle = (2*Math.PI);

requestAnimationFrame(function expandDot(){
  context.beginPath();
  context.arc(xRand, yRand, radius, sAngle, eAngle, false);
  context.fillStyle = "green"
  // context.fillRect(xRand, yRand, 10, 10);
  context.fill();
  radius ++;
  // if (xRand < 100) xRand ++;
  // if (xRand > 10) xRand --;
  // if (yRand < 100) yRand ++;
  // if (yRand > 10) yRand --;
  requestAnimationFrame(expandDot)
});
