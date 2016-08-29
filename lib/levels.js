//basic level, very small
var levelZero = {segments: [
                  {startX: 10, startY:10, length: 5, orientation: "horizontal"},
                  {startX: 10, startY:10, length: 5, orientation: "vertical"}],
                  connections: [{x: 10, y: 10}]};

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
                    {startX: 410, startY:10, length: 40, orientation: "vertical"},
                    {startX: 20, startY:400, length: 40, orientation: "horizontal"}],
                    connections: [{x:410, y: 10}, {x:20, y: 10}, {x:20, y:400}, {x:410, y: 400}]};

//tic-tac-toe
var levelFour = {segments: [
                    {startX: 10, startY:100, length: 40, orientation: "horizontal"},
                    {startX: 10, startY:300, length: 40, orientation: "horizontal"},
                    {startX: 100, startY:10, length: 40, orientation: "vertical"},
                    {startX: 300, startY:10, length: 40, orientation: "vertical"}],
                    connections: [{x:100, y: 100}, {x:100, y: 300}, {x:300, y:100}, {x: 300, y: 300}]};

module.exports = [levelZero, levelOne, levelTwo, levelThree, levelFour];
