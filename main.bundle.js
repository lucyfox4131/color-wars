/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var helper = __webpack_require__(1);

	var canvas = document.getElementById("document");
	var context = canvas.getContext("2d");

	var dots = [];

	for (j = 200; j <= 330; j++) {
	  dots.push(new Dot(170, j, 10));
	}

	function Dot(x, y, width, color = "grey") {
	  this.x = x;
	  this.y = y;
	  this.width = width;
	  this.sAngle = 0;
	  this.eAngle = 2 * Math.PI;
	  this.color = color;
	  this.down = true;
	};

	Dot.prototype.draw = function () {
	  context.beginPath();
	  context.arc(this.x, this.y, this.width, this.sAngle, this.eAngle, false);
	  context.fillStyle = this.color;
	  context.fill();
	  return this;
	};

	// var dot = dots[Math.floor(Math.random()*dots.length)];
	// new Dot(dot.x, dot.y, 10, "red")

	requestAnimationFrame(function drawDots() {
	  dots.forEach(function (dot) {
	    dot.draw();
	  });
	  requestAnimationFrame(drawDots);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	var getClickPosition = function (e) {
	  function getPosition(element) {
	    var xPosition = 0;
	    var yPosition = 0;

	    while (element) {
	      xPosition += element.offsetLeft - element.scrollLeft + element.clientLeft;
	      yPosition += element.offsetTop - element.scrollTop + element.clientTop;
	      element = element.offsetParent;
	    }

	    return { x: xPosition, y: yPosition };
	  }

	  var parentPosition = getPosition(e.currentTarget);
	  var xPosition = e.clientX - parentPosition.x;
	  var yPosition = e.clientY - parentPosition.y;

	  return { x: xPosition, y: yPosition };
	};

	module.exports = getClickPosition;

/***/ }
/******/ ]);