// //basic level, very small
// var levelZero = {segments: [
//                   {startX: 10, startY:10, length: 5, orientation: "horizontal"},
//                   {startX: 10, startY:10, length: 5, orientation: "vertical"}],
//                   connections: [{x: 10, y: 10}]};

// cross
var levelOne = {segments: [
                  {startX: 10, startY:100, length: 40, orientation: "horizontal"},
                  {startX: 50, startY:20, length: 30, orientation: "vertical"}],
                  connections: [{x: 50, y: 100}]};

// table
var levelTwo = {segments: [
                  {startX: 20, startY:10, length: 40, orientation: "horizontal"},
                  {startX: 20, startY:10, length: 40, orientation: "vertical"},
                  {startX: 410, startY:10, length: 40, orientation: "vertical"}],
                  connections: [{x:410, y: 10}, {x:20, y: 10}]};

// box
var levelThree = {segments: [
                    {startX: 20, startY:10, length: 40, orientation: "horizontal"},
                    {startX: 20, startY:10, length: 40, orientation: "vertical"},
                    {startX: 100, startY: 10, length: 40, orientation: "vertical"},
                    {startX: 410, startY:10, length: 40, orientation: "vertical"},
                    {startX: 20, startY:400, length: 40, orientation: "horizontal"}],
                    connections: [{x:410, y: 10}, {x:20, y: 10}, {x:20, y:400}, {x:410, y: 400}, {x:100, y:10}, {x: 100, y: 400}]};

//tic-tac-toe
var levelFour = {segments: [
                    {startX: 10, startY:100, length: 40, orientation: "horizontal"},
                    {startX: 10, startY:300, length: 40, orientation: "horizontal"},
                    {startX: 100, startY:10, length: 40, orientation: "vertical"},
                    {startX: 300, startY:10, length: 40, orientation: "vertical"}],
                    connections: [{x:100, y: 100}, {x:100, y: 300}, {x:300, y:100}, {x: 300, y: 300}]};

var levelFive = {segments: [
                    {startX: 100, startY:10, length: 40, orientation: "vertical"},
                    {startX: 100, startY:10, length: 30, orientation: "horizontal"},
                    {startX: 390, startY:10, length: 40, orientation: "vertical"},
                    {startX: 50, startY: 100, length: 20, orientation: "horizontal"},
                    {startX: 300, startY: 150, length: 15, orientation: "horizontal"},
                    {startX: 50, startY: 250, length: 15, orientation: "horizontal"},
                    {startX: 300, startY:300, length: 20, orientation: "horizontal"}],
                    connections: [{x: 100, y: 10}, {x:390, y: 10}, {x:100, y:100}, {x:390 , y:150 }, {x:100 , y:250 }, {x:390 , y:300 }]};

var levelSix = {segments: [
                    {startX: 100, startY:10, length: 40, orientation: "vertical"},
                    {startX: 200, startY:10, length: 40, orientation: "vertical"},
                    {startX: 290, startY:10, length: 40, orientation: "vertical"},
                    {startX: 100, startY:210, length: 20, orientation: "horizontal"}],
                    connections: [{x:100, y: 210}, {x:200, y: 210}, {x:290, y:210}]};

var levelSeven = {segments: [
                    {startX: 100, startY:100, length: 20, orientation: "horizontal"},
                    {startX: 250, startY:10, length: 45, orientation: "vertical"},
                    {startX: 200, startY:400, length: 20, orientation: "horizontal"}],
                    connections: [{x:250, y: 100}, {x:250, y: 400}]};

var levelEight = {segments: [
                    {startX: 350, startY:20, length: 10, orientation: "horizontal"},
                    {startX: 350, startY:20, length: 10, orientation: "vertical"},
                    {startX: 200, startY:100, length: 20, orientation: "horizontal"},
                    {startX: 200, startY: 100, length: 40, orientation: "vertical"},
                    {startX: 120, startY: 400, length: 10, orientation: "horizontal"},
                    {startX: 120, startY: 400, length: 10, orientation: "vertical"}],
                    connections: [{x: 350, y: 20}, {x:350, y: 100}, {x:200, y:100}, {x:200 , y:400 }, {x: 120 ,y: 400}]};

var levelNine = {segments: [
                    {startX: 50, startY: 10, length: 45, orientation: "vertical"},
                    {startX: 450, startY: 10, length: 45, orientation: "vertical"},
                    {startX: 50, startY: 30, length: 41, orientation: "horizontal"},
                    {startX: 50, startY: 90, length: 41, orientation: "horizontal"},
                    {startX: 50, startY: 180, length: 41, orientation: "horizontal"},
                    {startX: 50, startY: 300, length: 41, orientation: "horizontal"},
                    {startX: 50, startY: 430, length: 41, orientation: "horizontal"}],
                    connections: [{x: 50, y: 30}, {x:50, y: 90}, {x:50, y:180}, {x:50 , y:300 }, {x: 50 ,y: 430},
                                  {x: 450, y: 30}, {x:450, y: 90}, {x:450, y:180}, {x:450 , y:300 }, {x: 450 ,y: 430}]};

var levelTen ={segments: [
                    {startX: 20, startY:10, length: 40, orientation: "horizontal"},
                    {startX: 20, startY:10, length: 40, orientation: "vertical"},
                    {startX: 410, startY:10, length: 40, orientation: "vertical"},
                    {startX: 20, startY:400, length: 40, orientation: "horizontal"},
                    {startX: 20, startY:100, length: 13, orientation: "horizontal"},
                    {startX: 290, startY:100, length: 13, orientation: "horizontal"},
                    {startX: 140, startY:100, length: 5, orientation: "vertical"},
                    {startX: 290, startY:100, length: 5, orientation: "vertical"},
                    {startX: 90, startY:140, length: 6, orientation: "horizontal"},
                    {startX: 290, startY:140, length: 6, orientation: "horizontal"},
                    {startX: 90, startY:100, length: 5, orientation: "vertical"},
                    {startX: 340, startY:100, length: 5, orientation: "vertical"},
                    {startX: 20, startY:300, length: 10, orientation: "horizontal"},
                    {startX: 320, startY:300, length: 10, orientation: "horizontal"},
                    {startX: 320, startY:300, length: 3, orientation: "vertical"},
                    {startX: 110, startY:300, length: 3, orientation: "vertical"},
                    {startX: 110, startY:320, length: 22, orientation: "horizontal"}],
                    connections: [{x:410, y: 10}, {x:20, y: 10}, {x:20, y:400}, {x:410, y: 400}, {x: 20, y:100}, {x: 410, y: 100},
                                  {x: 140, y: 100}, {x: 290, y: 100}, {x: 140, y:140}, {x: 290, y: 140}, {x: 90, y: 100},
                                  {x: 90, y: 140}, {x: 340, y: 100}, {x: 340, y: 140}, {x: 20, y: 300}, {x: 410, y: 300},
                                  {x: 320 ,y: 300}, {x: 110, y: 300}, {x: 110 ,y: 320}, {x: 320,y: 320}]};

module.exports = [levelOne, levelTwo, levelThree, levelFour, levelFive, levelSix, levelSeven,levelEight, levelNine,levelTen];
